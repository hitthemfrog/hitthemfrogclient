import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../store/game.action.reducer.type'
import frogSound from '../../sound/frogsoundeffect.mp3'

const mapStateToProps = state => {
  return {
    isGameFinished: state.isGameFinished
  }
}

const mapDispatchToProps = dispatch => {
  return {
    clearGame: () => dispatch(actions.clearGame())
  }
}



function Gameover (props) {
  console.log(props, " ini props")

  useEffect(() => {
    props.socket.emit('leaveRoom', localStorage.getItem('htf_roomname') );
    localStorage.removeItem('htf_roomname');
    
    return () => {
      props.clearGame()
    }
  }, [])
  
  if (props.isGameFinished.score === undefined) {
    props.history.push('/room')
    return null
  } else {
    const username = localStorage.getItem('htf_username');
    let scores = Object.values(props.isGameFinished.score)
    scores = scores.reduce((acc, curr) => acc - curr)
    const isDraw = scores === 0
    const isWinner = username === props.isGameFinished.winner;
    return (
      <div id="style-15" className="roomBox scrollbar force-overflow">
        <div className='row'>
          <div className='col s12 m12 l12'>
          {
            // props.isGameFinished
          }
            { isWinner && !isDraw &&
              <div>
                <h1 className="playerNameStyle"><i>Congratulations!!, </i>{ username }</h1>
              </div>
            }
            {
              !isWinner && !isDraw &&
              <h1 className="playerNameStyle"><i>You Lose!!, </i>{ username }</h1>
            }
            
            {
              isDraw &&
              <h1 className="playerNameStyle"><i>Game Draw!!</i></h1>
            }
    
            <hr />
            <h3 className="playerNameStyle">Score: { props.isGameFinished.score[username] }</h3>
    
            <button id="new-game-button" className="btnnya-main linkStyle" onClick={ () => {
              let audioButton = new Audio();
              audioButton.src = frogSound
              audioButton.play()
              props.history.push('/room');
            }}>AYO MAIN LAGI</button>
          </div>
        </div>      
      </div>
      )
  }
}  

export default connect(mapStateToProps, mapDispatchToProps)(Gameover) 
  