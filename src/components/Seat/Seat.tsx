// Import React and any necessary dependencies
import React, { useEffect } from 'react';
import styles from './Seat.module.css';
import { isDisabled } from '@testing-library/user-event/dist/utils';

// Define a type for the component's props (if needed)
interface SeatProps {
  seat_number: number;
  player_name: string;
  onSeatButtonClick: (seatNumber: number) => void;
}

// Define the PlayerHand component
const Seat: React.FC<SeatProps> = ({ seat_number, player_name, onSeatButtonClick }) => {
  var seatStyle = styles.player_1_seat;
  if (seat_number == 2) seatStyle = styles.player_2_seat;
  else if (seat_number == 3) seatStyle = styles.player_3_seat;
  else if (seat_number == 4) seatStyle = styles.player_4_seat;

  return (
    <button
      className={`${styles.seat} ${seatStyle}`}
      disabled={player_name != ''}
      onClick={() => onSeatButtonClick(seat_number)}
    >
      {player_name == '' ? `Player ${seat_number}` : player_name}
    </button>
  );
};

// Export the PlayerHand component
export default Seat;
