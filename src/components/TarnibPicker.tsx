// Import React and any necessary dependencies
import React, { useEffect } from 'react';
import styles from './TarnibPicker.module.css';

// Define a type for the component's props (if needed)
interface TarnibPickerProps {
  picker_name: string;
  player_name: string;
  handleTarnibPickClick: (suit: string) => void;
}

// Define the PlayerHand component
const TarnibPicker: React.FC<TarnibPickerProps> = ({picker_name, player_name, handleTarnibPickClick }) => {


  return (
    <div className={styles.container}>
        { picker_name == player_name ? (
            <React.Fragment>
                <h2 className={styles.player_picking}>Pick a Tarnib!</h2>
                <div className={styles.cards}>
                    <button className={styles.card} onClick={() => handleTarnibPickClick('hearts')} style={{backgroundImage: 'url("/assets/images/png-cards/14_of_hearts.png")'}}></button>
                    <button className={styles.card} onClick={() => handleTarnibPickClick('spades')} style={{backgroundImage: 'url("/assets/images/png-cards/14_of_spades.png")'}}></button>
                    <button className={styles.card} onClick={() => handleTarnibPickClick('diamonds')} style={{backgroundImage: 'url("/assets/images/png-cards/14_of_diamonds.png")'}}></button>
                    <button className={styles.card} onClick={() => handleTarnibPickClick('clubs')} style={{backgroundImage: 'url("/assets/images/png-cards/14_of_clubs.png")'}}></button>
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
