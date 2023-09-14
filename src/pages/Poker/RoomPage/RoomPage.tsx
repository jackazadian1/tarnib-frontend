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
import Form from '../../../components/Forms/Form';
import PokerLayout from '../../../layouts/Poker/PokerLayout';
import PlayerPopup from '../../../components/Poker/PlayerPopup/PlayerPopup';




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

  const [formData, setFormData] = useState({ player_name: '', buy_in_amount: '' });


  const cookies = new Cookies();

  const {
    gameData,
    setGameData,
    hasPassword,
    checkForPassword,
    fetchData,
    selectedPlayer,
    setSelectedPlayer,
    handleAddChipsClick,
    handleCashoutClick,
    handleSelectPlayer,
    unselectPlayer,
    handleDeletePlayerClick
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
    setActivePlayers(activePlayersCount)
  }, [gameData.players]);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let data = {
        ...formData,
        room_id: gameData.room_id
      }

      if(gameData.players.filter((player: Player) => {
        return player.name == formData.player_name;
      }).length > 0 || parseFloat(formData.buy_in_amount) <= 0) return false;

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

  return (
    <React.Fragment>
      <PokerLayout locked={selectedPlayer}>
        <h1 className={styles.room_date}>{gameData.date}</h1>
        {authenticated ? (
          <React.Fragment>
            {gameData.is_open ?       
                (<Form submitHandler={handleFormSubmit}>
                  <p>Enter a unique Player Name, and a positive Buy In Amount</p>
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
                </Form>) : (
                  <div className={styles.closed_room}>
                    <h2>Room Is Closed</h2>
                    <p>This room is closed and can no longer be changed. Results for this room can be found below.</p>
                  </div>
                )}

                  {hasFethced ? (
                    <React.Fragment>
                      <RoomStats totalBank={totalBank} remainingBank={remainingBank} activePlayers={activePlayers}/>
                      <Players players={gameData.players} isOpen={gameData.is_open} handleSelectPlayer={handleSelectPlayer} />
                    </React.Fragment>
                  ) : null}

                  {<SuggestedReimbursement players={gameData.players} remainingBank={remainingBank} activePlayers={activePlayers}/>}
          </React.Fragment>):
        (<RoomPassword handleFormSubmit={authenticate} />)}
      </PokerLayout>
      <PlayerPopup player={selectedPlayer} remainingBank={remainingBank} unselectPlayer={unselectPlayer} handleBuyInClick={handleAddChipsClick} handleCashoutClick={handleCashoutClick}  handleDeletePlayerClick={handleDeletePlayerClick}/>
    </React.Fragment>
  );
};

export default PokerRoomPage;
