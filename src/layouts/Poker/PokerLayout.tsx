import { ReactNode } from 'react';
import styles from './PokerLayout.module.css';
import Header from '../../components/Poker/Header/Header';

interface PokerLayoutProps{
    children: ReactNode;
    locked?: any;
    room_id?: string;
    handleHistoryState?: (state:boolean) => void;
}


export default function PokerLayout({ children, locked, room_id, handleHistoryState }: PokerLayoutProps) {
    if(locked){
        document.querySelector('body')?.classList.add('locked')
    }else{
        document.querySelector('body')?.classList.remove('locked')
    }
    return (
        <div>
            <Header room_id={room_id} handleHistoryState={handleHistoryState}/>
            <div className={styles.main}>{children}</div>
        </div>
    );
}
