import React, { Component } from 'react'
import LoadingAnimasi from '../image/Pacman-0.6s-200px.svg'

export default class Loading extends Component {
    render() {
        return (
            <div  >
                <img data-testid="loadingImg" src={LoadingAnimasi} alt="logo" />
            </div>
        )
    }
}
