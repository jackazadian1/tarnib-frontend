import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Player } from './Player';
import { Room } from './Room';

export const useGameDataPoker = (setHasFetched: React.Dispatch<React.SetStateAction<boolean>>) => {
    // all state, state update functions, and server communication functions here

    const [gameData, setGameData] = useState({
        room_id: '',
        room_name: null,
        players: [] as Player[],
        bank: 0,
        is_open: true,
        date: ''
    });

    const [hasPassword, setHasPassword] = useState(-1);

    const[selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)

    const postHeaders = {
        'Content-Type': 'application/json',
    }

    const dateOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    } as any


    const checkForPassword = async() => {
        if (gameData.room_id) {
            try {                
                const response = await axios.get(`${process.env.REACT_APP_PHP_BACKEND_API_URI}api/pokerRoomPasswordCheck`,{
                params: {
                    room_id: gameData.room_id,
                },
                headers: postHeaders
                });
                // Do something with the response data, e.g., update the component's state
                console.log('fetch data: ',response.data);
                setHasPassword(response.data.has_password ? 1 : 0);
                setGameData({
                    ...gameData,
                    date: new Date(response.data.date).toLocaleDateString("en-US", dateOptions)
                });
                
            } catch (error) {
                // Handle any errors that occurred during the request
                console.error('Error fetching data:', error);
            }
        }
    }

    const fetchData = async () => {        
        //if (readyToFetch && playerData.player_name && gameData.room_id) {
            if (gameData.room_id) {
        try {            
            const response = await axios.get(`${process.env.REACT_APP_PHP_BACKEND_API_URI}api/pokerRoomData`,{
            params: {
                room_id: gameData.room_id,
            },
            headers: postHeaders
            });
            // Do something with the response data, e.g., update the component's state
            console.log('fetch data: ',response.data);

            var players = [] as Player[]
            response.data.players.forEach((player: any) => {
                
                players.push({
                    id: player.id,
                    name: player.name,
                    buy_in_amount: player.buy_in_amount,
                    cash_out_amount: player.cash_out_amount,
                } as Player)
            });

            setGameData({
                ...gameData,
                players: players,
                room_name: response.data.room.name,
                is_open: response.data.room.is_open == 0 ? false: true,
            });

            setTimeout(()=>{
                setHasFetched(true);
            },500)

        } catch (error) {
            // Handle any errors that occurred during the request
            console.error('Error fetching data:', error);
        }
        }
    };

    const handleAddChipsClick = async (id:number, amount: number) => {
        let data = {
            id: id,
            amount: amount
        }
        try {
            const response = await axios.post(`${process.env.REACT_APP_PHP_BACKEND_API_URI}api/addChips`, data, {headers: postHeaders})
            console.log(response.data);
    
            setGameData((prevGameData: any) => {
                const updatedPlayers = prevGameData.players.map((player: Player) => {
                    if (player.id === id) {
                        return {
                            ...player,
                            buy_in_amount: response.data.new_balance,
                        };
                    }
                    return player;
                });
            
                return {
                    ...prevGameData,
                    players: updatedPlayers,
                };
            })

            handleSelectPlayer(id)
            
        } catch (error) {
            console.error(error);
        }
    };

    const handleCashoutClick = async (id:number, amount: number) => {
        let data = {
            room_id: gameData.room_id,
            id: id,
            amount: amount
        }
        try {
            const response = await axios.post(`${process.env.REACT_APP_PHP_BACKEND_API_URI}api/cashout`, data, {headers: postHeaders})
            console.log(response.data);
    
            setGameData((prevGameData: any) => {
                const updatedPlayers = prevGameData.players.map((player: Player) => {
                    if (player.id === id) {
                        return {
                            ...player,
                            cash_out_amount: amount,
                        };
                    }else if (player.id === response.data.last_player) {
                        return {
                            ...player,
                            cash_out_amount: response.data.remaining_bank,
                        };
                    }
                    return player;
                });
            
                return {
                    ...prevGameData,
                    players: updatedPlayers,
                };
            })
            
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if(selectedPlayer){
            handleSelectPlayer(selectedPlayer.id)
        }
    }, [gameData.players])

    const handleSelectPlayer = (id:number) => {    
        gameData.players.map((player) => {
          if(player.id == id){
            setSelectedPlayer(player)
          }
        })
    };
    
    const unselectPlayer = () => {    
        setSelectedPlayer(null)
    };

    const handleDeletePlayerClick = async (id:number) => {    
        try {
          let data = {
            room_id: gameData.room_id,
            id: id
          }
    
          const response = await axios.post(`${process.env.REACT_APP_PHP_BACKEND_API_URI}api/deletePokerPlayer`, data, {headers: postHeaders});
          console.log(response.data);
    
          setGameData(prevGameData => ({
            ...prevGameData,
            players: gameData.players.filter((player) => {
                return player.id != id
              }),
          }));
        } catch (error) {
          console.error(error);
        }
      };

    return {
        gameData,
        setGameData,
        hasPassword,
        checkForPassword,
        fetchData,
        selectedPlayer,
        setSelectedPlayer,
        handleAddChipsClick,
        handleCashoutClick,
        handleSelectPlayer,
        unselectPlayer,
        handleDeletePlayerClick
    };
};
