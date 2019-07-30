import React, { Component } from 'react'
import LoadingBlock4 from '../image/Blocks-1s-200px(4).svg'

export default class Loading extends Component {
    render() {
        return (
            <div>
                <div>
                    <img data-testid="loadingImg" src={LoadingBlock4} alt="logo" />
                </div>
            </div>
        )
    }
}
