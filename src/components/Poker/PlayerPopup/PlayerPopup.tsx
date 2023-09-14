// Import React and any necessary dependencies
import React, { useEffect, useRef, useState } from 'react';
import styles from './PlayerPopup.module.css';
import { Player } from '../Player';
import { formatter } from '../CurrencyFormat';

// Define a type for the component's props (if needed)
interface PlayerPopupProps {
  player: Player | null;
	remainingBank: number;
	unselectPlayer: () => void;
	handleBuyInClick: (id: number, amount: number) => void;
  handleCashoutClick: (id: number, amount: number) => void;
	handleDeletePlayerClick: (id: number) => void;
}

// Define the PlayerHand component
const PlayerPopup: React.FC<PlayerPopupProps> = ({ player, remainingBank, unselectPlayer, handleBuyInClick, handleCashoutClick, handleDeletePlayerClick}) => {
	const [playerState, setPlayerState] = useState(player);
  const [buyInAmount, setBuyInAmount] = useState('');
  const [cashoutAmount, setCashoutAmount] = useState('0');
	const [deleteCheck, setDeleteCheck] = useState(false);
  const [dragStartY, setDragStartY] = useState(0);
  const [transformY, setTransformY] = useState('0');
  const isDraggingRef = useRef(false);
  const lastDeltaYRef = useRef(0);
  const lastTimestampRef = useRef(0);
	const speed = useRef(0);
	const speedThreshold = 0.5; // Adjust this threshold as needed

	const resetState = () =>{
		setBuyInAmount('');
		setCashoutAmount('0');
		isDraggingRef.current = false
		setDragStartY(0);
		setTransformY('0px');
		speed.current = 0;
	}

	const backgroundClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		const el = e.target as HTMLElement;		
		if(el.classList.contains(styles.background)){
			unselectPlayer();
			resetState()
		}
	}

	useEffect(() => {
		if(player) {
			setPlayerState(player)
		}else{
			setTimeout(() => {
				setPlayerState(player)
				resetState()
			}, 300)
		}

	}, [player])

	  // Function to handle mouse down event on drag_close_button
		const handleDragStart = (e: any) => {
			
			isDraggingRef.current = true;
			setDragStartY(e.clientY);
			lastDeltaYRef.current = 0;
			lastTimestampRef.current = Date.now();
		};
	
		// Function to handle mouse move event for dragging
		const handleDragMove = (e: any) => {
			if (isDraggingRef.current) {
				const deltaY = e.clientY - dragStartY;
				const currentTimestamp = Date.now();
     		const deltaTime = currentTimestamp - lastTimestampRef.current;
				if(deltaY >= 0){
					setTransformY(deltaY+'px');
					const speedVal = Math.abs(deltaY - lastDeltaYRef.current) / deltaTime;
					if(!Number.isNaN(speedVal) && Number.isFinite(speedVal))
						speed.current = speedVal

					// Set the current timestamp and deltaY for the next iteration
					lastTimestampRef.current = currentTimestamp;
					lastDeltaYRef.current = deltaY;
				}
			}
		};
	
		// Function to handle mouse up event to stop dragging
		const handleDragStop = () => {						
			if(speed.current > speedThreshold){				
				unselectPlayer()
				setTransformY('100%');

			}else{
				setTransformY('0');
			}
			isDraggingRef.current = false;
			setDragStartY(0);
		};

		const handleTouchStart = (e: any) => {
			const touch = e.touches[0];
			handleDragStart(touch);
		};
	
		const handleTouchMove = (e: any) => {
			if (isDraggingRef.current) {
				const touch = e.touches[0];
				handleDragMove(touch);
			}
		};
	
		// Apply the transformY style to the container element
		const containerStyle: React.CSSProperties = {
			transform: `translateY(${transformY})`,
		};

  return (
    <div 
		className={`${styles.background} ${player && styles.active}`} 
		onClick={(e)=>backgroundClick(e)} 
		onMouseMove={(e) => handleDragMove(e)} 
		onMouseUp={() => handleDragStop()} 
		onTouchMove={(e) => handleTouchMove(e)} 
		onTouchEnd={() => handleDragStop()}>
			<div 
			className={`${styles.container} ${isDraggingRef.current && styles.dragging}`} style={isDraggingRef.current ? containerStyle : undefined}>
				<div 
				className={styles.header} 
				onMouseDown={(e) => handleDragStart(e)} 
				onTouchStart={(e) => handleTouchStart(e)}>
					<h2>{playerState?.name}</h2>
					<div className={styles.drag_close_button}></div>
				</div>
				{
					playerState?.cash_out_amount == -1 ? (
					<div className={styles.body}>
						<div className={styles.section}>
							<h3>Buy In</h3>
							<p>Input additional buy in amount.
							<br/>Use negative values to adjust wrong inputs.</p>
							<h3>Amount Commited: {formatter.format(playerState?.buy_in_amount)}</h3>
							<input type="text"
							value={buyInAmount}
							onChange={(e) => {
								if(/^-?\d*\.?\d*$/.test(e.target.value))
									setBuyInAmount(e.target.value)
							}}
							placeholder="Amount"/>
							<button onClick={() => {
								if(player && /^-?\d*\.?\d*$/.test(buyInAmount) && buyInAmount != '')
									handleBuyInClick(player.id, parseFloat(buyInAmount))
							}}>Submit</button>
						</div>
						<div className={styles.section}>
							<h3>Cashout</h3>
							<p>When this player is done playing, input his final chip count in dollar amount and hit Cashout.</p>
							<p>Cashout amount must be less than or equal to Remaining Bank.</p>
							<h3>Remaining Bank: {formatter.format(remainingBank)}</h3>
							<input type="text"
							value={cashoutAmount}
							onChange={(e) => {
								if(/^\d*\.?\d*$/.test(e.target.value))
									setCashoutAmount(e.target.value)
							}}
							placeholder="Amount"/>
							<button onClick={() => {
								if(player && /^\d*\.?\d*$/.test(cashoutAmount) && cashoutAmount != '' && parseFloat(cashoutAmount) <= remainingBank){
									handleCashoutClick(player.id, parseFloat(cashoutAmount));
									unselectPlayer();
								}
									
							}}>Cashout</button>
						</div>
						<div className={styles.section}>
							<button className={styles.danger} onClick={() => {
								if(deleteCheck && player){
									handleDeletePlayerClick(player.id);
									unselectPlayer()
								}else{
									setDeleteCheck(true);
									setTimeout(() => {
										setDeleteCheck(false)
									}, 2000)
								}
							}}>{deleteCheck ? 'Are you sure?' : 'Delete Player'}</button>
						</div>
					</div>):
					(<div className={styles.body}>
						<div className={styles.section}>
							<h3>This player has already cashed out</h3>
							<h3>Cashout Amount: ${playerState?.cash_out_amount}</h3>
							<p>If this player wants to return to their seat, or the cashout amount is incorrect, click on
								Undo Cashout.
							</p>
							<button className={styles.danger} onClick={() => {
								if(player){
									handleCashoutClick(player.id, -1);
									unselectPlayer();
								}
							}}>Undo Cashout</button>
						</div>
					</div>)
				}
				
			</div>
    </div>

  );
};

// Export the PlayerHand component
export default PlayerPopup;
