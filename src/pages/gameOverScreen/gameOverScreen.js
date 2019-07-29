import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const mapStateToProps = state => {
  return {
    isGameFinished: state.isGameFinished
  }
}

function gameover (props) {
  return (
    <h1>
      { JSON.stringify(props.isGameFinished) }
      <Link to="/room" >Back to Room</Link>
    </h1>
  )
}  

export default connect(mapStateToProps)(gameover) 
  