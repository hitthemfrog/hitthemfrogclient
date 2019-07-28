import React, { Component } from "react";
import sceneSetup from "./hitthefrog/scene.setup";
import initModels from "./hitthefrog/init.models";
import { mouseClickListener, mouseMoveListener } from './hitthefrog/events'
import loop from './hitthefrog/loop'
import initHud from './hitthefrog/hud'
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

let playerDataListener = function (playerList) {
  console.log(playerList)
}

class Game extends Component {
  async componentDidMount() {
    let setup = sceneSetup(this.gameThree)
    let { sceneHUD, setScoreHUD, cameraHUD } = initHud(this.gameThree)
    let models = await initModels(setup.scene)
    let clickedObjUUidArray = []
    mouseClickListener(setup.camera, setup.scene, socket, models)
    mouseMoveListener(setup.camera, setup.scene, clickedObjUUidArray)
    loop(setup.scene, setup.renderer, setup.camera, sceneHUD, cameraHUD, setScoreHUD, socket)

    socket.on('playersData', playerDataListener)
    
  }

  componentWillUnmount() {
    socket.removeListener('playersData', playerDataListener)
  }

  render() {
    return (
      <div ref={ref => (this.gameThree = ref)} />
    )
  }
}

export default Game