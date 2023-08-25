import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGameDataPoker } from '../../../components/Poker/useGameData';
import styles from './RoomPage.module.css';
import axios from 'axios';
import Players from '../../../components/Poker/Players/Players';
import RoomStats from '../../../components/Poker/RoomStats/RoomStats';
import { Player } from '../../../components/Poker/Player';
import SuggestedReimbursement from '../../../components/Poker/SuggestedReimbursement/SuggestedReimbursement';
import RoomPassword from '../../../components/Poker/RoomPassword/RoomsList/RoomPassword';
import Cookies from 'universal-cookie';




const PokerRoomPage: React.FC = () => {
  const { roomId } = useParams();

  const postHeaders = {
    'Content-Type': 'application/json',
  }

  const [readyToFetch, setReadyToFetch] = useState(false);
  const [readyToFetchPassword, setReadyToFetchPassword] = useState(false);
  const [hasFethced, setHasFetched] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  const [formData, setFormData] = useState({ player_name: '', buy_in_amount: '' });

  const cookies = new Cookies();

  const {
    gameData,
    setGameData,
    hasPassword,
    checkForPassword,
    fetchData,
    handleAddChipsClick,
    handleCashoutClick
  } = useGameDataPoker(setHasFetched);


  useEffect(() => {    
    if (roomId) {      
      setGameData({ ...gameData, room_id: roomId });
      setReadyToFetchPassword(true);
    }
  }, []);

  useEffect(() => {    
    if (hasPassword == 0 || cookies.get(`authenticated_${gameData.room_id}`) == 'true') {
      setReadyToFetch(true);
      setAuthenticated(true);
    }
  }, [hasPassword]);

  useEffect(() => {
    checkForPassword();
  }, [readyToFetchPassword]);

  useEffect(() => {
    fetchData();
  }, [readyToFetch]);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let data = {
        ...formData,
        room_id: gameData.room_id
      }

      const response = await axios.post(`${process.env.REACT_APP_PHP_BACKEND_API_URI}api/addPokerPlayer`, data, {headers: postHeaders});
      console.log(response.data);

      const newPlayer: Player = {
        id: response.data.id,
        name: formData.player_name,
        buy_in_amount: parseInt(formData.buy_in_amount),
        cash_out_amount: -1,
    };
      setGameData(prevGameData => ({
        ...prevGameData,
        players: [...prevGameData.players, newPlayer],
      }));
    } catch (error) {
      console.error(error);
    }
  };

    const authenticate = async (e: React.FormEvent<HTMLFormElement>, passwordData:any) => {
    e.preventDefault();

    try {
      let data = {
        room_id: gameData.room_id,
        password: passwordData.password
      }

      const response = await axios.post(`${process.env.REACT_APP_PHP_BACKEND_API_URI}api/authenticate`, data, {headers: postHeaders});
      if(response.data){
        setReadyToFetch(true);
        setAuthenticated(true);
        cookies.set(`authenticated_${gameData.room_id}`, true, {path: '/'});
      }

    } catch (error) {
      console.error(error);
    }
  };

  return (<div className={styles.content} >
    {authenticated ? (
      <React.Fragment>
        {gameData.is_open &&             
            <form className={styles.form_container} onSubmit={handleFormSubmit}>
                <div className={styles.intput_container}>
                <input
                  type="text"
                  value={formData.player_name}
                  onChange={(e) => setFormData({ ...formData, player_name: e.target.value })}
                  placeholder="Player Name"
                  name="player_name"
                />
                <input
                  type="text"
                  value={formData.buy_in_amount}
                  onChange={(e) => setFormData({ ...formData, buy_in_amount: e.target.value })}
                  placeholder="Buy In Amount"
                  name="buy_in_amount"
                />
                </div>

                <button type="submit">Add Player</button>
              </form>}



              {hasFethced ? (
                <React.Fragment>
                  <RoomStats players={gameData.players}/>
                  <Players players={gameData.players} handleAddChipsClick={handleAddChipsClick} handleCashoutClick={handleCashoutClick}/>
                </React.Fragment>
              ) : null}

              {!gameData.is_open && <SuggestedReimbursement players={gameData.players}/>}
      </React.Fragment>):
      (<RoomPassword handleFormSubmit={authenticate} />)
      }

            
          </div>);
};

export default PokerRoomPage;
