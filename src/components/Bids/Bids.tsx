// Import React and any necessary dependencies
import React, { useEffect } from 'react';
import styles from './Bids.module.css';
import BidOption from '../BidOption/BidOption';

// Define a type for the component's props (if needed)
interface BidsProps {
  readyToPlay: boolean;
  current_bidder: number;
  bids: number[];
  players: string[];
  player: string;
  handleBidClick: (amount: number) => void;
}

// Define the PlayerHand component
const Bids: React.FC<BidsProps> = ({ readyToPlay, current_bidder, bids, players, player, handleBidClick }) => {
  let max_bid = Math.max(...bids);
  let player_name = player == players[current_bidder] ? 'You are' : `${players[current_bidder]} is`;
  let yourTurn = player == players[current_bidder];
  return (
    <div className={styles.container}>
      {readyToPlay ? (
        <h2 id="ready">{player_name} now bidding!</h2>
      ) : (
        <h2 id="waiting">Waiting for all players to connect...</h2>
      )}
      <div className={`${styles.options} ${readyToPlay && yourTurn ? '' : styles.disabled}`}>
        <BidOption amount={-1} max_bid={max_bid} handleBidClick={handleBidClick} />
        <BidOption amount={7} max_bid={max_bid} handleBidClick={handleBidClick} />
        <BidOption amount={8} max_bid={max_bid} handleBidClick={handleBidClick} />
        <BidOption amount={9} max_bid={max_bid} handleBidClick={handleBidClick} />
        <BidOption amount={10} max_bid={max_bid} handleBidClick={handleBidClick} />
        <BidOption amount={11} max_bid={max_bid} handleBidClick={handleBidClick} />
        <BidOption amount={12} max_bid={max_bid} handleBidClick={handleBidClick} />
        <BidOption amount={13} max_bid={max_bid} handleBidClick={handleBidClick} />
      </div>
      <div className={styles.label}>Your Bid</div>
      <div id="player_1_bid" className={`${styles.player_1_bid} ${styles.bid}`}>
        0
      </div>
      <div id="player_2_bid" className={`${styles.player_2_bid} ${styles.bid}`}>
        0
      </div>
      <div id="player_3_bid" className={`${styles.player_3_bid} ${styles.bid}`}>
        0
      </div>
      <div id="player_4_bid" className={`${styles.player_4_bid} ${styles.bid}`}>
        0
      </div>
    </div>
  );
};

// Export the PlayerHand component
export default Bids;
