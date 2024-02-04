import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/Tarnib/HomePage/HomePage';
import RoomPage from './pages/Tarnib/RoomPage/RoomPage';
import PokerHomePage from './pages/Poker/HomePage/HomePage';
import PokerRoomPage from './pages/Poker/RoomPage/RoomPage';
import PrintPage from './pages/Poker/PrintPage/PrintPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/room/:roomId" element={<RoomPage />} />
          <Route path="/poker" element={<PokerHomePage />} />
          <Route path="poker/room/:roomId" element={<PokerRoomPage />} />
          <Route path="poker/room/:roomId/print" element={<PrintPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
