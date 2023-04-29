// Import React and any necessary dependencies
import React from 'react';
import styles from './OtherHand.module.css';
import OtherCard from '../OtherCard/OtherCard';

// Define a type for the component's props (if needed)
interface OtherHandPRops {
  card_count: number;
  player_number: number;
}

// Define the PlayerHand component
const OtherHand: React.FC<OtherHandPRops> = ({ card_count, player_number }) => {
  var handStyle = styles.player_2_hand;
  if (player_number == 3) handStyle = styles.player_3_hand;
  else if (player_number == 4) handStyle = styles.player_4_hand;
  return (
    <div className={`${styles.hand} ${handStyle}`}>
      {Array.from(Array(card_count), (e, i) => (
        <OtherCard key={i} player_number={player_number} />
      ))}
    </div>
  );
};

// Export the PlayerHand component
export default OtherHand;
