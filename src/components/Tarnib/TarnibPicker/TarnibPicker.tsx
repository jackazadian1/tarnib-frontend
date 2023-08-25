// Import React and any necessary dependencies
import React from 'react';
import styles from './TarnibPicker.module.css';
import { CARD_SUIT_CLUBS, CARD_SUIT_DIAMONDS, CARD_SUIT_HEARTS, CARD_SUIT_SPADES } from '../../../utils/Constant';

// Define a type for the component's props (if needed)
interface TarnibPickerProps {
  picker_name: string;
  player_name: string;
  handleTarnibPickClick: (suit: string) => void;
}

// Define the PlayerHand component
const TarnibPicker: React.FC<TarnibPickerProps> = ({ picker_name, player_name, handleTarnibPickClick }) => {
  return (
    <div className={styles.container}>
      {picker_name == player_name ? (
        <React.Fragment>
          <h2 className={styles.player_picking}>Double Click to pick a Tarnib!</h2>
          <div className={styles.cards}>
            <button
              className={styles.card}
              onClick={() => handleTarnibPickClick(CARD_SUIT_HEARTS)}
              style={{ backgroundImage: 'url("/assets/images/png-cards/14_of_hearts.png")' }}
            ></button>
            <button
              className={styles.card}
              onClick={() => handleTarnibPickClick(CARD_SUIT_SPADES)}
              style={{ backgroundImage: 'url("/assets/images/png-cards/14_of_spades.png")' }}
            ></button>
            <button
              className={styles.card}
              onClick={() => handleTarnibPickClick(CARD_SUIT_DIAMONDS)}
              style={{ backgroundImage: 'url("/assets/images/png-cards/14_of_diamonds.png")' }}
            ></button>
            <button
              className={styles.card}
              onClick={() => handleTarnibPickClick(CARD_SUIT_CLUBS)}
              style={{ backgroundImage: 'url("/assets/images/png-cards/14_of_clubs.png")' }}
            ></button>
          </div>
        </React.Fragment>
      ) : (
        <h2 className={styles.other_picking}>{picker_name} is picking the Tarnib!</h2>
      )}
    </div>
  );
};

// Export the PlayerHand component
export default TarnibPicker;
