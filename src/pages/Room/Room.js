import React, { Component } from 'react'
import IconUser from '../../image/frog-transparent-pixel-art-1.gif'
import RoomCard from './RoomCard'

export class Room extends Component {
    render() {
        return (
            <>
                <div className="force-overflow">
                </div>
                <div id="style-15" className="roomBox scrollbar force-overflow">
                    <img data-testid="loadingImg" className="avatar" src={IconUser} alt="logo" />
                    {/* <h1>ROOM LIST</h1> */}
                    <div className="row">
                        <RoomCard></RoomCard>
                        <RoomCard></RoomCard>
                        <RoomCard></RoomCard>
                        <RoomCard></RoomCard>
                    </div>
                </div>
            </>
        )
    }
}

export default Room
