import { useEffect } from 'react';
import echo from '../echoSetup';

export const useWebSocketListeners = (listening: boolean, useGameData: any) => {
  const {
    playerData,
    setGameData,
    roundData,
    setRoundData,
    turnData,
    setTurnData,
    evalPlayerSeats,
  } = useGameData;

  useEffect(() => {
    if(listening){
      const channel = echo.channel('public.room.1');
  
      channel.subscribed(()=>{
        console.log('subscribed!');
        
      }).listen('.seat-chosen', (event: any) => {  
        console.log(event);
  
        setGameData((prevGameData: { players: any; }) => {
          const players = [...prevGameData.players];
          players[event.player_number-1] = event.player_name;
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
        console.log(event);
  
        setRoundData({
          ...roundData,
          current_bidder: event.current_bidder,
          bids: event.bids
        })
      }).listen('.tarnib-chosen', (event: any) => {
        console.log(event);
  
        setRoundData({
          ...roundData,
          tarnib: event.tarnib,
          goal: event.goal,
        })
      
        setTurnData({
          ...turnData,
          player_turn: event.player_turn
        })
  
      }).listen('.card-played', (event: any) => {
        console.log(event);
  
        setTurnData({
          ...turnData,
          current_play: event.current_play,
          player_turn: event.player_turn
        })
  
      }).listen('.new-turn', (event: any) => {
        console.log(event);
        if(event.player_turn == 0 || event.player_turn == 2){
          setRoundData({
            ...roundData,
            team_1_score: event.team_1_score,
            turn: event.turn,
          })
        }else{
          setRoundData({
            ...roundData,
            team_2_score: event.team_2_score,
            turn: event.turn,
          })
        }
  
        setTurnData({
          ...turnData,
          player_turn: event.player_turn,
          current_play: ['','','','']
        })
      })
    }
  
  }, [listening]);
};
