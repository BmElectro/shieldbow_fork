import type { CurrentGameBanData } from './ChampionBan';
import type { CurrentGameParticipantData } from './CurrentGameParticipant';

export interface CurrentGameData {
  gameId: number;
  gameType: string;
  gameStartTime: number;
  mapId: number;
  gameLength: number;
  platformId: string;
  gameMode: string;
  bannedChampions: CurrentGameBanData[];
  gameQueueConfigId: number;
  observers: { encryptionKey: string };
  participants: CurrentGameParticipantData[];
}
