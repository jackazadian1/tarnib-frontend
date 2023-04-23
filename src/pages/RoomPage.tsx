import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './RoomPage.module.css';
import PlayerHand from '../components/PlayerHand';
import axios from 'axios';
import OtherHand from '../components/OtherHand';
import Bids from '../components/Bids';
import SeatSelect from '../components/SeatSelect';
import echo from '../echoSetup';
import TarnibPicker from '../components/TarnibPicker';
import TableCards from '../components/TableCards';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const RoomPage: React.FC = () => {

  const query = useQuery();  
  const [playerData, setPlayerData] = useState({ 
    player_name: '',
    player_seat: 0,
    player_cards: []
  });

  const [gameData, setGameData] = useState({
    room_id: '',
    dealer: 0,
    tarnib: '',
    turn: 0,
    players: ['','','',''],
    seat_2_player: '',
    seat_3_player: '',
    seat_4_player: '',
  });

  const [bidData, setBidData] = useState({
    current_bidder: 0,
    bids: [0,0,0,0],
  });

  const [readyToFetch, setReadyToFetch] = useState(false);

  const [listening, setListening] = useState(false);


  const [seatSelected, setSeatSelected] = useState(false);
  const [biddingWinner, setBiddingWinner] = useState(-1);



  const evalPlayerSeats = (currentSeat: number, fetchedPlayers: string[]) =>{
    
    var seats = [currentSeat%4, (currentSeat+1)%4, (currentSeat+2)%4];
        
    return {
      seat_2_player: fetchedPlayers[seats[0]],
      seat_3_player: fetchedPlayers[seats[1]],
      seat_4_player: fetchedPlayers[seats[2]],
    };

  }


  const fetchData = async () => {
    if (readyToFetch && playerData.player_name && gameData.room_id) {
      try {
        const response = await axios.get('http://127.0.0.1:97/api/roundInfo',{
          params: {
            room_id: gameData.room_id,
            player_name: playerData.player_name
          }
        });
        // Do something with the response data, e.g., update the component's state
        console.log('fetch data: ',response.data);

        setPlayerData({
          ...playerData,
          player_cards: response.data.cards,
          player_seat: response.data.player_seat,
        });

        setBidData((prevBidData) => ({ 
          ...prevBidData, 
          current_bidder: response.data.bids_data.current_bidder,
          bids: response.data.bids_data.bids
        }));

        const seatPlayerNames = [
          response.data.player_1,  
          response.data.player_2,
          response.data.player_3,
          response.data.player_4,
        ]

       
        
        let seats = evalPlayerSeats(response.data.player_seat, seatPlayerNames)
        
        setGameData((prevGameData) => ({ 
          ...prevGameData, 
          dealer: Number(response.data.dealer),
          players: [
            response.data.player_1,
            response.data.player_2,  
            response.data.player_3,
            response.data.player_4,
          ],
          tarnib: response.data.tarnib,
          turn: response.data.turn,
          seat_2_player: seats.seat_2_player,
          seat_3_player: seats.seat_3_player,
          seat_4_player: seats.seat_4_player,
        }));

      } catch (error) {
        // Handle any errors that occurred during the request
        console.error('Error fetching data:', error);
      }
    }
  };

  const handleSeatButtonClick = async (seatNumber: number) => {
    console.log("Button clicked for seat number:", seatNumber);
    // Do something with the seat number
    let data = {
      room_id: gameData.room_id,
      player_name: playerData.player_name,
      seat: seatNumber
    }
    try {
      const response = await axios.post('http://127.0.0.1:97/api/chooseSeat', data)
      //console.log(response);
      fetchData()

    } catch (error) {
      console.error(error);
    }
  };


const handleBidClick = async (amount: number) => {
  console.log(amount);
  let data = {
    room_id: gameData.room_id,
    player_index: playerData.player_seat-1,
    amount: amount
  }
  try {
    const response = await axios.post('http://127.0.0.1:97/api/bid', data)
    console.log(response.data);
    //fetchData()

  } catch (error) {
    console.error(error);
  }
};

const handleTarnibPickClick = async (suit: string) => {
  console.log(suit);

  let data = {
    room_id: gameData.room_id,
    tarnib: suit
  }

  const response = await axios.post('http://127.0.0.1:97/api/setTarnib', data)
  console.log(response.data);

  setGameData({
    ...gameData,
    tarnib: suit
  })
};



  useEffect(() => {
    const playerName = query.get('player_name') || '';
    const roomId = query.get('room_id') || '';

    if (playerName && roomId) {
      setPlayerData({ ...playerData, player_name: playerName });
      setGameData({ ...gameData, room_id: roomId });
      setReadyToFetch(true);
    }
  }, []);

  useEffect(() => {
    setListening(true)
    fetchData();
  }, [readyToFetch]);

  useEffect(() => {
    if(listening){
      const channel = echo.channel('public.room.1');

      channel.subscribed(()=>{
        console.log('subscribed!');
        
      }).listen('.seat-chosen', (event: any) => {
        fetchData()
  
        console.log(event);
        let players = [...gameData.players];
        console.log(players);
  
        setGameData((prevGameData) => {
          const players = [...prevGameData.players];
          players[event.player_number] = event.player_name;
  
          let seats = evalPlayerSeats(playerData.player_seat, players)
  
          return {
            ...prevGameData,
            players: players,
            seat_2_player: seats.seat_2_player,
            seat_3_player: seats.seat_3_player,
            seat_4_player: seats.seat_4_player,
          };
        });
      }).listen('.bid', (event: any) => {
        fetchData()
  
        console.log(event);
        
      }).listen('.tarnib-chosen', (event: any) => {
        fetchData()
  
        console.log(event);
        
      })
    }
 
  }, [listening]);

  useEffect(() => {
    console.log('gameData: ',gameData);
    setSeatSelected(gameData.players.includes(playerData.player_name));
  }, [gameData]);

  useEffect(() => {
    if(Math.max(...bidData.bids) != 0 && Math.max(...bidData.bids) == bidData.bids[bidData.current_bidder]){
      setBiddingWinner(bidData.current_bidder);
      console.log("bidding winner: "+ gameData.players[bidData.current_bidder]);
      
    }
  }, [bidData])


  return (
    <div>
      {seatSelected ? (
        <React.Fragment>
          <div className={styles.game_container}>
            <div className={`${styles.player_name} ${styles.seat_1_name}`}>{playerData.player_name}</div>
            <div className={`${styles.player_name} ${styles.seat_2_name}`}>{gameData.seat_2_player}</div>
            <div className={`${styles.player_name} ${styles.seat_3_name}`}>{gameData.seat_3_player}</div>
            <div className={`${styles.player_name} ${styles.seat_4_name}`}>{gameData.seat_4_player}</div>
            <div className={styles.room_id}>Room ID: <span>{gameData.room_id}</span></div>
            <div className={styles.turn_counter}>Turn: <span>{gameData.turn}</span></div>
            <PlayerHand cards={playerData.player_cards}/>
            <OtherHand card_count={13} player_number={2}/>
            <OtherHand card_count={13} player_number={3}/>
            <OtherHand card_count={13} player_number={4}/>
          </div>
          {(gameData.tarnib == null || gameData.tarnib == '') ? (
            <React.Fragment>
              {biddingWinner != -1 ? (
                <TarnibPicker handleTarnibPickClick={handleTarnibPickClick} picker_name={gameData.players[biddingWinner]} player_name={playerData.player_name}/>
                ):(
                <Bids readyToPlay={!gameData.players.includes('')} current_bidder={bidData.current_bidder} bids={bidData.bids} players={gameData.players} player={playerData.player_name} handleBidClick={handleBidClick}/>
              )}
            </React.Fragment>
          ) : (
            <TableCards/>
          )}
          
        </React.Fragment>
      ):(
        <SeatSelect player_1={gameData.players[0]} player_2={gameData.players[1]} player_3={gameData.players[2]} player_4={gameData.players[3]} onSeatButtonClick={handleSeatButtonClick}/>
      )}
    </div>
  );
};

export default RoomPage;
