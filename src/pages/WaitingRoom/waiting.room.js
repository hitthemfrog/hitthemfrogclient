import React from 'react'
import Loading from '../../component/Loading'
import Loading2 from '../../component/Loading2'
import LoadingBlock from '../../component/LoadingBlock'
import soundfile from '../../sound/sountrack.mp3'

let listRoomListener = null

class WaitingRoom extends React.Component {
  state = {
    counter: 5
  }
  componentDidMount() {
    listRoomListener = this.props.socket.on('listRoom', (rooms) => {
      let roomName = localStorage.getItem('htf_roomname')
      let room = rooms.find(e => e.name === roomName)
      if (room.players.length === 2) {
        this.coundown()
      }
    })
    
    this.props.socket.emit('checkRoom')
  }
  
  componentDidUpdate() {
    console.log('did update ke trigger')
    // this.coundown()
  }

  componentWillUnmount() {
    this.props.socket.removeListener('listRoom', listRoomListener)
  }

  
  coundown() {
    setInterval(() => {
      if(this.state.counter === 0){
          clearInterval()
          this.props.history.push('/game')
          return 
      } 
      this.setState({
        counter: this.state.counter - 1
      })
    }, 1000)
  }

  
  render () {
    return (
      <>
        <div>
            <audio src={soundfile} autoPlay/>
        </div>
        <div id="style-15" className="roomBox scrollbar force-overflow">
              <div className='row'>
                <div className='col s12 m12 l12'>
                  {
                    <h1>{this.state.counter}</h1>
                  }
                  {/* {JSON.stringify(this.props)} */}
                  {/* <Loading/> */}
                  {/* <span style={waitingStyle2}>Waiting another player...</span> */}
                  {/* {JSON.stringify(this.props)} */}
                </div>
                <div className='col s12 m12 l12'>
                  {/* <Loading2/>
                   */}
                   <LoadingBlock />
                  <span style={waitingStyle}>Waiting another player...</span>
                </div>
              </div>      
            </div>
      </>
    )
  }
}

const waitingStyle2 = {
  fontFamily: 'Special Elite, cursive',
  fontSize: '28px'
}

const waitingStyle = {
  // fontFamily: 'Special Elite, cursive',
  fontFamily: 'Snowburst One, cursive',
  fontSize: '28px'
}

export default WaitingRoom