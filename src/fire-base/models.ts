import type { DocumentData, Timestamp } from "firebase/firestore"
import { GameState } from "src/types/types";

// id is not part of document data

export interface User extends DocumentData {
  email: string;
  username: string;
}

export interface Group extends DocumentData {
  name: string;
  emoji: string;
  games: string[];
  invitationCode: string;
}

export interface Game extends DocumentData {
  gameTypeId: string;
  groupId?: string;
  adminId?: string;
  players: {playerId: string, points: number}[]
  winner?: string;
  timestamp: Timestamp
  duration?: number;
  state: GameState;
}

export interface UserGroupStatistic extends DocumentData {
  userId: string;
  groupId: string;
  wins: number;
  draws: number;
  losses: number;
}