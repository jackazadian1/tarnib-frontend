// Import React and any necessary dependencies
import React, { useEffect, useState } from 'react';
import styles from './RoomsList.module.css';
import { Room } from '../Room';
import RoomsListItem from '../RoomsListItem/RoomsListItem';

// Define a type for the component's props (if needed)
interface RoomsListProps {
  rooms: Room[]
}

// Define the PlayerHand component
const RoomsList: React.FC<RoomsListProps> = ({ rooms }) => {
  
  const [allRooms, setAllRooms] = useState(false);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Poker Rooms</h2>
        <div className={styles.rooms_toggle} onClick={()=>setAllRooms(!allRooms)}>
          {allRooms ? 'All Rooms' : 'Open Rooms'}
          <div className={`${styles.toggle} ${allRooms && styles.toggle_enabled}`}>
        </div>
</div>
      </div>
      <div className={styles.list}>
        {rooms.filter((room) => {
          return room.is_open || allRooms
        }).map((room, key)=>(
          <RoomsListItem room={room} key={key}/>
          ))}
      </div>
    </div>
  );
};

// Export the PlayerHand component
export default RoomsList;
