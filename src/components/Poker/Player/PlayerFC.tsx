import React, { useEffect, useState } from 'react';
import styles from './PlayerFC.module.css';
import { Player } from '../Player';
import { formatter } from '../CurrencyFormat';

interface PlayerProps {
  player: Player;
  isOpen: boolean;
  handleSelectPlayer: (id: number,) => void;
}

const PlayerFC: React.FC<PlayerProps> = ({player, isOpen, handleSelectPlayer}) => {
  return (
    <div className={`${styles.container} ${player.cash_out_amount != -1 ? (player.buy_in_amount <= player.cash_out_amount ? styles.profit : styles.loss) : ''}`}  onClick={() => {if(isOpen) handleSelectPlayer(player.id)}}>
      <div className={styles.player_info}>
        <div className={styles.player_name}>{player.name}</div>
        <div>{formatter.format(player.buy_in_amount)}</div>
        <div>{player.cash_out_amount == -1 ? '--' : formatter.format(player.cash_out_amount)}</div>
        <div>{player.cash_out_amount == -1 ? '--' : formatter.format(player.cash_out_amount - player.buy_in_amount)}</div>
      </div>
    </div>
  );
};

// Export the PlayerHand component
export default PlayerFC;
