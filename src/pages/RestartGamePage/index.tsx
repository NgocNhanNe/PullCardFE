import { useRef, useEffect, useState, useContext } from 'react';
import { Col } from 'reactstrap';

import style from './RestartGamePage.module.scss';

import classNames from 'classnames/bind';
import axios from 'axios';

import cardBack from '../../assets/images/cardBack.png';
import CardItemRecent from './CardItemRecent';
import { CardDeck } from 'types/CardDeck.type';
import { CardResponse } from 'types/CardResponse.type';
import { CardSelectedContext, CurrentAccountContext, LastCardsContext } from 'contexts';
import NoLastCardResponse from 'components/NoLastCardResponse';

const cx = classNames.bind(style);

const RestartGamePage = () => {
  const currentUser = useContext(CurrentAccountContext);
  const { cardSelected: currentCard, setCardSelected: setCurrentCard } =
    useContext(CardSelectedContext);
  const { lastCards, setLastCards } = useContext(LastCardsContext);
  const [loading, setLoading] = useState(false);

  const [cardDeck, setCardDeck] = useState<CardDeck | null>(null);
  const innerCardRef = useRef<HTMLDivElement>(null);

  console.log('last');

  console.log(lastCards);

  useEffect(() => {
    setLoading(true);
    axios
      .get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
      .then(res => {
        if (res.status === 200) {
          setLoading(true);

          setCardDeck(res.data);
        }
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (innerCardRef) {
      (innerCardRef.current as any).style.transform = 'rotateY(180deg)';
    }
  }, [currentCard]);

  const handleFlipCard = () => {
    setLoading(true);
    axios
      .get(`https://deckofcardsapi.com/api/deck/${cardDeck?.deck_id}/draw/?count=1`)
      .then(res => {
        if (res.status === 200) {
          localStorage.setItem('cardSelected', JSON.stringify(res.data));
          setCurrentCard(res.data);

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

          localStorage.setItem(
            'lastCards',
            JSON.stringify([...lastCardsClone, currentCardWithTimestamp])
          );

          setLastCards([...lastCardsClone, currentCardWithTimestamp]);
        }
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCardItemClick = (cardItemSelected: CardResponse) => {
    localStorage.setItem('cardSelected', JSON.stringify(cardItemSelected));
    setCurrentCard(cardItemSelected);
  };

  console.log(
    lastCards.map(i => {
      return i.timestamp;
    })
  );

  const handleTitleCase = (name: string) => {
    return name[0].toUpperCase() + name.slice(1).toLowerCase();
  };

  return (
    <div className={cx('restart-container', 'd-flex')}>
      <Col
        sm={8}
        className={cx('flip-card-container', 'vh-100')}
      >
        <div className={cx('greeting', 'd-flex flex-column')}>
          <span className={cx('name')}>
            Hi <span>{handleTitleCase(currentUser?.name!)},</span>
          </span>
          <span className={cx('title')}>Let’s Play! 👋</span>
        </div>
        <div className={cx('main-card', 'd-flex flex-column align-items-center')}>
          <div className={cx('flip-card')}>
            <div
              className={cx('flip-card-inner')}
              ref={innerCardRef}
            >
              <div className={cx('flip-card-front')}>
                {currentCard && (
                  <img
                    src={currentCard?.cards[0].image}
                    alt='Avatar'
                    width={300}
                    height={355}
                  />
                )}
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
              {loading ? 'Loading ...' : 'Choose a card!'}
            </button>
          </div>
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

          {lastCards.length > 0 ? (
            lastCards.map(lastCard => (
              <CardItemRecent
                key={lastCard.timestamp}
                cardItem={lastCard}
                onCardItemClick={handleCardItemClick}
              />
            ))
          ) : (
            <NoLastCardResponse />
          )}
        </div>
      </Col>
    </div>
  );
};
export default RestartGamePage;
