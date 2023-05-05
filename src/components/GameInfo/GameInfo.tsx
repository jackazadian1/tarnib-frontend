// Import React and any necessary dependencies
import React, { useEffect } from 'react';
import styles from './GameInfo.module.css';
import PlayerHand from '../PlayerHand/PlayerHand';
import OtherHand from '../OtherHand/OtherHand';
import PreviousTurn from '../PreviousTurn/PreviousTurn';

// Define a type for the component's props (if needed)
interface GameInfoProps {
  round: number;
  turn: number;
  tarnib: string;
  goal: number;
  bidWinner: string;
  team1: string;
  team2: string;
  team1score: number;
  team2score: number;
  team1GameScore: number;
  team2GameScore: number;
}

// Define the PlayerHand component
const GameInfo: React.FC<GameInfoProps> = ({
  round,
  turn,
  tarnib,
  goal,
  bidWinner,
  team1,
  team2,
  team1score,
  team2score,
  team1GameScore,
  team2GameScore,
}) => {
  return (
    <div className={styles.game_container}>
      <div className={styles.room_info}>
        <div>
          Round: <span>{round}</span>
        </div>
        <div>
          {team1}: <span>{team1GameScore}</span>
        </div>
        <div>
          {team2}: <span>{team2GameScore}</span>
        </div>
      </div>
      <div className={styles.round_info}>
        
        <div>
          Turn: <span>{turn}</span>
        </div>
        <div>
          Tarnib:
          <span className={styles.tarnib}>
            {(tarnib == '' || tarnib == undefined || tarnib == null) ? 
            ' TBD' : (<React.Fragment><img src={`/assets/images/${tarnib}_icon.png`}/><span>({bidWinner})</span></React.Fragment>)
            }
          </span>
        </div>
        <div>
          Goal: <span>{(tarnib == '' || tarnib == undefined || tarnib == null) ? 
            ' TBD' : ` ${goal}`
            }</span>
        </div>
        <div>
          {team1}: <span>{team1score}</span>
        </div>
        <div>
          {team2}: <span>{team2score}</span>
        </div>
      </div>
    </div>
  );
};

// Export the PlayerHand component
export default GameInfo;
