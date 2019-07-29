import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {
    isGameFinished: state.isGameFinished
  }
}

function gameover (props) {
  return (
    <h1>
      { JSON.stringify(props.isGameFinished) }
    </h1>
  )
}  

export default connect(mapStateToProps)(gameover) 
  