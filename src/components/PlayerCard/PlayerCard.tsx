// Import React and any necessary dependencies
import React, { useEffect } from 'react';
import styles from './PlayerCard.module.css';
import { motion } from "framer-motion"

// Define a type for the component's props (if needed)
interface PlayerCardProps {
  card: string;
  suit: string;
  valid: boolean;
  handleCardClick: (card: string) => void;
}

// Define the PlayerHand component
const PlayerCard: React.FC<PlayerCardProps> = ({ card, suit, valid, handleCardClick }) => {
  const validClass = valid ? styles.valid : '';
  return (
    <motion.div
      className={`${styles.card} ${suit} ${validClass}`}
      style={{ backgroundImage: 'url("/assets/images/png-cards/' + card + '.png")' }}
      onClick={() => {
        if (valid) handleCardClick(card);
      }}
      initial={{ opacity: 0, scale: 0.2}}
      animate={{ opacity: 1, scale: 1}}
      whileHover={{
        scale: 1.2,
        y: -150,
        x: -10,
        transition: { duration: 0 }
      }}
      whileTap={{ 
        scale: 0.9,
        transition: { duration: 0 }
      }}
    />
  );
};

// Export the PlayerHand component
export default PlayerCard;
