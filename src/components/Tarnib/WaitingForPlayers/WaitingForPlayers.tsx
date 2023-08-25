// Import React and any necessary dependencies
import React from 'react';
import styles from './WaitingForPlayers.module.css';

interface WaitingForPlayersProps {
    player_1: string;
    player_2: string;
    player_3: string;
    player_4: string;

}

const WaitingForPlayers: React.FC<WaitingForPlayersProps> = ({player_1, player_2, player_3, player_4}) => {

  return (
    <div className={styles.container}>
        <h2 id="waiting">Waiting for all players to connect...</h2>
        <div className={`${styles.player_1_name} ${styles.player_name}`}>{player_1}</div>
        <div className={`${styles.player_2_name} ${styles.player_name}`}>{player_2}</div>
        <div className={`${styles.player_3_name} ${styles.player_name}`}>{player_3}</div>
        <div className={`${styles.player_4_name} ${styles.player_name}`}>{player_4}</div>

    </div>
  );
};

// Export the PlayerHand component
export default WaitingForPlayers;
