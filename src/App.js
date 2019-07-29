import './App.css';
import React from 'react';
import { BrowserRouter as Router , Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import io from 'socket.io-client'
import store from './store/store'
import socketListener from './socket.listener'

import RoomPage from './pages/Room/Room'
import RoomPageDetail from './pages/Room/RoomDetail'
import HomePage from './pages/Home/Home'
import WaitingRoom from './pages/WaitingRoom/waiting.room' 
import Game from './pages/game/game'
import GameOverScreen from './pages/gameOverScreen/gameOverScreen'

const socket = io('http://10.148.0.5/');
socketListener(socket)

const renderWithSocket = Component => (props) => (
  <Component {...props} socket={socket} />
)

function App() {
  return (
    <div className="App">
      <Provider store={ store } >
        <Router>
          <Switch>
            <Route exact path="/" component={ HomePage } />
            <Route exact path='/room' render={renderWithSocket(RoomPage)} />} />            
            <Route exact path='/waitingRoom' render={renderWithSocket(WaitingRoom)} />            
            <Route exact path='/game' render={renderWithSocket(Game)} />
            <Route exact path='/room/:roomname' render={renderWithSocket(RoomPageDetail)} />  
            <Route exact path='/gameOver' render={renderWithSocket(GameOverScreen)} />  
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
