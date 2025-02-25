import type { Client } from '../client';
import type { ItemData, GameMap } from '../types';
import type { Champion } from './index';
import type Collection from '@discordjs/collection';

export class Item {
  private readonly client: Client;
  /**
   * The 4-digit unique ID (numerical ID as a string) of the item.
   */
  readonly id: string;
  /**
   * The displayed name of this item.
   */
  readonly name: string;
  /**
   * A short-description of this object.
   * `plaintext` attribute in the data dragon file.
   */
  readonly description: string;
  /**
   * More detailed description of the item.
   * Raw details contain some html-like tags.
   * This is the raw details from the data dragon API.
   *
   * See {@link details | details} if you want to see it with the tags processed out.
   */
  readonly rawDetails: string;
  /**
   * Whether this item is a consumable.
   *
   * Consumables give you temporary buffs or vision after consumption.
   */
  readonly consumable: boolean;
  /**
   * Whether this item is automatically consumed if you do not have an available item slot.
   */
  readonly consumeOnFull: boolean;
  /**
   * If this has a value, it means this item can be stacked in the same item slot.
   * The value indicates the quantity of this item you can store in one slot.
   */
  readonly stacks?: number;
  private readonly fromIds: string[];
  private readonly intoIds: string[];
  private readonly specialRecipeId?: string;
  /**
   * Whether this item is listed in the in-game store.
   */
  readonly inStore: boolean;
  /**
   * Whether this item can be bought from the store.
   */
  readonly hideFromAll: boolean;
  private _requiredChampion?: Champion;
  /**
   * A link to the image assigned to this item in-game.
   */
  readonly image: string;
  /**
   * The value of this item in terms of in-game gold.
   */
  readonly goldValue: {
    /**
     * The base value for this item.
     * This does not include the value of this item's components.
     */
    base: number;
    /**
     * The total gold value for this item.
     * This includes the value of this item's components.
     */
    total: number;
    /**
     * The selling price of this item.
     */
    sell: number;
  };
  /**
   * Some tags assigned to this item.
   */
  readonly tags: string[];
  /**
   * The list of maps on which you can buy this item.
   */
  readonly availability: GameMap[];
  /**
   * A list of stats this item provides.
   * To learn more about these stats, {@link https://developer.riotgames.com/docs/lol#data-dragon_items | documentation}
   */
  readonly stats: {
    [key: string]: number;
  };
  /**
   * The kind of item this is in-game.
   * By default, all items are set to be `Basic`.
   * There might be some issues with items that do not have their `depth` set in the data dragon JSON.
   */
  readonly kind: 'Basic' | 'Epic' | 'Legendary' | 'Mythic';

  constructor(client: Client, id: string, data: ItemData) {
    this.client = client;
    this.id = id;
    this.name = data.name;
    this.description = data.plaintext;
    this.rawDetails = data.description;
    this.consumable = data.consumed || false;
    this.consumeOnFull = data.consumeOnFull || false;
    this.stacks = data.stacks;
    this.fromIds = data.from || [];
    this.intoIds = data.into || [];
    this.specialRecipeId = data.specialRecipe?.toString();
    this.inStore = data.inStore ?? true;
    this.hideFromAll = data.hideFromAll || false;
    this.image = `${client.cdnBase}${client.version}/img/item/${id}.png`;
    this.goldValue = data.gold;
    this.tags = data.tags;
    this.availability = client.maps.filter((m) => data.maps[m.mapId.toString()]);
    this.stats = data.stats;
    this.kind = this.parseDepth(data.depth || 1);

    if (data.requiredChampion)
      client.champions.fetch(data.requiredChampion).then((c) => {
        this._requiredChampion = c;
      });
  }

  /**
   * If this is not undefined, then this item can only be bought/owned by this champion.
   */
  get requiredChampion(): Champion | undefined {
    return this._requiredChampion;
  }

  /**
   * More detailed description of the item.
   * This is the processed details.
   * With all the HTML-like tags removed.
   *
   * See {@link rawDetails | rawDetails} if you want the raw data.
   */
  get details() {
    return this.rawDetails
      .replace(/\.(?=[A-Z])/g, '.\n\n')
      .replaceAll(/<(br|li|p)\s*\/?>/g, '\n')
      .replace(/<\/?[^>]+(>|$)/g, '');
  }

  /**
   * The components of this item.
   * You need to buy these item and spend additional gold to get this item.
   */
  get from(): Collection<string, Item> {
    return this.client.items.cache.filter((i) => this.fromIds.includes(i.id));
  }

  /**
   * A collection of items the current item is a component of.
   */
  get into(): Collection<string, Item> {
    return this.client.items.cache.filter((i) => this.intoIds.includes(i.id));
  }

  /**
   * If this is not undefined, you cannot buy this item from the store.
   * Instead, you need to buy the `specialRecipe` item and complete a quest to get it.
   */
  get specialRecipe(): Item | undefined {
    return this.specialRecipeId ? this.client.items.cache.get(this.specialRecipeId) : undefined;
  }

  private parseDepth(depth: number) {
    if (this.rawDetails.includes('Mythic Passive')) return 'Mythic';
    const itemTypes = ['Basic', 'Epic', 'Legendary'] as const;
    return itemTypes[depth - 1];
  }
}
