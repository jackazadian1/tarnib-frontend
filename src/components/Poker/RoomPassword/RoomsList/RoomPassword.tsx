// Import React and any necessary dependencies
import React, { useEffect, useState } from 'react';
import styles from './RoomPassword.module.css';
import { Room } from '../../Room';
import axios from 'axios';

// Define a type for the component's props (if needed)
interface RoomPasswordProps {
  //room: Room
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>, passwordData: any ) => void
}

// Define the PlayerHand component
const RoomPassword: React.FC<RoomPasswordProps> = ({ handleFormSubmit}) => {

  const [formData, setFormData] = useState({ password: '' });

  const postHeaders = {
    'Content-Type': 'application/json',
  }
  // const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   try {
  //     let data = {
  //       ...formData,
  //     }

  //     const response = await axios.post(`${process.env.REACT_APP_PHP_BACKEND_API_URI}api/authenticate`, data, {headers: postHeaders});
  //     console.log(response.data);

  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  
  return (
    <div className={styles.content}>
      <form className={styles.form_container} onSubmit={(e)=>handleFormSubmit(e,formData)}>
        <div className={styles.intput_container}>
        <input
          type="text"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          placeholder="Password"
          name="password"
        />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>

  );
};

// Export the PlayerHand component
export default RoomPassword;
