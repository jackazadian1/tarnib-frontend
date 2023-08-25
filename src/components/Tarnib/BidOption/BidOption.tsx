// Import React and any necessary dependencies
import React, { useEffect } from 'react';
import styles from './BidOption.module.css';

// Define a type for the component's props (if needed)
interface BidOptionProps {
  amount: number;
  max_bid: number;
  handleBidClick: (amount: number) => void;
}

// Define the PlayerHand component
const BidOption: React.FC<BidOptionProps> = ({ amount, max_bid, handleBidClick }) => {
  let disabled = amount <= max_bid && amount != -1 ? styles.disabled : '';
  if(amount == -1 && max_bid == 3) disabled = styles.disabled; 
  return (
    <div className={`${styles.option} ${disabled}`} onClick={() => handleBidClick(amount)}>
      {amount == -1 ? 'Pass' : amount}
    </div>
  );
};

// Export the PlayerHand component
export default BidOption;
