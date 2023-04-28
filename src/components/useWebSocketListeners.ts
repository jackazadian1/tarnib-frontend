import { useEffect } from 'react';
import echo from '../echoSetup';

export const useWebSocketListeners = (listening: boolean, useGameData: any) => {
  const {
    playerData,
    playerSeatRef,
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
          let seats = evalPlayerSeats(playerSeatRef.current, players)
          
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
  
        setRoundData((prevRoundData: any) => {
            return{
                ...prevRoundData,
                current_bidder: event.current_bidder,
                bids: event.bids
            }
        })
      }).listen('.tarnib-chosen', (event: any) => {
        console.log(event);
  
        setRoundData((prevRoundData: any) => {
            return {
                ...prevRoundData,
                tarnib: event.tarnib,
                goal: event.goal
            }
        })
      
        setTurnData((prevTurnData: any) => {
            return {
                ...prevTurnData,
                player_turn: event.player_turn
            }
        })
  
      }).listen('.card-played', (event: any) => {
        console.log(event);
  
        setTurnData((prevTurnData: any) => {
            return{
                ...prevTurnData,
                current_play: event.current_play,
                player_turn: event.player_turn
            }
        })
  
      }).listen('.new-turn', (event: any) => {
        console.log(event);
        setRoundData((prevRoundData: any) => {
            if (event.player_turn === 0 || event.player_turn === 2) {
                return {
                ...prevRoundData,
                team_1_score: event.team_1_score,
                turn: event.turn,
                };
            } else {
                return {
                ...prevRoundData,
                team_2_score: event.team_2_score,
                turn: event.turn,
                };
            }
        });
    
        setTurnData((prevTurnData: any) => {
        return {
            ...prevTurnData,
            player_turn: event.player_turn,
            current_play: ['', '', '', ''],
        };
        });
      })
    }
  
  }, [listening]);
};
