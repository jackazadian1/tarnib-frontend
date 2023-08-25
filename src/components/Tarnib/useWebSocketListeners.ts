import { useEffect, useState } from 'react';
import echoInstance from '../../echoSetup';
import { useNavigate } from 'react-router-dom';


export const useWebSocketListeners = (readyToListen: boolean, useGameData: any, setBiddingWinner: React.Dispatch<React.SetStateAction<number>>, setListening: React.Dispatch<React.SetStateAction<boolean>>, setListeningPrivate: React.Dispatch<React.SetStateAction<boolean>>) => {
  const {
    playerData,
    setPlayerData,
    playerSeatRef,
    gameData,
    setGameData,
    setRoundData,
    setTurnData,
    setTurnWinner,
    evalPlayerSeats,
    initRoundData,
    setPreviousTurnData,
    setSocketId,
  } = useGameData;

  const navigate = useNavigate();


  useEffect(() => {
    if(readyToListen){
      
      const echo = echoInstance(gameData.room_id, playerData.player_token)

      const channel = echo.channel(`public.room.${gameData.room_id}`);
  
      channel.subscribed(()=>{
        console.log('subscribed!');        
        setSocketId(echo.socketId());
        setListening(true);
        
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
  
      }).listen('.new-turn', async (event: any) => {
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

        setTurnWinner(event.player_turn)


        await sleep(3000);

        setTurnWinner(-1);
        setPreviousTurnData({
          previous_play: event.previous_play,
          previous_turn_winner: event.player_turn
        })
        setTurnData((prevTurnData: any) => {
          
        return {
            ...prevTurnData,
            player_turn: event.player_turn,
            current_play: ['', '', '', ''],
        };
        });
      }).listen('.moved-room', (event: any) => {
        console.log(event);
        window.location.href = `/room/${event.new_room_id}`;
      })

      const privateChannel = echo.channel(`public.room.${gameData.room_id}${playerData.player_token}`);

      privateChannel.subscribed(() => {
        console.log('subscribed to private');
        setListeningPrivate(true);
      }).listen('.new-round', (event: any) => {
        console.log(event);

        setGameData((prevGameData: any) => { 
          return{
              ...prevGameData, 
              round: event.round,
              team_1_score: event.team_1_game_score,
              team_2_score: event.team_2_game_score
          }
      });

      setPlayerData((prevPlayerData: any) => {
          return{
              ...prevPlayerData,
              player_cards: event.cards,
          }
      });
      initRoundData(event);
      setBiddingWinner(-1);


      })
    }
  
  }, [readyToListen]);

  function sleep(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
};
