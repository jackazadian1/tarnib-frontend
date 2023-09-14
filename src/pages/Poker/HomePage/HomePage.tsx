import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './HomePage.module.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import RoomsList from '../../../components/Poker/RoomsList/RoomsList';
import { Room } from '../../../components/Poker/Room';
import PokerLayout from '../../../layouts/Poker/PokerLayout';
import Form from '../../../components/Forms/Form';

const PokerHomePage: React.FC = () => {
  const [form1Data, setForm1Data] = useState({ password: '' });
  const [rooms, setRooms] = useState([] as Room[]);
  const [readyToFetch, setReadyToFetch] = useState(false);
  const [hasFethced, setHasFetched] = useState(false);
  const navigate = useNavigate();
  const cookies = new Cookies();

  const postHeaders = {
    'Content-Type': 'application/json',
  }

  const fetchRooms = async () => {        
    if (readyToFetch && !hasFethced) {
    try {

        const response = await axios.get(`${process.env.REACT_APP_PHP_BACKEND_API_URI}api/getPokerRooms`,{
        headers: postHeaders
        });
        // Do something with the response data, e.g., update the component's state
        console.log('fetch data: ',response.data);

        var roomsArr = [] as Room[]
        response.data.rooms.forEach((room: any) => {
            
          roomsArr.push({
                id: room.id,
                room_id: room.room_id,
                password: room.password,
                is_open: room.is_open == 1,
                date: room.created_at,
            } as Room)
        });
        
        setRooms(roomsArr);

        setTimeout(()=>{
            setHasFetched(true);
        },500)

    } catch (error) {
        // Handle any errors that occurred during the request
        console.error('Error fetching data:', error);
    }
  }
    
};

  const handleForm1Submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let data = {
        ...form1Data,
      }

      const response = await axios.post(`${process.env.REACT_APP_PHP_BACKEND_API_URI}api/create_poker`, data, {headers: postHeaders});
      console.log(response.data);
      if(form1Data.password != '')
        cookies.set(`authenticated_${response.data.room_id}`, true, {path: '/'});
      navigate(`/poker/room/${response.data.room_id}`);
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {    
      setReadyToFetch(true);
  }, []);

  useEffect(() => {
    fetchRooms();
  }, [readyToFetch]);

  return (
    <PokerLayout>
        <Form submitHandler={handleForm1Submit}>
          <h2>Create Poker Room</h2>
          <p>Create a new poker room. You can optionally password protect your room.</p>
            <input
              type="text"
              value={form1Data.password}
              onChange={(e) => setForm1Data({ ...form1Data, password: e.target.value })}
              placeholder="Password (optional)"
              name="password"
            />
            <button type="submit">Create Room</button>
        </Form>
        <RoomsList rooms={rooms} />
    </PokerLayout>

  );
};

export default PokerHomePage;
