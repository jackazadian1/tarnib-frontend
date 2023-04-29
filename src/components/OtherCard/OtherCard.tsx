// Import React and any necessary dependencies
import React, { useEffect } from 'react';
import styles from './OtherCard.module.css';

// Define a type for the component's props (if needed)
interface PlayerCardProps {
  player_number: number;
}

// Define the PlayerHand component
const PlayerCard: React.FC<PlayerCardProps> = ({ player_number }) => {
  var cardStyle = styles.player_2_card;
  if (player_number == 3) cardStyle = styles.player_3_card;
  else if (player_number == 4) cardStyle = styles.player_4_card;
  return (
    <div
      className={`${styles.card} ${cardStyle}`}
      style={{ backgroundImage: 'url("/assets/images/card-back-red.png")' }}
    ></div>
  );
};

// Export the PlayerHand component
export default PlayerCard;
