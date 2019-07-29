import React, { Component } from "react";
import sceneSetup from "./hitthefrog/scene.setup";
import initModels from "./hitthefrog/init.models";
import { mouseClickListener, mouseMoveListener } from './hitthefrog/events'
import loop from './hitthefrog/loop'
import initHud from './hitthefrog/hud'

class Game extends Component {
  async componentDidMount() {
    let setup = sceneSetup(this.gameThree)
    let { sceneHUD, setScoreHUD, cameraHUD } = initHud(this.gameThree)
    let models = await initModels(setup.scene)
    let clickedObjUUidArray = []
    mouseClickListener(setup.camera, setup.scene, this.props.socket, models)
    mouseMoveListener(setup.camera, setup.scene, clickedObjUUidArray)
    loop(setup.scene, setup.renderer, setup.camera, sceneHUD, cameraHUD, setScoreHUD, this.props.socket)
  }

  render() {
    return (
      <div ref={ref => (this.gameThree = ref)} />
    )
  }
}

export default Game