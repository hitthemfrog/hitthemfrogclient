import React, { Component } from 'react'
import LoadingPacman from '../image/Pacman-0.6s-200px.svg'
import LoadingSpinner from '../image/Spinner-1s-200px.svg'
import LoadingBlock from '../image/Blocks-1s-200px.svg'
import LoadingBlock1 from '../image/Blocks-1s-200px(1).svg'
import LoadingBlock2 from '../image/Blocks-1s-200px(2).svg'
import LoadingBlock3 from '../image/Blocks-1s-200px(3).svg'
import LoadingBlock4 from '../image/Blocks-1s-200px(4).svg'

import LoadingEllips from '../image/Ellipsis-1s-200px.svg'
import LoadingWedges from '../image/Wedges-3s-200px.svg'


export default class Loading extends Component {
    render() {
        return (
            <div>
                <div>
                    {/* <img data-testid="loadingImg" src={LoadingBlock4} alt="logo" /> */}
                    {/* <img data-testid="loadingImg" src={LoadingSpinner} alt="logo" /> */}
                    <img data-testid="loadingImg" src={LoadingBlock4} alt="logo" />
                </div>
                <div>
                    <img data-testid="loadingImg" src={LoadingEllips} alt="logo" />
                </div>
                <div>
                </div>
            </div>
        )
    }
}
