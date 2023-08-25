// Import React and any necessary dependencies
import React, { useEffect, useState } from 'react';
import styles from './SuggestedReimbursement.module.css';
import { Player } from '../Player';
import { formatter } from '../CurrencyFormat';

// Define a type for the component's props (if needed)
interface SuggestedReimbursementProps {
  players: Player[];
}

interface PlayerResults {
  name: string;
  result: number
}

// Define the PlayerHand component
const SuggestedReimbursement: React.FC<SuggestedReimbursementProps> = ({ players}) => {
  var bank = 0;
  var winners: PlayerResults[] = []
  var losers: PlayerResults[] = []
  players.map((player: Player) => {
    if(player.cash_out_amount - player.buy_in_amount > 0){
      bank+= player.cash_out_amount - player.buy_in_amount
      winners.push({
        name: player.name,
        result: player.cash_out_amount - player.buy_in_amount
      })
    }else if(player.cash_out_amount - player.buy_in_amount < 0){
      losers.push({
        name: player.name,
        result: player.cash_out_amount - player.buy_in_amount
      })
    }
    
  })

  winners.sort((a, b) => b.result - a.result)
  losers.sort((a, b) => a.result - b.result)

  var transactions = [];

  var winnerIndex = 0;
  var loserIndex = 0;

  while(bank > 0){
    let win = winners[winnerIndex].result
    let loss = Math.abs(losers[loserIndex].result)
    if(win > loss){
      winners[winnerIndex].result = win - loss
      losers[loserIndex].result = 0
      bank -= loss;
      transactions.push(`${losers[loserIndex].name} owes ${winners[winnerIndex].name} ${formatter.format(loss)}`)
      loserIndex++;
    } else if(win < loss){
      winners[winnerIndex].result = 0
      losers[loserIndex].result =  win - loss
      bank -= win;
      transactions.push(`${losers[loserIndex].name} owes ${winners[winnerIndex].name} ${formatter.format(win)}`)
      winnerIndex++;
    }else{
      winners[winnerIndex].result = 0
      losers[loserIndex].result = 0
      bank -= win;
      transactions.push(`${losers[loserIndex].name} owes ${winners[winnerIndex].name} ${formatter.format(win)}`)
      winnerIndex++;
      loserIndex++;
    }
  }



  return (
    <div className={styles.container}>
      <h2>Suggest Reimbursments</h2>
      {transactions.map((transaction, key) => (<div className={styles.reimbursment} key={key}>{transaction}</div>))}
    </div>
  );
};

// Export the PlayerHand component
export default SuggestedReimbursement;
