// Import React and any necessary dependencies
import React, { useEffect } from 'react';
import styles from './Bids.module.css';
import BidOption from '../BidOption/BidOption';

// Define a type for the component's props (if needed)
interface BidsProps {
  current_bidder: number;
  bids: number[];
  players: string[];
  player: string;
  playerSeat: number;
  handleBidClick: (amount: number) => void;
}

// Define the PlayerHand component
const Bids: React.FC<BidsProps> = ({ current_bidder, bids, players, player, playerSeat, handleBidClick }) => {
  let max_bid = Math.max(...bids);
  let player_name = player == players[current_bidder] ? 'You are' : `${players[current_bidder]} is`;
  let yourTurn = player == players[current_bidder];

  let playerSeatBids = [0,0,0,0];
  playerSeatBids[0] = bids[playerSeat-1]
  playerSeatBids[1] = bids[playerSeat%4]
  playerSeatBids[2] = bids[(playerSeat+1)%4]
  playerSeatBids[3] = bids[(playerSeat+2)%4]

  let numberOfPasses = 0;
  bids.forEach(bid => {
    if(bid == -1) numberOfPasses++;
  });

  return (
    <div className={styles.container}>
      <h2 id="ready">{player_name} now bidding!</h2>
      <div className={`${styles.options} ${yourTurn ? '' : styles.disabled}`}>
        <BidOption amount={-1} max_bid={numberOfPasses} handleBidClick={handleBidClick} />
        <BidOption amount={7} max_bid={max_bid} handleBidClick={handleBidClick} />
        <BidOption amount={8} max_bid={max_bid} handleBidClick={handleBidClick} />
        <BidOption amount={9} max_bid={max_bid} handleBidClick={handleBidClick} />
        <BidOption amount={10} max_bid={max_bid} handleBidClick={handleBidClick} />
        <BidOption amount={11} max_bid={max_bid} handleBidClick={handleBidClick} />
        <BidOption amount={12} max_bid={max_bid} handleBidClick={handleBidClick} />
        <BidOption amount={13} max_bid={max_bid} handleBidClick={handleBidClick} />
      </div>
      <div id="player_1_bid" className={`${styles.player_1_bid} ${styles.bid}`}>
        {playerSeatBids[0] == -1 ? 'Pass' : playerSeatBids[0]}
      </div>
      <div id="player_2_bid" className={`${styles.player_2_bid} ${styles.bid}`}>
      {playerSeatBids[1] == -1 ? 'Pass' : playerSeatBids[1]}
      </div>
      <div id="player_3_bid" className={`${styles.player_3_bid} ${styles.bid}`}>
      {playerSeatBids[2] == -1 ? 'Pass' : playerSeatBids[2]}
      </div>
      <div id="player_4_bid" className={`${styles.player_4_bid} ${styles.bid}`}>
      {playerSeatBids[3] == -1 ? 'Pass' : playerSeatBids[3]}
      </div>
    </div>
  );
};

// Export the PlayerHand component
export default Bids;
