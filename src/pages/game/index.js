import React, { Component } from "react";
import { animate, mount, onUnmount, mouseMoveListener, mouseClickListener } from './game.hitthemfrog'

class Game extends Component {
  componentDidMount() {
    let { clientHeight, clientWidth } = this.gameThree
    mount(this.gameThree)
    mouseMoveListener(clientWidth, clientHeight)
    mouseClickListener()
    animate()
  }
  render() {
    return (
      <div ref={ref => (this.gameThree = ref)} />
    )
  }
}

export default Game