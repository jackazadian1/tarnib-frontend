// Import React and any necessary dependencies
import React, { useEffect, useState } from 'react';
import styles from './Seat.module.css';

// Define a type for the component's props (if needed)
interface SeatProps {
  seat_number: number;
  player_name: string;
  onSeatButtonClick: (seatNumber: number, playerName: string) => void;
}


// Define the PlayerHand component
const Seat: React.FC<SeatProps> = ({ seat_number, player_name, onSeatButtonClick }) => {
  const [playerNameInput, setPlayerNameInput] = useState('');

  
  var seatStyle = styles.player_1_seat;
  if (seat_number == 2) seatStyle = styles.player_2_seat;
  else if (seat_number == 3) seatStyle = styles.player_3_seat;
  else if (seat_number == 4) seatStyle = styles.player_4_seat;

  return (
    <div className={`${styles.seat_container} ${seatStyle}`}>

      {player_name == '' && 
        <input 
        type="text"
        value={playerNameInput}
        placeholder='Display Name'
        onChange={(e) => setPlayerNameInput(e.target.value)}
        />
      }
      
      <button
        disabled={player_name != ''}
        onClick={() => onSeatButtonClick(seat_number, playerNameInput)}
      >
        {player_name == '' ? `Player ${seat_number}` : player_name}
      </button>
    </div>
    
  );
};

// Export the PlayerHand component
export default Seat;
