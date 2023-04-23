// Import React and any necessary dependencies
import React from 'react';
import styles from './PlayerHand.module.css';
import PlayerCard from './PlayerCard';

// Define a type for the component's props (if needed)
interface PlayerHandProps {
  cards: string[];
}

const getCardSuit = (card: string) => {
    var suit = '';
    if(card.includes('spades')) suit = 'spades';
    else if(card.includes('hearts')) suit = 'hearts';
    else if(card.includes('clubs')) suit = 'clubs';
    else  suit = 'diamonds';
    return suit;
};

// Define the PlayerHand component
const PlayerHand: React.FC<PlayerHandProps> = ({ cards }) => {
  return (
    <div className={styles.hand}>
        {cards.map((card, index) => (
            <PlayerCard key={index} card={card} suit={getCardSuit(card)} valid={getCardSuit(card) == "no"}/>
        ))}
    </div>
  );
};

// Export the PlayerHand component
export default PlayerHand;
