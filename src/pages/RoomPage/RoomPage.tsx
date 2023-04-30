import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Bids from '../../components/Bids/Bids';
import SeatSelect from '../../components/SeatSelect/SeatSelect';
import TarnibPicker from '../../components/TarnibPicker/TarnibPicker';
import TableCards from '../../components/TableCards/TableCards';
import GameInfo from '../../components/GameInfo/GameInfo';
import { useGameData } from '../../components/useGameData';
import { useWebSocketListeners } from '../../components/useWebSocketListeners';

const RoomPage: React.FC = () => {
  const { roomId } = useParams();

  const [seatSelected, setSeatSelected] = useState(false);
  const [biddingWinner, setBiddingWinner] = useState(-1);

  const [readyToFetch, setReadyToFetch] = useState(false);

  const [listening, setListening] = useState(false);

  const {
    playerData,
    setPlayerData,
    playerSeatRef,
    gameData,
    setGameData,
    roundData,
    setRoundData,
    turnData,
    fetchData,
    setTurnData,
    handleSeatButtonClick,
    handleBidClick,
    handleTarnibPickClick,
    handleCardClick,
    evalPlayerSeats,
    initRoundData,
    updateBiddingWinner,
    setSocketId,
  } = useGameData(setBiddingWinner);


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
      setListening(true);
    }
  }, [playerData.player_token])

  useWebSocketListeners(listening, {
    playerData,
    setPlayerData,
    playerSeatRef,
    gameData,
    setGameData,
    setRoundData,
    setTurnData,
    evalPlayerSeats,
    initRoundData,
    setSocketId,
    }, setBiddingWinner);

  useEffect(() => {
    setSeatSelected(gameData.players.includes(playerData.player_name));
  }, [gameData.players, playerData.player_name]);

  useEffect(() => {
    if (Math.max(...roundData.bids) != 0 && Math.max(...roundData.bids) == roundData.bids[roundData.current_bidder]) {
      setBiddingWinner(roundData.current_bidder);
    }
  }, [roundData.bids]);

  return (
    <div>
      {seatSelected ? ( //if all players have selected a seat, render game, otherwise, render seat selection
        <React.Fragment>
          <GameInfo
            playerName={playerData.player_name}
            seat2Player={gameData.seat_2_player}
            seat3Player={gameData.seat_3_player}
            seat4Player={gameData.seat_4_player}
            roomId={gameData.room_id}
            round={gameData.round}
            turn={roundData.turn}
            playerCards={playerData.player_cards}
            tarnib={roundData.tarnib}
            goal={roundData.goal}
            bidWinner={gameData.players[roundData.current_bidder]}
            isYourTurn={turnData.player_turn + 1 == playerData.player_seat}
            currentPlay={turnData.current_play}
            playerSeat={playerData.player_seat}
            handleCardClick={handleCardClick}
            team1={`${gameData.players[0]}-${gameData.players[2]}`}
            team2={`${gameData.players[1]}-${gameData.players[3]}`}
            team1score={roundData.team_1_score}
            team2score={roundData.team_2_score}
            team1GameScore={gameData.team_1_score}
            team2GameScore={gameData.team_2_score}
          />
          {roundData.tarnib == null || roundData.tarnib == '' ? ( //if tarnib is still unset, either bidding is still ongoing or tarnib has not been picked yet. otherwise, render the actual game
            <React.Fragment>
              {biddingWinner != -1 ? ( //if bidding is complete for this round render tarnib picker, otherwhise render bids
                <TarnibPicker
                  handleTarnibPickClick={handleTarnibPickClick}
                  picker_name={gameData.players[biddingWinner]}
                  player_name={playerData.player_name}
                />
              ) : (
                <Bids
                  readyToPlay={!gameData.players.includes('')}
                  current_bidder={roundData.current_bidder}
                  bids={roundData.bids}
                  players={gameData.players}
                  player={playerData.player_name}
                  handleBidClick={handleBidClick}
                />
              )}
            </React.Fragment>
          ) : (
            <TableCards
              playeTurn={turnData.player_turn}
              playerTurnName={gameData.players[turnData.player_turn]}
              playersCards={[
                turnData.current_play[0],
                turnData.current_play[1],
                turnData.current_play[2],
                turnData.current_play[3],
              ]}
              playerSeat={playerData.player_seat}
              playerName={playerData.player_name}
            />
          )}
        </React.Fragment>
      ) : (
        <SeatSelect
          player_1={gameData.players[0]}
          player_2={gameData.players[1]}
          player_3={gameData.players[2]}
          player_4={gameData.players[3]}
          onSeatButtonClick={handleSeatButtonClick}
        />
      )}
    </div>
  );
};

export default RoomPage;
