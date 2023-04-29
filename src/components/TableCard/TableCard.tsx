// Import React and any necessary dependencies
import React, { useEffect } from 'react';
import styles from './TableCard.module.css';

// Define a type for the component's props (if needed)
interface TableCardProps {
  card: string;
  seatNumber: number;
  playerSeat: number;
}

// Define the PlayerHand component
const TableCard: React.FC<TableCardProps> = ({ card, seatNumber, playerSeat }) => {
  let styles_arr = [styles.seat_1_card, styles.seat_2_card, styles.seat_3_card, styles.seat_4_card];
  let offset = playerSeat - 1;
  let index = seatNumber - offset <= 0 ? seatNumber - offset + 4 : seatNumber - offset;

  return (
    <div
      className={`${styles.card} ${styles_arr[index - 1]}`}
      style={{ backgroundImage: 'url("/assets/images/png-cards/' + card + '.png")' }}
    ></div>
  );
};

// Export the PlayerHand component
export default TableCard;
