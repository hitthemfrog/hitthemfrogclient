import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const mapStateToProps = state => {
  return {
    isGameFinished: state.isGameFinished
  }
}



function Gameover (props) {

  const username = localStorage.getItem('htf_username');
  const isWinner = username === props.isGameFinished.winner;

  useEffect(() => {
    props.socket.emit('leaveRoom', localStorage.getItem('htf_roomname') );
    localStorage.removeItem('htf_roomname');
  }, [])

  if (!props.isGameFinished.score) return props.history.push('/room');


  return (
  <div id="style-15" className="roomBox scrollbar force-overflow">
    <div className='row'>
      <div className='col s12 m12 l12'>
        { isWinner &&
          <div>
            <h1 className="playerNameStyle"><i>Congratulations!!, </i>{ username }</h1>
          </div>
        }
        {
          !isWinner &&
          <h1 className="playerNameStyle"><i>You Lose!!, </i>{ username } !!</h1>
        }
        
        <hr />
        <h3 className="playerNameStyle">Score: { props.isGameFinished.score[username] }</h3>

        <button id="new-game-button" className="btnnya-main linkStyle" onClick={ () => {
          props.history.push('/room');
        }}>AYO MAIN LAGI</button>
      </div>
    </div>      
  </div>
  )
}  

export default connect(mapStateToProps)(Gameover) 
  