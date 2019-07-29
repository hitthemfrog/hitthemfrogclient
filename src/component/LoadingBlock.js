import React, { Component } from 'react'
import LoadingSpinner from '../image/Spinner-1s-200px.svg'
import LoadingBlock4 from '../image/Blocks-1s-200px(4).svg'

export default class Loading extends Component {
    render() {
        return (
            <div>
                <div>
                    <img data-testid="loadingImg" src={LoadingBlock4} alt="logo" />
                </div>
                <div>
                    <img data-testid="loadingImg" src={LoadingSpinner} alt="logo" />
                </div>
                <div>
                </div>
            </div>
        )
    }
}
