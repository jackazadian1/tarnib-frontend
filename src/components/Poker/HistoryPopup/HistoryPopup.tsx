// Import React and any necessary dependencies
import React, { useEffect, useRef, useState } from 'react';
import styles from './HistoryPopup.module.css';
import { Player } from '../Player';
import { formatter } from '../CurrencyFormat';

// Define a type for the component's props (if needed)
interface HistoryPopupProps {
	history: any;
	open: boolean;
	handleHistoryState: (state: boolean) => void;
}

// Define the PlayerHand component
const PlayerPopup: React.FC<HistoryPopupProps> = ({ history, open, handleHistoryState}) => {
  const [dragStartY, setDragStartY] = useState(0);
  const [transformY, setTransformY] = useState('0');
  const isDraggingRef = useRef(false);
  const lastDeltaYRef = useRef(0);
  const lastTimestampRef = useRef(0);
  const speed = useRef(0);
  const speedThreshold = 0.5; // Adjust this threshold as needed

	const resetState = () =>{
		isDraggingRef.current = false
		setDragStartY(0);
		setTransformY('0px');
		speed.current = 0;
	}

	const backgroundClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		const el = e.target as HTMLElement;		
		if(el.classList.contains(styles.background)){			
			handleHistoryState(false)
			resetState()
		}
	}

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
				handleHistoryState(false)			
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

		const evalHistoryItem = (item: any) => {
			switch (item.action){
				case 'player_added':
					return (
						<React.Fragment>
							<div>Player Added: <strong>{item.player_name}</strong> for <strong>{formatter.format(item.buy_in_amount)}</strong></div>
							<div className={styles.time}><strong>{item.time}</strong></div>
						</React.Fragment>
					)
				case 'player_deleted':
					return (
						<React.Fragment>
							<div>Player Deleted: <strong>{item.player_name}</strong></div>
							<div className={styles.time}><strong>{item.time}</strong></div>
						</React.Fragment>
					)
				case 'added_chips':
					return (
						<React.Fragment>
							<div className={styles.added_chips}>
								<div>Player Buy In: <strong>{item.player_name}</strong> for <strong>{formatter.format(item.buy_in_amount)}</strong></div>
								<div>New Total Buy In: <strong>{formatter.format(item.total_buy_in_amount)}</strong></div>
							</div>
							<div className={styles.time}><strong>{item.time}</strong></div>
						</React.Fragment>
					)
				case 'player_cashed_out':
					return (
						<React.Fragment>
							<div>
								<div>Player Cashout: <strong>{item.player_name}</strong> for <strong>{formatter.format(item.cash_out_amount)}</strong></div>
							</div>
							<div className={styles.time}><strong>{item.time}</strong></div>
						</React.Fragment>
					)
				case 'undo_player_cashout':
					return (
						<React.Fragment>
							<div>
								<div>Undid Player Cashout: <strong>{item.player_name}</strong></div>
							</div>
							<div className={styles.time}><strong>{item.time}</strong></div>
						</React.Fragment>
					)
				case 'player_cashed_out_remainder':
					return (
						<React.Fragment>
							<div>
								<div>Last Player Cashout Remainder: <strong>{item.player_name}</strong> for <strong>{formatter.format(item.cash_out_amount)}</strong></div>
							</div>
							<div className={styles.time}><strong>{item.time}</strong></div>
						</React.Fragment>
					)
				default:
					return <div>hi</div>
			}
			
		}

  return (
    <div 
		className={`${styles.background} ${open && styles.active}`} 
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
					<h2>History</h2>
					<div className={styles.drag_close_button}></div>
				</div>
				<ul className={styles.body}>
					{history ? [...history].reverse().map((item:any, id:number) => (
					<li key={id}>{evalHistoryItem(item)}</li>
					)) : (<h2>Nothing to show yet</h2>)}
				</ul>
			</div>
    </div>

  );
};

// Export the PlayerHand component
export default PlayerPopup;
