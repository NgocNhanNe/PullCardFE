import { createContext } from 'react';
import { CardDeck } from 'types/CardDeck.type';
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

type CardDeckContextType = {
  cardDeck: CardDeck | null;
  setCardDeck: (c: CardDeck | null) => void;
};

export const CardSelectedContext = createContext<CardSelectedContextType>({
  cardSelected: null,
  setCardSelected: () => {}
});

export const LastCardsContext = createContext<LastCardsContextType>({
  lastCards: [],
  setLastCards: () => {}
});

export const CardDeckContext = createContext<CardDeckContextType>({
  cardDeck: null,
  setCardDeck: () => {}
});

export const CurrentAccountContext = createContext<Account | null>(null);
