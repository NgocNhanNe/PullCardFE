import { Card } from './Card.type';

export type CardResponse = {
  success: boolean;
  deck_id: string;
  cards: Card[];
  remaining: number;
  timestamp: string;
};
