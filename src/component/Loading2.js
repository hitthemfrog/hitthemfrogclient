import React, { Component } from 'react'
import LoadingSpinner from '../image/Spinner-1s-200px.svg'

export default class Loading extends Component {
    render() {
        return (
            <div>
                <div>
                    <img data-testid="loadingImg" src={LoadingSpinner} alt="logo" />
                </div>
            </div>
        )
    }
}
