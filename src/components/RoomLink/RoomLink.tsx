// Import React and any necessary dependencies
import React from 'react';
import styles from './RoomLink.module.css';

const RoomLink: React.FC = () => {

  return (
     <div className={styles.invite_link} onClick={() => {navigator.clipboard.writeText(window.location.href)}}>Click Here to copy Invite Link!</div>
  );
};

// Export the PlayerHand component
export default RoomLink;
