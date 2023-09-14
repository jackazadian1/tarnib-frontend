// Import React and any necessary dependencies
import React from 'react';
import styles from './Players.module.css';
import { Player } from '../Player';
import PlayerFC from '../Player/PlayerFC';

// Define a type for the component's props (if needed)
interface PlayersProps {
  players: Player[];
  isOpen: boolean;
  handleSelectPlayer: (id: number,) => void;
}

// Define the PlayerHand component
const Players: React.FC<PlayersProps> = ({ players, isOpen, handleSelectPlayer}) => {

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.player_name}><strong>Player</strong></div>
        <div><strong>Buy In</strong></div>
        <div><strong>Cashout</strong></div>
        <div><strong>Result</strong></div>
      </div>
      <div className={styles.body}>
        {players.map((player) => (
          <PlayerFC player={player} isOpen={isOpen} handleSelectPlayer={handleSelectPlayer} key={player.id}/>
        ))}
      </div>

    </div>


  );
};

// Export the PlayerHand component
export default Players;
