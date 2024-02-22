import React, { useEffect, useState } from 'react';
import styles from './Header.module.css';

interface PrintPageProps{
  room_id?: string;
  handleHistoryState?: (state:boolean) => void;
}

export default function Header({room_id, handleHistoryState}:PrintPageProps) {
      // State to track whether the scroll position is at the top
  const [isAtTop, setIsAtTop] = useState(true);
  const [controlsOpen, setControlsOpen] = useState(false);

  // Function to handle scroll events
  const handleScroll = () => {
    if (window.scrollY === 0) {
      setIsAtTop(true);
    } else {
      setIsAtTop(false);
    }
  };

  const goToPrint = () => {
    const url = `/poker/room/${room_id}/print`;
    window.open(url, '_blank');
  }

  const toggleControls = () => {
    setControlsOpen(!controlsOpen)
  }

  // Add scroll event listener when the component mounts
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <React.Fragment>
    <div className={`${styles.header} ${isAtTop && styles.top}`}>
        <a href="/poker">
            <h1>
                <img className={styles.spade} src="/assets/images/spade.png" alt="" />
                Poker
                <img className={styles.heart} src="/assets/images/heart.png" alt="" />
            </h1>
        </a>
        {room_id ? 
        (<React.Fragment>
          <img className={styles.hamburger_icon} src="/assets/images/hamburger-icon.png" onClick={toggleControls}/>
          
        </React.Fragment>)
        : null}
    </div>
    {room_id ? 
        (<div className={`${styles.controls} ${controlsOpen && styles.active}`}>
            <img className={styles.history_icon} src="/assets/images/history-icon.png" onClick={() => {
              if(handleHistoryState)
                handleHistoryState(true)
                setControlsOpen(false)
            }}/>
            <img className={styles.save_icon} src="/assets/images/save.svg" onClick={goToPrint}/>
        </div>)
        : null}
    
    </React.Fragment>
  );
};
