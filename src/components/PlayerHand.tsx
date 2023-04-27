// Import React and any necessary dependencies
import React from 'react';
import styles from './PlayerHand.module.css';
import PlayerCard from './PlayerCard';

// Define a type for the component's props (if needed)
interface PlayerHandProps {
  cards: string[];
  isYourTurn: boolean;
  currentPlay: string[];
  playerSeat: number;
  tarnib: string;
  handleCardClick: (card: string) => void
}

const getCardSuit = (card: string) => {
  
    var suit = '';
    if(card.includes('spades')) suit = 'spades';
    else if(card.includes('hearts')) suit = 'hearts';
    else if(card.includes('clubs')) suit = 'clubs';
    else  suit = 'diamonds';
    return suit;
};

const getValidSuits = (currentPlay: string[], playerSeat: number, tarnib: string, cards: string[]) => {
  
  if(!currentPlay.includes('')) return [];
  let playerSeatIndex = playerSeat-1;
  let res = [];
  if(currentPlay[(playerSeatIndex-1) == -1 ? 3 : playerSeatIndex-1] == ''){
    
    res.push('hearts')
    res.push('spades')
    res.push('diamonds')
    res.push('clubs')
  }else{

    let offset = 1;
    while(currentPlay[getSeatIndexByPreviousOffset(playerSeatIndex, offset)] != ''){
      offset = offset + 1;
    }
    
    let firstPlaySuit = getCardSuit(currentPlay[playerSeatIndex - offset < 0 ? 4 + playerSeatIndex - offset : playerSeatIndex - offset])


    if(checkIfPlayerHasSuit(cards, firstPlaySuit)){
      res.push(firstPlaySuit)
    }else{
      res.push('hearts')
      res.push('spades')
      res.push('diamonds')
      res.push('clubs')
    }
  }
  return res;
};

const getSeatIndexByPreviousOffset = (playerSeatIndex:number , offset: number) => {
  let res = playerSeatIndex-offset-1;
  if(res < 0) res+= 4;
  return res;
}

const checkIfPlayerHasSuit = (cards: string[], suit: string) => {
  for (let i = 0; i < cards.length; i++) {
    
    if(getCardSuit(cards[i]) == suit){
      return true;
    }    
  }
  return false;
}

// Define the PlayerHand component
const PlayerHand: React.FC<PlayerHandProps> = ({ cards, isYourTurn, currentPlay, playerSeat, tarnib, handleCardClick }) => {
  let validSuits = getValidSuits(currentPlay, playerSeat, tarnib, cards);
  return (
    <div className={styles.hand}>
        {cards.map((card, index) => (
            <PlayerCard key={index} card={card} suit={getCardSuit(card)} valid={validSuits.includes(getCardSuit(card)) && isYourTurn} handleCardClick={handleCardClick}/>
        ))}
    </div>
  );
};

// Export the PlayerHand component
export default PlayerHand;
