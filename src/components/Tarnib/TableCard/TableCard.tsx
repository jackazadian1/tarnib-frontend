// Import React and any necessary dependencies
import React, { useEffect } from 'react';
import styles from './TableCard.module.css';
import { CARD_SUIT_CLUBS, CARD_SUIT_DIAMONDS, CARD_SUIT_HEARTS, CARD_SUIT_SPADES } from '../../../utils/Constant';
import { log } from 'console';

// Define a type for the component's props (if needed)
interface TableCardProps {
  card: string;
  tarnib: string;
  seatNumber: number;
  playerSeat: number;
}

const getCardSuit = (card: string) => {
  var suit = '';
  if (card.includes(CARD_SUIT_SPADES)) suit = CARD_SUIT_SPADES;
  else if (card.includes(CARD_SUIT_HEARTS)) suit = CARD_SUIT_HEARTS;
  else if (card.includes(CARD_SUIT_CLUBS)) suit = CARD_SUIT_CLUBS;
  else if (card.includes(CARD_SUIT_DIAMONDS))suit = CARD_SUIT_DIAMONDS;
  return suit;
};

// Define the PlayerHand component
const TableCard: React.FC<TableCardProps> = ({ card, tarnib, seatNumber, playerSeat }) => {
  let styles_arr = [styles.seat_1_card, styles.seat_2_card, styles.seat_3_card, styles.seat_4_card];
  let offset = playerSeat - 1;
  let index = seatNumber - offset <= 0 ? seatNumber - offset + 4 : seatNumber - offset;
  
  return (
    <div
      className={`${styles.card} ${styles_arr[index - 1]} ${getCardSuit(card) == tarnib ? styles.tarnib : ''}`}
      style={{ backgroundImage: 'url("/assets/images/png-cards/' + card + '.png")' }}
    ></div>
  );
};

// Export the PlayerHand component
export default TableCard;
