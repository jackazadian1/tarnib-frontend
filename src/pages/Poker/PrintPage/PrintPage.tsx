import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGameDataPoker } from '../../../components/Poker/useGameData';
import styles_print from './PrintPage.module.css';
import axios from 'axios';
import Players from '../../../components/Poker/Players/Players';
import { Player } from '../../../components/Poker/Player';
import RoomPassword from '../../../components/Poker/RoomPassword/RoomsList/RoomPassword';
import Cookies from 'universal-cookie';
import { formatter } from '../../../components/Poker/CurrencyFormat';




const PokerRoomPage: React.FC = () => {
  const { roomId } = useParams();

  const postHeaders = {
    'Content-Type': 'application/json',
  }

  const [readyToFetch, setReadyToFetch] = useState(false);
  const [readyToFetchPassword, setReadyToFetchPassword] = useState(false);
  const [hasFethced, setHasFetched] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [remainingBank, setRemainingBank] = useState(0);
  const [totalBank, setTotalBank] = useState(0);
  const [activePlayers, setActivePlayers] = useState(0);



  const cookies = new Cookies();

  const {
    gameData,
    setGameData,
    hasPassword,
    checkForPassword,
    fetchData,
    handleSelectPlayer,
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

  useEffect(() => {
    if(hasFethced){
        window.print()
    }
  }, [hasFethced])

  useEffect(() => {
    let total = 0;
    let totalAfterCashout = 0;
    let activePlayersCount = 0;
    gameData.players.forEach(player => {
      total+= player.buy_in_amount;
      totalAfterCashout+= player.buy_in_amount;
      activePlayersCount++;
      if(player.cash_out_amount != -1){
        activePlayersCount--;
        totalAfterCashout-= player.cash_out_amount
      }
    });

    setTotalBank(total);
    setRemainingBank(totalAfterCashout);
    setActivePlayers(activePlayersCount);

  }, [gameData.players]);

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

  return (
    <React.Fragment>
    {authenticated ? (
        <div className={styles_print.print}>
            <div className={styles_print.print_stats}>
            {gameData.room_name ? (
                <React.Fragment>
                    <h1>{gameData.room_name}</h1>
                    <h2>{gameData.date}</h2>
                </React.Fragment>) : (
                <h1>{gameData.date}</h1>)}
            
            <h2>Total Bank: {formatter.format(totalBank)}</h2>
        </div>
        <div className={styles_print.print_players}>
            <Players players={gameData.players} isOpen={gameData.is_open} handleSelectPlayer={handleSelectPlayer} />
        </div>
       
        </div>):
        (<div className={styles_print.print_password}><RoomPassword handleFormSubmit={authenticate} /></div>)}
    </React.Fragment>
  );
};

export default PokerRoomPage;
