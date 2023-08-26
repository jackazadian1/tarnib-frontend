// Import React and any necessary dependencies
import React, { useEffect, useState } from 'react';
import styles from './PlayerFC.module.css';
import { Player } from '../Player';
import { formatter } from '../CurrencyFormat';

// Define a type for the component's props (if needed)
interface PlayerProps {
  player: Player
  handleAddChipsClick: (id: number, amount: number) => void;
  handleCashoutClick: (id: number, amount: number) => void;
}

// Define the PlayerHand component
const PlayerFC: React.FC<PlayerProps> = ({player, handleAddChipsClick, handleCashoutClick}) => {
  const [addingChips, setAddingChips] = useState(false);
  const [cashingOut, setCashingOut] = useState(false);
  const [chipsAmount, setChipsAmount] = useState(0);
  const [cashoutAmount, setCashoutAmount] = useState(0);

  return (
    <React.Fragment>

    <div className={`${styles.container} ${player.cash_out_amount != -1 ? (player.buy_in_amount <= player.cash_out_amount ? styles.profit : styles.loss) : ''}`} >
      <div className={styles.player_info}>
        <div className={styles.name}>{player.name}</div>
        <div className={styles.buy_in}>{formatter.format(player.buy_in_amount)}</div>
      </div>
      {player.cash_out_amount == -1 ? (
        <div className={styles.buttons}>
          <div className={styles.add_chips} onClick={() => setAddingChips(true)}>Edit Balance</div>
          <div className={styles.cashout} onClick={() => setCashingOut(true)}>Cashout</div>
        </div>
      ) : (
        <div className={styles.player_info}>
        <div className={styles.cashout_info}>Cashout: {formatter.format(player.cash_out_amount)}</div>
        <div className={styles.result}>Result: {formatter.format(player.cash_out_amount - player.buy_in_amount)}</div>
        </div>
      )}

    </div>

    {addingChips &&    
    <div className={styles.popup}>
      <div className={styles.popup_close_button} onClick={() => setAddingChips(false)}>x</div>
      <div className={styles.player_info}>
        <div className={styles.popup_name}>{player.name}</div>
        <div className={styles.popup_buy_in}>Current Balance: {formatter.format(player.buy_in_amount)}</div>
      </div>
      <input
            type="number"
            value={chipsAmount}
            onChange={(e) => setChipsAmount(parseInt(e.target.value ? e.target.value : "0"))}
            placeholder="Amount"
            name="amount"
          />
      <div className={styles.popup_button} onClick={() => {
        handleAddChipsClick(player.id, chipsAmount)
        setAddingChips(false)
      }}>Submit</div>
    </div>}

    {cashingOut &&    
    <div className={styles.popup}>
      <div className={styles.popup_close_button} onClick={() => setCashingOut(false)}>x</div>
      <div className={styles.player_info}>
        <div className={styles.popup_name}>{player.name}</div>
        <div className={styles.popup_buy_in}>Current Balance: {formatter.format(player.buy_in_amount)}</div>
      </div>
      <input
            pattern="[0-9]+"
            value={cashoutAmount}
            onChange={(e) => setCashoutAmount(parseInt(e.target.value ? e.target.value : "0"))}
            placeholder="Amount"
            name="amount"
          />
      <div className={styles.popup_button} onClick={() => {
        handleCashoutClick(player.id, cashoutAmount)
        setCashingOut(false)
        }}>Cashout</div>
    </div>}

    </React.Fragment>

  );
};

// Export the PlayerHand component
export default PlayerFC;
