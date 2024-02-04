import { useEffect, useState } from 'react';
import styles from './Header.module.css';

interface PrintPageProps{
  room_id?: string;
}

export default function Header({room_id}:PrintPageProps) {
      // State to track whether the scroll position is at the top
  const [isAtTop, setIsAtTop] = useState(true);

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

  // Add scroll event listener when the component mounts
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <div className={`${styles.header} ${isAtTop && styles.top}`}>
        <a href="/poker">
            <h1>
                <img className={styles.spade} src="/assets/images/spade.png" alt="" />
                Poker
                <img className={styles.heart} src="/assets/images/heart.png" alt="" />
            </h1>
        </a>
        {room_id ? 
        ( <img src="/assets/images/save.svg" onClick={goToPrint}/>)
        : null}
       
    </div>
  );
};
