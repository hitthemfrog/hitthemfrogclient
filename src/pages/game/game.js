import React, { Component } from "react";
import initModels from "./hitthefrog/init.models";
import sceneSetup from "./hitthefrog/scene.setup";
import { mouseClickListener, mouseMoveListener } from './hitthefrog/events'
import loop from './hitthefrog/loop'
import initHud from './hitthefrog/hud'
import gameSoundMini from '../../sound/gameSoundMini.mp3'
import store from '../../store/store'
// import { Redirect } from 'react-router-dom'

let listenermousemove = null
let listenermouseclick = null
class Game extends Component {

  checkRoom() {
    let currentRoom = localStorage.getItem('htf_roomname')
    let { rooms } = store.getState()
    let room = rooms.find(e => e.name === currentRoom)
    if (!room) {
      this.props.history.push('/room')
      return false
    } else {
      return true
    }
  }

  async componentDidMount() {
    if (!this.checkRoom()) return

    if (!localStorage.getItem('htf_roomname')) {
      this.props.history.push('/room')
      return null
    } else {
      let setup = sceneSetup(this.gameThree)
      let { sceneHUD, setScoreHUD, cameraHUD } = initHud(this.gameThree)
      let models = await initModels(setup.scene)
      let clickedObjUUidArray = []
      listenermouseclick = mouseClickListener(setup.camera, setup.scene, this.props.socket, models)
      listenermousemove = mouseMoveListener(setup.camera, setup.scene, clickedObjUUidArray)
      loop(setup.scene, setup.renderer, setup.camera, sceneHUD, cameraHUD, setScoreHUD, this.props.socket, this.props.history)
    }
  }

  componentWillUnmount() {
    window.removeEventListener('mousedown', listenermouseclick)
    window.removeEventListener('mousemove', listenermousemove)
  }

  render() {
    return (
      <>
        <div>
          <audio src={gameSoundMini} autoPlay loop />
        </div>
        <div ref={ref => (this.gameThree = ref)} />
        {/* {
        !localStorage.getItem('htf_roomname') &&
        <Redirect to="/room"/>
      } */}
      </>
    )
  }
}

export default Game