// Import React and any necessary dependencies
import React from 'react';
import styles from './GameOver.module.css';

interface GameOverProps {
    winners: string;
    team_1: string;
    team_2: string;
    team_1_score: string;
    team_2_score: string;
    handleMoveToNewRoomClick: () => void;

}

const GameOver: React.FC<GameOverProps> = ({winners, team_1, team_2, team_1_score, team_2_score, handleMoveToNewRoomClick}) => {

  return (
    <div className={styles.container}>
        <h2>{winners} have won the Game</h2>
        <h3>{team_1} score: {team_1_score}</h3>
        <h3>{team_2} score: {team_2_score}</h3>
        <button onClick={() => handleMoveToNewRoomClick()}>Create New Room</button>
    </div>
  );
};

// Export the PlayerHand component
export default GameOver;
