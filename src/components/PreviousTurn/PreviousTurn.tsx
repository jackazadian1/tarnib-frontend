import React, { useState } from 'react';
import styles from './PreviousTurn.module.css';
import TableCard from '../TableCard/TableCard';
import { CARD_SUIT_CLUBS, CARD_SUIT_DIAMONDS, CARD_SUIT_HEARTS, CARD_SUIT_SPADES } from '../../utils/Constant';
import PreviousCard from '../PreviousCard/PreviousCard';

// Define a type for the component's props (if needed)
interface PreviousTurnProps {
  //cards: string[];
  previousTurnData: any;
  players: string[];
  playerName: string;
  playerSeat: number;
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


const PreviousTurn: React.FC<PreviousTurnProps> = ({ previousTurnData, players, playerName, playerSeat, tarnib }) => {

  const [hovered, setHovered] = useState(false);

  let text = '';
  
  if(previousTurnData.previous_turn_winner != -1){
     text = playerName == players[previousTurnData.previous_turn_winner] ? 'You won the previous turn' : `${players[previousTurnData.previous_turn_winner]} won the previous turn`;
  }
  
  return (
    <React.Fragment>
    <div 
      className={styles.previous_turn_display}
      onMouseEnter={() => 
      {if(previousTurnData.previous_turn_winner != -1) setHovered(true)}}
      onMouseLeave={() => setHovered(false)}
      >Previous Turn</div>
    {
      hovered ? (
      <div className={styles.previous_turn}>
        <div className={styles.previous_turn_winner}>{text}</div>
        <PreviousCard card={previousTurnData.previous_play[0]} tarnib={tarnib} seatNumber={1} playerSeat={playerSeat}/>
        <PreviousCard card={previousTurnData.previous_play[1]} tarnib={tarnib} seatNumber={2} playerSeat={playerSeat}/>
        <PreviousCard card={previousTurnData.previous_play[2]} tarnib={tarnib} seatNumber={3} playerSeat={playerSeat}/>
        <PreviousCard card={previousTurnData.previous_play[3]} tarnib={tarnib} seatNumber={4} playerSeat={playerSeat}/>
      </div>) : null
    }
    
    </React.Fragment>
    
  );
};

export default PreviousTurn;
function useSate(): [any, any] {
  throw new Error('Function not implemented.');
}

