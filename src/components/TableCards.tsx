// Import React and any necessary dependencies
import React from 'react';
import styles from './TableCards.module.css';

// Define a type for the component's props (if needed)
interface TableCardsProps {
  //cards: string[];
}

// const getCardSuit = (card: string) => {
//     var suit = '';
//     if(card.includes('spades')) suit = 'spades';
//     else if(card.includes('hearts')) suit = 'hearts';
//     else if(card.includes('clubs')) suit = 'clubs';
//     else  suit = 'diamonds';
//     return suit;
// };

// Define the PlayerHand component
const TableCards: React.FC<TableCardsProps> = ({  }) => {
  return (
    <div className={styles.table}>
        
    </div>
  );
};

// Export the PlayerHand component
export default TableCards;
