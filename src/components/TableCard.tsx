// Import React and any necessary dependencies
import React, { useEffect } from 'react';
import styles from './PlayerCard.module.css';

// Define a type for the component's props (if needed)
interface TableCardProps {
  card: string;
  suit: string;
}

// Define the PlayerHand component
const TableCard: React.FC<TableCardProps> = ({ card, suit }) => {

  return (
    <div>{card}</div>
  );
};

// Export the PlayerHand component
export default TableCard;
