import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Bids from '../../../components/Tarnib/Bids/Bids';
import SeatSelect from '../../../components/Tarnib/SeatSelect/SeatSelect';
import TarnibPicker from '../../../components/Tarnib/TarnibPicker/TarnibPicker';
import TableCards from '../../../components/Tarnib/TableCards/TableCards';
import GameInfo from '../../../components/Tarnib/GameInfo/GameInfo';
import { useGameData } from '../../../components/Tarnib/useGameData';
import { useWebSocketListeners } from '../../../components/Tarnib/useWebSocketListeners';
import { GameStates } from '../../../components/Tarnib/GameStates';
import WaitingForPlayers from '../../../components/Tarnib/WaitingForPlayers/WaitingForPlayers';
import RoomLink from '../../../components/Tarnib/RoomLink/RoomLink';
import Game from '../../../components/Tarnib/Game/Game';




const RoomPage: React.FC = () => {
  const { roomId } = useParams();

  const [seatSelected, setSeatSelected] = useState(false);
  const [biddingWinner, setBiddingWinner] = useState(-1);

  const [readyToFetch, setReadyToFetch] = useState(false);
  const [hasFethced, setHasFetched] = useState(false);

  const [readyToListen, setReadyToListen] = useState(false);
  const [listening, setListening] = useState(false);
  const [listeningPrivate, setListeningPrivate] = useState(false);

  const [gameState, setGameState] = useState(GameStates.Loading);

  const {
    playerData,
    setPlayerData,
    playerSeatRef,
    gameData,
    setGameData,
    roundData,
    setRoundData,
    fetchData,
    turnData,
    setTurnData,
    turnWinner,
    setTurnWinner,
    handleSeatButtonClick,
    handleBidClick,
    handleTarnibPickClick,
    handleCardClick,
    handleMoveToNewRoomClick,
    evalPlayerSeats,
    initRoundData,
    updateBiddingWinner,
    setSocketId,
    previousTurnData,
    setPreviousTurnData,
  } = useGameData(setBiddingWinner, setHasFetched);


  useEffect(() => {
    if (roomId) {
      setGameData({ ...gameData, room_id: roomId });
      setReadyToFetch(true);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [readyToFetch]);

  useEffect(() => {
    if(playerData.player_token != undefined && playerData.player_token != ''){
      setReadyToListen(true);
    }
  }, [playerData.player_token])

  useWebSocketListeners(readyToListen, {
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
    }, setBiddingWinner, setListening, setListeningPrivate);

  useEffect(() => {
    setSeatSelected(gameData.players.includes(playerData.player_name));

  }, [gameData.players, playerData.player_name]);

  useEffect(() => {
    if (Math.max(...roundData.bids) != 0 && Math.max(...roundData.bids) == roundData.bids[roundData.current_bidder]) {
      setBiddingWinner(roundData.current_bidder);
    }
  }, [roundData.bids]);

  useEffect(() =>{
    console.log(GameStates[gameState]);
  }, [gameState]);

  useEffect(() =>{//game state decider
    if(hasFethced && listening && listeningPrivate){
      if(seatSelected){
        if(!gameData.players.includes('')){
          if(biddingWinner != -1){
            if(roundData.tarnib != '' && roundData.tarnib != null){
                setGameState(GameStates.NewTurn)
            }else{
              setGameState(GameStates.PickingTarnib)
            }
          }else{
            if(gameData.team_1_score >= 31 || gameData.team_2_score >= 31){
              setGameState(GameStates.GameOver)
            }else{
            setGameState(GameStates.Bidding)
            }
          }
        }else{
          setGameState(GameStates.WaitingForPlayers)
        }
      }else{
        setGameState(GameStates.SelectingSeat)
      }
    }
  }, [hasFethced, listening, listeningPrivate, seatSelected, gameData.players, biddingWinner, roundData.tarnib, gameData.team_1_score, gameData.team_2_score]);

  useEffect(() => {
    if(!turnData.current_play.includes('')){
      //setGameState(GameStates.TurnEnded)
    }
  }, [turnData.current_play])

  const renderGameState = (gameState: GameStates) =>{
    switch(gameState){
      case GameStates.Loading:
        return <div>hi</div>;

      case GameStates.SelectingSeat:
        return  (
          <React.Fragment>
            <SeatSelect
            player_1={gameData.players[0]}
            player_2={gameData.players[1]}
            player_3={gameData.players[2]}
            player_4={gameData.players[3]}
            onSeatButtonClick={handleSeatButtonClick}
            />
          </React.Fragment>);

      case GameStates.WaitingForPlayers:
        return (
          <React.Fragment>
            <WaitingForPlayers
            player_1={playerData.player_name}
            player_2={gameData.seat_2_player}
            player_3={gameData.seat_3_player}
            player_4={gameData.seat_4_player}
            />
          </React.Fragment>);
    }

    //default case
    return (<Game
      gameState={gameState}
      playerData={playerData}
      gameData={gameData}
      roundData={roundData}
      turnData={turnData}
      turnWinner={turnWinner}
      handleCardClick={handleCardClick}
      handleBidClick={handleBidClick}
      handleTarnibPickClick={handleTarnibPickClick}
      previousTurnData={previousTurnData}
      handleMoveToNewRoomClick={handleMoveToNewRoomClick}
      />);
  }

  return (<div>
            <RoomLink/>
            {renderGameState(gameState)}
          </div>);
};

export default RoomPage;
