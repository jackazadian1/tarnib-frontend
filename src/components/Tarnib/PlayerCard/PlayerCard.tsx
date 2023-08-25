// Import React and any necessary dependencies
import React from 'react';
import styles from './PlayerCard.module.css';

// Define a type for the component's props (if needed)
interface PlayerCardProps {
  card: string;
  suit: string;
  valid: boolean;
  tarnib: string;
  handleCardClick: (card: string) => void;
}

// Define the PlayerHand component
const PlayerCard: React.FC<PlayerCardProps> = ({ card, suit, valid, tarnib, handleCardClick }) => {
  const validClass = valid ? styles.valid : '';
  return (
    <div
      className={`${styles.card} ${suit} ${validClass} ${suit == tarnib ? styles.tarnib : ''}`}
      style={{ backgroundImage: 'url("/assets/images/png-cards/' + card + '.png")' }}
      onClick={() => {
        if (valid) handleCardClick(card);
      }}
    />
  );
};

// Export the PlayerHand component
export default PlayerCard;
