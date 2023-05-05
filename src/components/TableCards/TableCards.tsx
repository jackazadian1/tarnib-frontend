// Import React and any necessary dependencies
import React from 'react';
import styles from './TableCards.module.css';
import TableCard from '../TableCard/TableCard';
import { CARD_SUIT_CLUBS, CARD_SUIT_DIAMONDS, CARD_SUIT_HEARTS, CARD_SUIT_SPADES } from '../../utils/Constant';

// Define a type for the component's props (if needed)
interface TableCardsProps {
  //cards: string[];
  playeTurn: number;
  playerTurnName: string;
  playerName: string;
  playersCards: string[];
  playerSeat: number;
  turnWinner: string;
  tarnib: string;
}

// const getCardSuit = (card: string) => {
//     var suit = '';
//     if(card.includes('spades')) suit = 'spades';
//     else if(card.includes('hearts')) suit = 'hearts';
//     else if(card.includes('clubs')) suit = 'clubs';
//     else  suit = 'diamonds';
//     return suit;
// };

// Define the PlayerHand component
const TableCards: React.FC<TableCardsProps> = ({ playeTurn, playerTurnName, playerName, playersCards, playerSeat, turnWinner, tarnib }) => {
  let text = playerName == playerTurnName ? 'Your turn' : `${playerTurnName}'s turn`;
  if(!playersCards.includes('')){
    text = turnWinner == undefined ? '' : `${turnWinner} won!`;
    if(turnWinner == playerName) text = 'You won!';
  }
  return (
    <div className={styles.table}>
      <div className={styles.player_turn}>{text}</div>
      <TableCard card={playersCards[0]} tarnib={tarnib} seatNumber={1} playerSeat={playerSeat} />
      <TableCard card={playersCards[1]} tarnib={tarnib} seatNumber={2} playerSeat={playerSeat} />
      <TableCard card={playersCards[2]} tarnib={tarnib} seatNumber={3} playerSeat={playerSeat} />
      <TableCard card={playersCards[3]} tarnib={tarnib} seatNumber={4} playerSeat={playerSeat} />
    </div>
  );
};

// Export the PlayerHand component
export default TableCards;
