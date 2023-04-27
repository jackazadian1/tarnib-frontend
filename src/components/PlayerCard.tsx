// Import React and any necessary dependencies
import React, { useEffect } from 'react';
import styles from './PlayerCard.module.css';

// Define a type for the component's props (if needed)
interface PlayerCardProps {
  card: string;
  suit: string;
  valid: boolean;
  handleCardClick: (card: string) => void
}

// Define the PlayerHand component
const PlayerCard: React.FC<PlayerCardProps> = ({ card, suit, valid, handleCardClick }) => {

  const validClass = valid ? styles.valid : ''
  return (
    <div className={`${styles.card} ${suit} ${validClass}`} style={{backgroundImage: 'url("/assets/images/png-cards/'+card+'.png")'}} onClick={() => { if(valid) handleCardClick(card)}}></div>
  );
};

// Export the PlayerHand component
export default PlayerCard;
