import type { ImageData } from './index';

/**
 * A representation of the champion spell data returned by Data Dragon.
 */
export interface SpellData {
  id: string;
  name: string;
  description: string;
  tooltip: string;
  leveltip: {
    label: string[];
    effect: string[];
  };
  maxrank: number;
  cooldown: number[];
  cooldownBurn: string;
  cost: number[];
  costBurn: string;
  datavalues: {};
  effect: (null | number[])[];
  effectBurn: (null | string)[];
  vars: {
    key: string;
    link: string;
    coeff: string;
  }[];
  costType: string;
  maxammo: string;
  range: number[];
  rangeBurn: string;
  image: ImageData;
  resource: string;
}

/**
 * A representation of the champion spell data returned by Community Dragon.
 */
export interface SpellDamageData {
  [id: string]: any;
}

/**
 * A representation of a champion's skin data returned by meraki analytics.
 * These are used in the LoL wiki.
 */
export interface MerakiSkin {
  name: string;
  id: number;
  isBase: boolean;
  cost: number;
  sale: number;
  rarity: string;
  availability: string;
  chromas: {
    name: string;
    id: number;
    chromaPath: string;
  }[];
  lore: string;
  splashPath: string;
  uncenteredSplashPath: string;
  tilePath: string;
  loadScreenPath: string;
  loadScreenVintagePath: string;
  newEffects: boolean;
  newAnimations: boolean;
  newRecall: boolean;
  newVoice: boolean;
  newQuotes: boolean;
}

/**
 * A representation of the champion data returned by meraki analytics.
 * These are used in the LoL wiki.
 */
export interface MerakiChampion {
  id: string;
  key: string;
  name: string;
  title: string;
  attackType: string;
  releaseDate: string;
  releasePatch: string;
  price: {
    blueEssence: number;
    rp: number;
    saleRp: number;
  };
  skins: MerakiSkin[];
}

/**
 * A representation of the champion data returned by Data Dragon.
 */
export interface ChampionData {
  id: string;
  key: string;
  name: string;
  title: string;
  image: ImageData;
  skins: {
    id: string;
    num: number;
    name: string;
    chromas: boolean;
  }[];
  lore: string;
  blurb: string;
  allytips: string[];
  enemytips: string[];
  tags: string[];
  partype: string;
  info: {
    attack: number;
    defense: number;
    magic: number;
    difficulty: number;
  };
  stats: {
    hp: number;
    hpperlevel: number;
    mp: number;
    mpperlevel: number;
    movespeed: number;
    armor: number;
    armorperlevel: number;
    spellblock: number;
    spellblockperlevel: number;
    attackrange: number;
    hpregen: number;
    hpregenperlevel: number;
    mpregen: number;
    mpregenperlevel: number;
    crit: number;
    critperlevel: number;
    attackdamage: number;
    attackdamageperlevel: number;
    attackspeedperlevel: number;
    attackspeed: number;
  };
  spells: SpellData[];
  passive: {
    name: string;
    description: string;
    image: ImageData;
  };
}
