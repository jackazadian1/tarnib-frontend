// Import React and any necessary dependencies
import React, { useEffect } from 'react';
import GameInfo from '../GameInfo/GameInfo';
import { GameStates } from '../GameStates';
import Bids from '../Bids/Bids';
import TarnibPicker from '../TarnibPicker/TarnibPicker';
import TableCards from '../TableCards/TableCards';
import GameOver from '../GameOver/GameOver';
import AllCards from '../AllCards/AllCards';

interface GameProps {
    gameState: any;
    playerData: any;
    gameData: any;
    roundData: any;
    turnData: any;
    previousTurnData: any;
    turnWinner: number;
    handleCardClick: (card: string) => void;
    handleBidClick: (amount: number) => void;
    handleTarnibPickClick: (card: string) => void;
    handleMoveToNewRoomClick: () => void;
}


const Game: React.FC<GameProps> = ({gameState, playerData, gameData, roundData, turnData, turnWinner, previousTurnData, handleCardClick, handleBidClick, handleTarnibPickClick, handleMoveToNewRoomClick}) => {

    const renderGameState = (gameState: GameStates) =>{
        switch(gameState){
            case GameStates.Bidding:
                return (
                    <React.Fragment>
                        <Bids
                        current_bidder={roundData.current_bidder}
                        bids={roundData.bids}
                        players={gameData.players}
                        player={playerData.player_name}
                        playerSeat={playerData.player_seat}
                        handleBidClick={handleBidClick}/>
                        <AllCards players={gameData.players}
                        playerName={playerData.player_name}
                        seat2Player={gameData.seat_2_player}
                        seat3Player={gameData.seat_3_player}
                        seat4Player={gameData.seat_4_player}
                        turn={0}
                        playerCards={playerData.player_cards}
                        tarnib={roundData.tarnib}
                        isYourTurn={turnData.player_turn + 1 == playerData.player_seat}
                        currentPlay={turnData.current_play}
                        playerSeat={playerData.player_seat}
                        previousTurnData={previousTurnData}
                        handleCardClick={handleCardClick}/>
                    </React.Fragment>
                );
            case GameStates.PickingTarnib:
                return (
                    <React.Fragment>
                        <TarnibPicker
                        handleTarnibPickClick={handleTarnibPickClick}
                        picker_name={gameData.players[roundData.current_bidder]}
                        player_name={playerData.player_name}/>
                        <AllCards players={gameData.players}
                        playerName={playerData.player_name}
                        seat2Player={gameData.seat_2_player}
                        seat3Player={gameData.seat_3_player}
                        seat4Player={gameData.seat_4_player}
                        turn={0}
                        playerCards={playerData.player_cards}
                        tarnib={roundData.tarnib}
                        isYourTurn={turnData.player_turn + 1 == playerData.player_seat}
                        currentPlay={turnData.current_play}
                        playerSeat={playerData.player_seat}
                        previousTurnData={previousTurnData}
                        handleCardClick={handleCardClick}/>
                    </React.Fragment>
                );
            case GameStates.NewTurn:
                return (
                    <React.Fragment>
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
                        turnWinner={gameData.players[turnWinner]}
                        tarnib={roundData.tarnib}/>
                        <AllCards players={gameData.players}
                        playerName={playerData.player_name}
                        seat2Player={gameData.seat_2_player}
                        seat3Player={gameData.seat_3_player}
                        seat4Player={gameData.seat_4_player}
                        turn={0}
                        playerCards={playerData.player_cards}
                        tarnib={roundData.tarnib}
                        isYourTurn={turnData.player_turn + 1 == playerData.player_seat}
                        currentPlay={turnData.current_play}
                        playerSeat={playerData.player_seat}
                        previousTurnData={previousTurnData}
                        handleCardClick={handleCardClick}/>
                    </React.Fragment>
                );
            case GameStates.GameOver:
                let winners = `${gameData.players[0]} and ${gameData.players[2]}`;
                if(gameData.team_2_score >= 31) winners = `${gameData.players[1]} and ${gameData.players[3]}`
                return <GameOver
                    winners={winners}
                    team_1={`${gameData.players[0]}-${gameData.players[2]}`}
                    team_2={`${gameData.players[1]}-${gameData.players[3]}`}
                    team_1_score={gameData.team_1_score}
                    team_2_score={gameData.team_2_score}
                    handleMoveToNewRoomClick={handleMoveToNewRoomClick}
                    />
        }
    }

  return (
        <div>
            <GameInfo
              round={gameData.round}
              turn={roundData.turn}
              tarnib={roundData.tarnib}
              goal={roundData.goal}
              bidWinner={gameData.players[roundData.current_bidder]}
              team1={`${gameData.players[0]}-${gameData.players[2]}`}
              team2={`${gameData.players[1]}-${gameData.players[3]}`}
              team1score={roundData.team_1_score}
              team2score={roundData.team_2_score}
              team1GameScore={gameData.team_1_score}
              team2GameScore={gameData.team_2_score}/>
            {renderGameState(gameState)}
        </div>);
};

// Export the PlayerHand component
export default Game;
