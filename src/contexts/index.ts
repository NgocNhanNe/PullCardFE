import { createContext } from 'react';
import { CardResponse } from 'types/CardResponse.type';

export type Account = {
  avatar: string;
  name: string;
  role: string;
};

type CardSelectedContextType = {
  cardSelected: CardResponse | null;
  setCardSelected: (c: CardResponse | null) => void;
};

type LastCardsContextType = {
  lastCards: CardResponse[] | [];
  setLastCards: (c: CardResponse[] | []) => void;
};

export const CardSelectedContext = createContext<CardSelectedContextType>({
  cardSelected: null,
  setCardSelected: () => {}
});

export const LastCardsContext = createContext<LastCardsContextType>({
  lastCards: [],
  setLastCards: () => {}
});
export const CurrentAccountContext = createContext<Account | null>(null);
