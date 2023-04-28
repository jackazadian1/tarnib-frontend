// Import React and any necessary dependencies
import React, { useEffect } from 'react';
import styles from './GameInfo.module.css';
import PlayerHand from './PlayerHand';
import OtherHand from './OtherHand';

// Define a type for the component's props (if needed)
interface GameInfoProps {
  playerName: string;
  seat2Player: string;
  seat3Player: string;
  seat4Player: string;
  roomId: string;
  round: number;
  turn: number;
  playerCards: string[];
  tarnib: string;
  goal: number;
  bidWinner: string;
  isYourTurn: boolean;
  currentPlay: string[];
  playerSeat: number;
  team1: string;
  team2: string;
  team1score: number;
  team2score: number;
  team1GameScore: number;
  team2GameScore: number;
  handleCardClick: (card: string) => void
}

// Define the PlayerHand component
const GameInfo: React.FC<GameInfoProps> = ({ playerName, seat2Player, seat3Player, seat4Player, roomId, round, turn, playerCards, tarnib, goal, bidWinner, isYourTurn, currentPlay, playerSeat, team1, team2, team1score, team2score, team1GameScore, team2GameScore, handleCardClick }) => {

  return (
    <div className={styles.game_container}>
        <div className={`${styles.player_name} ${styles.seat_1_name}`}>{playerName}</div>
        <div className={`${styles.player_name} ${styles.seat_2_name}`}>{seat2Player}</div>
        <div className={`${styles.player_name} ${styles.seat_3_name}`}>{seat3Player}</div>
        <div className={`${styles.player_name} ${styles.seat_4_name}`}>{seat4Player}</div>
        <div className={styles.room_info}>
          <div>Room ID: <span>{roomId}</span></div>
          <div>{team1}: <span>{team1GameScore}</span></div>
          <div>{team2}: <span>{team2GameScore}</span></div>
        </div>
        <div className={styles.game_info}>
          <div>Round: <span>{round}</span></div>
          <div>Turn: <span>{turn}</span></div>
          <div>Tarnib: <span>{tarnib} ({bidWinner})</span></div>
          <div>Goal: <span>{goal}</span></div>
          <div>{team1}: <span>{team1score}</span></div>
          <div>{team2}: <span>{team2score}</span></div>
        </div>
        

        <PlayerHand cards={playerCards} isYourTurn={isYourTurn} currentPlay={currentPlay} playerSeat={playerSeat} tarnib={tarnib} handleCardClick={handleCardClick}/>
        <OtherHand card_count={14-turn} player_number={2}/>
        <OtherHand card_count={14-turn} player_number={3}/>
        <OtherHand card_count={14-turn} player_number={4}/>
    </div>
  );
};

// Export the PlayerHand component
export default GameInfo;
