import { useRef, useEffect, useState } from 'react';
import { Col } from 'reactstrap';

import style from './RestartGamePage.module.scss';

import classNames from 'classnames/bind';
import axios from 'axios';

import cardBack from '../../assets/images/cardBack.png';
import CardItemRecent from './CardItemRecent';
import { CardDeck } from 'types/CardDeck.type';
import { CardResponse } from 'types/CardResponse.type';

const cx = classNames.bind(style);

const RestartGamePage = () => {
  const [currentCard, setCurrentCard] = useState<CardResponse | null>(null);
  const [lastCards, setLastCards] = useState<CardResponse[] | []>([]);
  const [cardDeck, setCardDeck] = useState<CardDeck | null>(null);
  const innerCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    axios
      .get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
      .then(res => {
        if (res.status === 200) {
          setCardDeck(res.data);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleFlipCard = () => {
    axios
      .get(`https://deckofcardsapi.com/api/deck/${cardDeck?.deck_id}/draw/?count=1`)
      .then(res => {
        if (res.status === 200) {
          setCurrentCard(res.data);
        }
      })
      .catch(err => {
        console.log(err);
      });

    if (!currentCard) return;

    if (lastCards.length > 0) {
      const isCurrentCardExist = lastCards.find(
        item => item.timestamp === currentCard.timestamp
      );

      if (isCurrentCardExist) return;
    }

    const lastCardsClone = [...lastCards];

    if (lastCardsClone.length === 5) {
      lastCardsClone.splice(0, 1);
    }

    const currentCardWithTimestamp = { ...currentCard };
    currentCardWithTimestamp.timestamp = new Date(Date.now()).toLocaleString();

    setLastCards([...lastCardsClone, currentCardWithTimestamp]);

    if (innerCardRef) {
      (innerCardRef.current as any).style.transform = 'rotateY(180deg)';
    }
  };

  const handleCardItemClick = (cardItemSelected: CardResponse) => {
    setCurrentCard(cardItemSelected);
  };

  console.log(
    lastCards.map(i => {
      return i.timestamp;
    })
  );

  return (
    <div className={cx('restart-container', 'd-flex')}>
      <Col
        sm={8}
        className={cx('flip-card-container', 'vh-100')}
      >
        <h4>Hi Ngoc Nhan</h4>
        <h1>Let's Play!</h1>
        <div className={cx('flip-card')}>
          <div
            className={cx('flip-card-inner')}
            ref={innerCardRef}
          >
            <div className={cx('flip-card-front')}>
              <img
                // src='https://deckofcardsapi.com/static/img/9C.png'
                src={currentCard?.cards[0].image}
                alt='Avatar'
                width={300}
                height={355}
              />
            </div>
            <div className={cx('flip-card-back')}>
              <img
                src={cardBack}
                alt='Avatar'
                width={300}
                height={379}
              />
            </div>
          </div>
        </div>

        <div>
          <button
            className={cx('choose-btn')}
            onClick={() => handleFlipCard()}
          >
            Choose a card!
          </button>
        </div>
      </Col>
      <Col
        sm={4}
        className={cx('flip-card-recent')}
      >
        <div className={cx('flip-card-recent-list', 'd-flex flex-column')}>
          <div
            className={cx(
              'flip-card-recent-title',
              'd-flex justify-content-start align-items-center mb-5'
            )}
          >
            <span>Your last cards</span>
          </div>

          {lastCards.length > 0 &&
            lastCards.map(lastCard => (
              <CardItemRecent
                cardItem={lastCard}
                onCardItemClick={handleCardItemClick}
              />
            ))}
        </div>
      </Col>
    </div>
  );
};
export default RestartGamePage;
