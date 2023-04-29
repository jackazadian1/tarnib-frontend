import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import echo from '../echoSetup';

export const useGameData = () => {
  // all state, state update functions, and server communication functions here
  const [playerData, setPlayerData] = useState({ 
    player_name: '',
    player_seat: 0,
    player_cards: [] as string[]
  });

  const [gameData, setGameData] = useState({
    room_id: '',
    round: 0,
    players: [] as string[],
    seat_2_player: '',
    seat_3_player: '',
    seat_4_player: '',
    team_1_score: 0,
    team_2_score: 0
  });

  const [roundData, setRoundData] = useState({
    dealer: 0,
    tarnib: '',
    turn: 0,
    goal: 0,
    team_1_score: 0,
    team_2_score: 0,
    current_bidder: 0,
    bids: [0,0,0,0],
  })


  const [turnData, setTurnData] = useState({
    player_turn: -1,
    current_play: [] as string[],
  });

  const playerSeatRef = useRef(playerData.player_seat);

  const postHeaders = {
    'Content-Type': 'application/json',
    'X-Socket-ID': echo.socketId(),
  }

  const fetchData = async () => {
    //if (readyToFetch && playerData.player_name && gameData.room_id) {
        if (playerData.player_name && gameData.room_id) {
      try {
        const response = await axios.get(`${process.env.REACT_APP_PHP_BACKEND_API_URI}/api/roundInfo`,{
          params: {
            room_id: gameData.room_id,
            player_name: playerData.player_name
          }
        });
        // Do something with the response data, e.g., update the component's state
        console.log('fetch data: ',response.data);

        const seatPlayerNames = [
          response.data.player_1,  
          response.data.player_2,
          response.data.player_3,
          response.data.player_4,
        ]
        
        let seats = evalPlayerSeats(response.data.player_seat, seatPlayerNames)
        
        setGameData((prevGameData: any) => { 
            return{
                ...prevGameData, 
                players: [
                  response.data.player_1,
                  response.data.player_2,  
                  response.data.player_3,
                  response.data.player_4,
                ],
                round: response.data.dealer+1,
                seat_2_player: seats.seat_2_player,
                seat_3_player: seats.seat_3_player,
                seat_4_player: seats.seat_4_player,
                team_1_score: response.data.team_1_game_score,
                team_2_score: response.data.team_2_game_score
            }
        });

        setPlayerData((prevPlayerData: any) => {
            return{
                ...prevPlayerData,
                player_cards: response.data.cards,
                player_seat: response.data.player_seat,
            }
        });

        setTurnData((prevTurnData: any) => {
            return{
                ...prevTurnData, 
                current_play: response.data.current_play,
                player_turn: response.data.player_turn,
            }
            
        });

        setRoundData((prevRoundData: any) => {
            return{
                ...prevRoundData,
                dealer: Number(response.data.dealer),
                tarnib: response.data.tarnib,
                turn: response.data.turn,
                goal: response.data.goal,
                team_1_score: response.data.team_1_score,
                team_2_score: response.data.team_2_score,
                current_bidder: response.data.bids_data.current_bidder,
                bids: response.data.bids_data.bids,
            }
        })

      } catch (error) {
        // Handle any errors that occurred during the request
        console.error('Error fetching data:', error);
      }
    }
  };

  const evalPlayerSeats = (currentSeat: number, fetchedPlayers: string[]) =>{
    //seat number should be 1 indexed    
    var seats = [currentSeat%4, (currentSeat+1)%4, (currentSeat+2)%4];
        
    return {
      seat_2_player: fetchedPlayers[seats[0]],
      seat_3_player: fetchedPlayers[seats[1]],
      seat_4_player: fetchedPlayers[seats[2]],
    };

  }

  const handleSeatButtonClick = async (seatNumber: number) => {
    console.log("Button clicked for seat number:", seatNumber);
    // Do something with the seat number
    let data = {
      room_id: gameData.room_id,
      player_name: playerData.player_name,
      seat: seatNumber
    }
    try {
      const response = await axios.post(`${process.env.REACT_APP_PHP_BACKEND_API_URI}/api/chooseSeat`, data, {headers: postHeaders})
      console.log(response);
      setGameData((prevGameData) => {
        const players = [...prevGameData.players];
        players[seatNumber-1] = playerData.player_name;
        let seats = evalPlayerSeats(seatNumber, players)
        
        return {
          ...prevGameData,
          players: players,
          seat_2_player: seats.seat_2_player,
          seat_3_player: seats.seat_3_player,
          seat_4_player: seats.seat_4_player,
        };
      });

      setPlayerData((prevPlayerData) => {
        return{
            ...prevPlayerData,
            player_seat: seatNumber,
            player_cards: response.data.player_cards
        }
      })

    } catch (error) {
      console.error(error);
    }
  };


const handleBidClick = async (amount: number) => {
  let data = {
    room_id: gameData.room_id,
    player_index: playerData.player_seat-1,
    amount: amount
  }
  try {
    const response = await axios.post(`${process.env.REACT_APP_PHP_BACKEND_API_URI}/api/bid`, data, {headers: postHeaders})
    console.log(response.data);

    setRoundData((prevRoundData: any) => {
        return{
            ...prevRoundData,
            current_bidder: response.data.current_bidder,
            bids: response.data.bids
        }
    })
    
  } catch (error) {
    console.error(error);
  }
};

const handleTarnibPickClick = async (suit: string) => {
  console.log(suit);

  let data = {
    room_id: gameData.room_id,
    tarnib: suit,
    goal: Math.max(...roundData.bids),
    player_turn: roundData.current_bidder
  }

  const response = await axios.post(`${process.env.REACT_APP_PHP_BACKEND_API_URI}/api/setTarnib`, data, {headers: postHeaders})
  console.log(response.data);

  setRoundData((prevRoundData) => {
    return{
        ...prevRoundData,
        tarnib: response.data.tarnib,
        goal: response.data.goal,
    }
  })

  setTurnData((prevTurnData) => {
    return{
        ...prevTurnData,
        player_turn: response.data.player_turn
    }
  })
};

const handleCardClick = async (card: string) => {
  console.log(card);

  let data = {
    room_id: gameData.room_id,
    player_seat: playerData.player_seat,
    card: card
  }
  console.log(data);

  const response = await axios.post(`${process.env.REACT_APP_PHP_BACKEND_API_URI}/api/playCard`, data, {headers: postHeaders})
  console.log(response.data);

  setTurnData((prevTurnData) => {
    return{
        ...prevTurnData,
        current_play: response.data.current_play,
        player_turn: response.data.player_turn
    }
  })

  setPlayerData((prevPlayerData) => {
    return{
        ...prevPlayerData,
        player_cards: response.data.player_cards,
    }
    
  })

  if(roundData.tarnib != null || roundData.tarnib != ''){
    if(!response.data.current_play.includes('')){
      console.log('turn finished')
      setNewTurn()
    }
  }

};

const setNewTurn = async () => {
  let data = {
    room_id: gameData.room_id,
  }

  const response = await axios.post(`${process.env.REACT_APP_PHP_BACKEND_API_URI}/api/setNewTurn`, data, {headers: postHeaders})
  console.log(response.data);

  if(response.data.player_turn == 0 || response.data.player_turn == 2){
    setRoundData((prevRoundData) => {
        return{
            ...prevRoundData,
            team_1_score: response.data.team_1_score,
            turn: response.data.turn,
        }
    })
  }else{
    setRoundData((prevRoundData) => {
        return{
            ...prevRoundData,
            team_2_score: response.data.team_2_score,
            turn: response.data.turn,
        }

    })
  }

    setTurnData((prevTurnData) => {
        return{
            ...prevTurnData,
            player_turn: response.data.player_turn,
            current_play: ['','','','']
        }
    })

    if(response.data.turn == 14){
        setNewRound();
    }


    }

    const setNewRound = async () => {
        let data = {
        room_id: gameData.room_id,
    }
  
    const response = await axios.post(`${process.env.REACT_APP_PHP_BACKEND_API_URI}/api/setNewRound`, data, {headers: postHeaders})
    console.log(response.data);
  
    fetchData();
  
    
  }

  useEffect(() => {
    playerSeatRef.current = playerData.player_seat;
  }, [playerData])

  return {
    playerData,
    setPlayerData,
    playerSeatRef,
    gameData,
    setGameData,
    roundData,
    setRoundData,
    turnData,
    setTurnData,
    fetchData,
    handleSeatButtonClick,
    handleBidClick,
    handleTarnibPickClick,
    handleCardClick,
    setNewTurn,
    evalPlayerSeats,
  };
};
