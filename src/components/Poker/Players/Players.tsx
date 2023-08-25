// Import React and any necessary dependencies
import React from 'react';
import styles from './Players.module.css';
import { Player } from '../Player';
import PlayerFC from '../Player/PlayerFC';

// Define a type for the component's props (if needed)
interface PlayersProps {
  players: Player[];
  handleAddChipsClick: (id: number, amount: number) => void;
  handleCashoutClick: (id: number, amount: number) => void;
}

// Define the PlayerHand component
const Players: React.FC<PlayersProps> = ({ players, handleAddChipsClick, handleCashoutClick}) => {

  return (
    <div className={styles.container}>
      {players.map((player) => (
        <PlayerFC player={player} handleAddChipsClick={handleAddChipsClick} handleCashoutClick={handleCashoutClick} key={player.id}/>
      ))}
    </div>


  );
};

// Export the PlayerHand component
export default Players;
