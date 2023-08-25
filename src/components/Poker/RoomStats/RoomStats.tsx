// Import React and any necessary dependencies
import React, { useEffect, useState } from 'react';
import styles from './RoomStats.module.css';
import { Player } from '../Player';
import { formatter } from '../CurrencyFormat';

// Define a type for the component's props (if needed)
interface RoomStatsProps {
  players: Player[]
}

// Define the PlayerHand component
const RoomStats: React.FC<RoomStatsProps> = ({ players}) => {
  const [bank, setBank] = useState(0);
  const [bankAfterCashout, setBankAfterCashout] = useState(0);
  let total = 0;
  let totalAfterCashout = 0;
  let activePlayers = 0
  players.forEach(player => {
    total+= player.buy_in_amount;
    totalAfterCashout+= player.buy_in_amount;
    activePlayers++;
    if(player.cash_out_amount != -1){
      activePlayers--;
      totalAfterCashout-= player.cash_out_amount
    }
  });
  
  return (
    <div className={styles.container}>
      <div className={styles.stat}>Total Bank: {formatter.format(total)}</div>
      <div className={styles.stat}>Current Bank: {formatter.format(totalAfterCashout)}</div>
      <div className={styles.stat}>Active Players: {activePlayers}</div>
    </div>
  );
};

// Export the PlayerHand component
export default RoomStats;
