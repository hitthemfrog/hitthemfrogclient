import React, { Component } from "react";
import sceneSetup from "./hitthefrog/scene.setup";
import initModels from "./hitthefrog/init.models";
import { mouseClickListener, mouseMoveListener } from './hitthefrog/events'
import loop from './hitthefrog/loop'


class Game extends Component {
  componentDidMount() {
    let setup = sceneSetup(this.gameThree)
    let models = initModels(setup.scene)
    let clickedObjUUidArray = []
    mouseClickListener(setup.camera, setup.scene)
    mouseMoveListener(setup.camera, setup.scene, clickedObjUUidArray)
    loop(setup.scene, setup.renderer, setup.camera, models, clickedObjUUidArray)
  }
  render() {
    return (
      <div ref={ref => (this.gameThree = ref)} />
    )
  }
}

export default Game