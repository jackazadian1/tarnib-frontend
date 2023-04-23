import React, { useState } from 'react';
import axios from 'axios';
import styles from './HomePage.module.css';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const [form1Data, setForm1Data] = useState({ player_name: '' });
  const [form2Data, setForm2Data] = useState({ player_name: '', room_id: '' });
  const navigate = useNavigate();

  const handleForm1Submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:97/api/create', form1Data);
      console.log(response.data);
      navigate(`/room?room_id=${response.data.room_id}&player_name=${response.data.player_name}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleForm2Submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();    
    navigate(`/room?room_id=${form2Data.room_id}&player_name=${form2Data.player_name}`);
    // try {
    //   const response = await axios.get('http://127.0.0.1:97/api/join', form2Data);
    //   console.log(response.data);
    // } catch (error) {
    //   console.error(error);
    // }
  };

  return (
    <div className={styles.content}>
      <form className={styles.container} onSubmit={handleForm1Submit}>
          <input
            type="text"
            value={form1Data.player_name}
            onChange={(e) => setForm1Data({ ...form1Data, player_name: e.target.value })}
            placeholder='Enter Your Name'
            name='player_name'
          />
        <button type="submit">Create Room</button>
      </form>
      <form className={styles.container} onSubmit={handleForm2Submit}>
          <input
            type="text"
            value={form2Data.player_name}
            onChange={(e) => setForm2Data({ ...form2Data, player_name: e.target.value })}
            placeholder='Enter Your Name'
            name='player_name'
          />
          <input
            type="text"
            value={form2Data.room_id}
            onChange={(e) => setForm2Data({ ...form2Data, room_id: e.target.value })}
            placeholder='Room ID'
            name='room_id'
          />
        <button type="submit">Join Room</button>
      </form>
    </div>
  );
};

export default HomePage;
