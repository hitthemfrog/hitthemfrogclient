import React from 'react';
import { BrowserRouter as Router , Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import './App.css';
import RoomPage from './pages/Room/Room'
import RoomPageDetail from './pages/Room/RoomDetail'
import HomePage from './pages/Home/Home'
import io from 'socket.io-client';
import Game from './pages/game/game'

const socket = io('http://localhost:3000');


function App() {
  return (
    <div className="App">
      <Provider store={ store } >
        <Router>
          <Switch>
            {/* <PrivateRoute exact path="/" component={ Home } /> */}
            <Route exact path="/" component={ HomePage  } />
            <Route exact path='/room' render={(props) => <RoomPage {...props} socket={socket} />} />            
            {/* <Route exact path='/room' component={ RoomPage } /> */}

            <Route exact path='/game' component={Game} />
            <Route exact path='/room/:id' component={ RoomPageDetail } />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
