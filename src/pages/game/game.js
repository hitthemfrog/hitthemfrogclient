import React, { Component } from "react";
import sceneSetup from "./hitthefrog/scene.setup";
import initModels from "./hitthefrog/init.models";
import { mouseClickListener, mouseMoveListener } from './hitthefrog/events'
import loop from './hitthefrog/loop'
import initHud from './hitthefrog/hud'
import gameSoundMini from '../../sound/gameSoundMini.mp3'

class Game extends Component {
  componentDidMount() {
    let setup = sceneSetup(this.gameThree)
    let { sceneHUD, setScoreHUD, cameraHUD } = initHud(this.gameThree)
    let models = initModels(setup.scene)
    let clickedObjUUidArray = []
    mouseClickListener(setup.camera, setup.scene, this.props.socket, models)
    mouseMoveListener(setup.camera, setup.scene, clickedObjUUidArray)
    loop(setup.scene, setup.renderer, setup.camera, sceneHUD, cameraHUD, setScoreHUD, this.props.socket, this.props.history)
  }

  render() {
    return (
      <>
      <div>
          <audio src={gameSoundMini} autoPlay loop/>
      </div>
      <div ref={ref => (this.gameThree = ref)} />
      </>
    )
  }
}

export default Game