// Import React and any necessary dependencies
import React, { useEffect, useState } from 'react';
import styles from './RoomsListItem.module.css';
import { Room } from '../Room';
import { useNavigate } from 'react-router-dom';

// Define a type for the component's props (if needed)
interface RoomsListItemProps {
  room: Room
}

// Define the PlayerHand component
const RoomsListItem: React.FC<RoomsListItemProps> = ({ room }) => {  

  const navigate = useNavigate();
  function handleRoomListItemClick() {
      navigate(`/poker/room/${room.room_id}`);
  }

  var date = new Date(room.date)
  return (
    <div className={`${styles.container} ${room.is_open ? '': styles.closed_room}`} onClick={() => handleRoomListItemClick()}>
        <div className={styles.room_date}>{room.name ? room.name : date.toDateString()}</div>
        {room.password && <div className={styles.lock}style={{ backgroundImage: 'url("/assets/images/password_icon.svg")' }}></div>}
        
    </div>
  );
};

// Export the PlayerHand component
export default RoomsListItem;
