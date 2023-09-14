// Import React and any necessary dependencies
import React, { useEffect, useState } from 'react';
import styles from './RoomStats.module.css';
import { formatter } from '../CurrencyFormat';

// Define a type for the component's props (if needed)
interface RoomStatsProps {
  totalBank: number;
  remainingBank: number;
  activePlayers: number;
}

// Define the PlayerHand component
const RoomStats: React.FC<RoomStatsProps> = ({ totalBank, remainingBank, activePlayers}) => {
  return (
    <div className={styles.container}>
      <div className={styles.stat}>Total Bank: {formatter.format(totalBank)}</div>
      <div className={styles.stat}>Remaining Bank: {formatter.format(remainingBank)}</div>
      <div className={styles.stat}>Active Players: {activePlayers}</div>
    </div>
  );
};

// Export the PlayerHand component
export default RoomStats;
