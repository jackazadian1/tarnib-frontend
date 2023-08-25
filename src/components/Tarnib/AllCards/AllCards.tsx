// Import React and any necessary dependencies
import React from 'react';
import styles from './AllCards.module.css';
import PlayerHand from '../PlayerHand/PlayerHand';
import OtherHand from '../OtherHand/OtherHand';
import PreviousTurn from '../PreviousTurn/PreviousTurn';

// Define a type for the component's props (if needed)
interface AllCardsProps {
  players: string[];
  seat2Player: string;
  seat3Player: string;
  seat4Player: string;
  playerName: string;
  turn: number;
  playerCards: string[];
  tarnib: string;
  isYourTurn: boolean;
  currentPlay: string[];
  playerSeat: number;
  previousTurnData: any;
  handleCardClick: (card: string) => void;
}

// Define the PlayerHand component
const AllCards: React.FC<AllCardsProps> = ({
  players,
  playerName,
  seat2Player,
  seat3Player,
  seat4Player,
  turn,
  playerCards,
  tarnib,
  isYourTurn,
  currentPlay,
  playerSeat,
  previousTurnData,
  handleCardClick,
}) => {
  return (
    <div className={styles.game_container}>
      <div className={`${styles.player_name} ${styles.seat_1_name}`}>{playerName}</div>
      <div className={`${styles.player_name} ${styles.seat_2_name}`}>{seat2Player}</div>
      <div className={`${styles.player_name} ${styles.seat_3_name}`}>{seat3Player}</div>
      <div className={`${styles.player_name} ${styles.seat_4_name}`}>{seat4Player}</div>
      <PlayerHand
        cards={playerCards}
        isYourTurn={isYourTurn}
        currentPlay={currentPlay}
        playerSeat={playerSeat}
        tarnib={tarnib}
        handleCardClick={handleCardClick}
      />
      <OtherHand card_count={14 - turn} player_number={2} />
      <OtherHand card_count={14 - turn} player_number={3} />
      <OtherHand card_count={14 - turn} player_number={4} />
      <PreviousTurn playerName={playerName} players={players} playerSeat={playerSeat} tarnib={tarnib} previousTurnData={previousTurnData}/>
    </div>
  );
};

// Export the PlayerHand component
export default AllCards;
