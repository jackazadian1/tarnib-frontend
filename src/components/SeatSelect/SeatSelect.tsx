// Import React and any necessary dependencies
import React, { useEffect } from 'react';
import styles from './SeatSelect.module.css';
import Seat from '../Seat/Seat';

// Define a type for the component's props (if needed)
interface SeatSelectProps {
  player_1: string;
  player_2: string;
  player_3: string;
  player_4: string;
  onSeatButtonClick: (seatNumber: number, playerName: string) => void;
}

// Define the PlayerHand component
const SeatSelect: React.FC<SeatSelectProps> = ({ player_1, player_2, player_3, player_4, onSeatButtonClick }) => {


  return (
      <div className={styles.select}>
          <h1>Select A Seat</h1>
          <Seat seat_number={1} player_name={player_1} onSeatButtonClick={onSeatButtonClick} />
          <Seat seat_number={2} player_name={player_2} onSeatButtonClick={onSeatButtonClick} />
          <Seat seat_number={3} player_name={player_3} onSeatButtonClick={onSeatButtonClick} />
          <Seat seat_number={4} player_name={player_4} onSeatButtonClick={onSeatButtonClick} /> 
      </div>
  );
};

// Export the PlayerHand component
export default SeatSelect;
