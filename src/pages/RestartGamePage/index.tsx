import axios from 'axios';
import classNames from 'classnames/bind';
import { Col } from 'reactstrap';
import { useRef, useEffect, useState, useContext } from 'react';

import style from './RestartGamePage.module.scss';
import cardBack from '../../assets/images/cardBack.png';
import CardItemRecent from './CardItemRecent';
import NoLastCardResponse from 'components/NoLastCardResponse';
import { CardResponse } from 'types/CardResponse.type';
import { handleTitleCase } from 'utils';
import {
  CardDeckContext,
  CardSelectedContext,
  CurrentAccountContext,
  LastCardsContext
} from 'contexts';

const cx = classNames.bind(style);

const RestartGamePage = () => {
  const currentUser = useContext(CurrentAccountContext);
  const { lastCards, setLastCards } = useContext(LastCardsContext);
  const { cardSelected: currentCard, setCardSelected: setCurrentCard } =
    useContext(CardSelectedContext);
  const [loading, setLoading] = useState(false);
  const { cardDeck } = useContext(CardDeckContext);

  const innerCardRef = useRef<HTMLDivElement>(null);

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
          if (!res.data.success) {
            alert(
              'The number of cards has run out, please click Restart Game to play again!'
            );

            return;
          }
          localStorage.setItem('cardSelected', JSON.stringify(res.data));
          setCurrentCard(res.data);

          if (!currentCard) return;

          if (lastCards.length > 0) {
            const isCurrentCardExist = lastCards.find(
              item => item.timestamp === currentCard.timestamp
            );

            if (isCurrentCardExist) return;
          }

          const updatedLastCards = [
            { ...currentCard, timestamp: new Date().toLocaleString() },
            ...lastCards
          ];

          if (updatedLastCards.length > 5) {
            updatedLastCards.splice(5);
          }

          localStorage.setItem('lastCards', JSON.stringify(updatedLastCards));
          setLastCards(updatedLastCards);
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
    const previousSelectedCard = currentCard;

    localStorage.setItem('cardSelected', JSON.stringify(cardItemSelected));
    setCurrentCard(cardItemSelected);

    if (previousSelectedCard) {
      const updatedLastCards = [
        { ...previousSelectedCard, timestamp: new Date().toLocaleString() },
        ...lastCards
      ];

      if (updatedLastCards.length > 5) {
        updatedLastCards.splice(5);
      }

      localStorage.setItem('lastCards', JSON.stringify(updatedLastCards));
      setLastCards(updatedLastCards);
    }
  };

  console.log(currentCard?.remaining);

  return (
    <div className={cx('restart-container', 'd-flex')}>
      <Col
        sm={8}
        xs={6}
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
              <div
                className={cx(
                  {
                    'bg-front-card': currentCard?.remaining! !== 0
                  },
                  'flip-card-front'
                )}
              >
                {currentCard && (
                  <img
                    id={currentCard?.cards[0].code}
                    src={currentCard?.cards[0]?.image}
                    alt='front-card'
                    width={300}
                    height={355}
                  />
                )}
              </div>
              <div className={cx('flip-card-back')}>
                <img
                  src={cardBack}
                  alt='back-card'
                  width={300}
                  height={379}
                />
              </div>
            </div>
          </div>

          <div>
            <button
              disabled={loading}
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
        xs={6}
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
            lastCards.map((lastCard, index) => (
              <CardItemRecent
                key={index + lastCard.timestamp}
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
