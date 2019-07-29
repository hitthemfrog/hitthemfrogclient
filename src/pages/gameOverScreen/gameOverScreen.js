import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const mapStateToProps = state => {
  return {
    isGameFinished: state.isGameFinished
  }
}

function gameover (props) {
  const username = localStorage.getItem('htf_username')
  const isWinner = username === props.isGameFinished.winner

  if (!props.isGameFinished.score) return props.history.push('/room')

  return (
  <div id="style-15" className="roomBox scrollbar force-overflow">
    <div className='row'>
      <div className='col s12 m12 l12'>
        { isWinner &&
          <div>
            <h1><i>Congratulations!!, </i>{ username }</h1>
            
          </div>
        }
        {
          !isWinner &&
          <h1><i>You Lose!!, </i>{ username } !!</h1>
        }
        
        <hr />
        <h3>Score: { props.isGameFinished.score[username] }</h3>

        <button className="btnnya-main linkStyle" onClick={ () => {
          localStorage.removeItem('htf_roomname')
          props.history.push('/room')
        }}>AYO MAIN LAGI</button>

      </div>
    </div>      
  </div>
  )
}  

export default connect(mapStateToProps)(gameover) 
  