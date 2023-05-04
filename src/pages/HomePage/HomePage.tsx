import React, { useState } from 'react';
import axios from 'axios';
import styles from './HomePage.module.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const HomePage: React.FC = () => {
  const [form1Data, setForm1Data] = useState({ player_name: '' });
  const [form2Data, setForm2Data] = useState({ room_id: '' });
  const navigate = useNavigate();

  const cookies = new Cookies();

  const postHeaders = {
    'Content-Type': 'application/json',
  }

  const handleForm1Submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    var randomToken = require('random-token');
    let token = randomToken(16);

    try {
      let data = {
        ...form1Data,
        player_token: token,
      }

      const response = await axios.post(`${process.env.REACT_APP_PHP_BACKEND_API_URI}/api/create`, data, {headers: postHeaders});
      console.log(response.data);
      cookies.set('player_token', token, {path: '/'});
      navigate(`/room/${response.data.room_id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleForm2Submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/room?room_id=${form2Data.room_id}`);
    // try {
    //   const response = await axios.get(`${process.env.REACT_APP_PHP_BACKEND_API_URI}/api/join`, form2Data);
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
          placeholder="Enter Your Name"
          name="player_name"
        />
        <button type="submit">Create Room</button>
      </form>
      <form className={styles.container} onSubmit={handleForm2Submit}>
        <input
          type="text"
          value={form2Data.room_id}
          onChange={(e) => setForm2Data({ ...form2Data, room_id: e.target.value })}
          placeholder="Room ID"
          name="room_id"
        />
        <button type="submit">Join Room</button>
      </form>
    </div>
  );
};

export default HomePage;
