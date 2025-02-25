import type { AccountData } from '../types';

/**
 * A class representing a RIOT account.
 */
export class Account {
  /**
   * The unique ID for this account.
   * This is also called the PUUID.
   */
  readonly playerId: string;
  /**
   * The RIOT account username of this user.
   */
  readonly username: string;
  /**
   * The RIOT account tag of this user.
   */
  readonly userTag: string;

  constructor(data: AccountData) {
    this.playerId = data.puuid;
    this.username = data.gameName;
    this.userTag = data.tagLine;
  }

  /**
   * The username#tag format of user's RIOT account.
   */
  get identifier() {
    return `${this.username}#${this.userTag}`;
  }
}
