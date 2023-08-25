// Import React and any necessary dependencies
import React from 'react';
import styles from './PlayerHand.module.css';
import PlayerCard from '../PlayerCard/PlayerCard';
import { CARD_SUIT_CLUBS, CARD_SUIT_DIAMONDS, CARD_SUIT_HEARTS, CARD_SUIT_SPADES } from '../../../utils/Constant';

// Define a type for the component's props (if needed)
interface PlayerHandProps {
  cards: string[];
  isYourTurn: boolean;
  currentPlay: string[];
  playerSeat: number;
  tarnib: string;
  handleCardClick: (card: string) => void;
}

const getCardSuit = (card: string) => {
  var suit = '';
  if (card.includes(CARD_SUIT_SPADES)) suit = CARD_SUIT_SPADES;
  else if (card.includes(CARD_SUIT_HEARTS)) suit = CARD_SUIT_HEARTS;
  else if (card.includes(CARD_SUIT_CLUBS)) suit = CARD_SUIT_CLUBS;
  else suit = CARD_SUIT_DIAMONDS;
  return suit;
};

const getValidSuits = (currentPlay: string[], playerSeat: number, tarnib: string, cards: string[]) => {
  if (!currentPlay.includes('')) return [];
  let playerSeatIndex = playerSeat - 1;
  let res = [];
  if (currentPlay[playerSeatIndex - 1 == -1 ? 3 : playerSeatIndex - 1] == '') {
    res.push(CARD_SUIT_HEARTS);
    res.push(CARD_SUIT_SPADES);
    res.push(CARD_SUIT_DIAMONDS);
    res.push(CARD_SUIT_CLUBS);
  } else {
    let offset = 1;
    while (currentPlay[getSeatIndexByPreviousOffset(playerSeatIndex, offset)] != '') {
      offset = offset + 1;
    }

    let firstPlaySuit = getCardSuit(
      currentPlay[playerSeatIndex - offset < 0 ? 4 + playerSeatIndex - offset : playerSeatIndex - offset]
    );

    if (checkIfPlayerHasSuit(cards, firstPlaySuit)) {
      res.push(firstPlaySuit);
    } else {
      res.push(CARD_SUIT_HEARTS);
      res.push(CARD_SUIT_SPADES);
      res.push(CARD_SUIT_DIAMONDS);
      res.push(CARD_SUIT_CLUBS);
    }
  }
  return res;
};

const getSeatIndexByPreviousOffset = (playerSeatIndex: number, offset: number) => {
  let res = playerSeatIndex - offset - 1;
  if (res < 0) res += 4;
  return res;
};

const checkIfPlayerHasSuit = (cards: string[], suit: string) => {
  for (let i = 0; i < cards.length; i++) {
    if (getCardSuit(cards[i]) == suit) {
      return true;
    }
  }
  return false;
};

// Define the PlayerHand component
const PlayerHand: React.FC<PlayerHandProps> = ({
  cards,
  isYourTurn,
  currentPlay,
  playerSeat,
  tarnib,
  handleCardClick,
}) => {
  let validSuits = getValidSuits(currentPlay, playerSeat, tarnib, cards);
  return (
    <div className={styles.hand}>
      {cards.map((card, index) => (
        <PlayerCard
          key={index}
          card={card}
          suit={getCardSuit(card)}
          valid={validSuits.includes(getCardSuit(card)) && isYourTurn}
          tarnib={tarnib}
          handleCardClick={handleCardClick}
        />
      ))}
    </div>
  );
};

// Export the PlayerHand component
export default PlayerHand;
