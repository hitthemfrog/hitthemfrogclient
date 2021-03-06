import React, { Component } from 'react'
import soundfile from '../../sound/sountrack_mini.mp3'
import frogSound from '../../sound/frogsoundeffect.mp3'
import LoadingBlock from '../../component/Loading2'
import WebCamCapture from '../../component/Webcam'
import axios from 'axios'
import host from '../../host'
import IconUser from '../../image/frog-transparent-pixel-art-1.gif'
import { css } from '@emotion/core';

import './Home.css';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: gray;
`;


export class HomePage extends Component {
    state = {
        inputUserName: '',
        webcamIsActive: false,
        isLoading: false,
        errMessage: '',
        dataReady: false
        // statusUserName: false
    }

    validateUserName = async (e) => {
        e.preventDefault();
        let audioButton = new Audio();
        audioButton.src = frogSound
        audioButton.play()
        if (this.state.inputUserName === undefined || this.state.inputUserName === '' ){
            this.launch_toast('Please Input your name..')
        } else {
            let formData = this.webcam.capture(this.state.inputUserName)
            try {
                await axios.post(`${host}/uploadImage`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                localStorage.setItem('htf_username', this.state.inputUserName)
                this.props.history.push('/room')
                
            } catch (err) {
                this.launch_toast('Username already exist')
            }
        }
    }
    
    onChange = (e) => this.setState({
        [e.target.name]: e.target.value
    })

    launch_toast(message) {
        this.setState({
            errMessage: message
        })
        var x = document.getElementById("toast")
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 4000);
    }

    cekUserName() {
        let userNameLogin = localStorage.getItem('htf_username')
        if (userNameLogin) {
            this.props.history.push('/room')
        }
    }

    componentDidMount() {
        let backsoundAudio = new Audio();
        backsoundAudio.src = soundfile
        this.setState({
            isLoading: true
        })
        navigator.mediaDevices.getUserMedia({video: true})
        .then((response) => {
            this.setState({
                webcamIsActive: true,
                isLoading: false
            })

        })
        .catch((err) => {
            this.setState({
                webcamIsActive: false,
                isLoading: false
            })
        })
        this.cekUserName()
    }


    render() {
        return (
            <>
            {
                <div>
                    <audio src={soundfile} autoPlay loop/>
                </div>
            }
            {
                !this.state.statusUserName
                &&
                <div id="style-15" className='row webCamBoxLarge scrollbar force-overflow"'>
                    <div className="startGameStyle col s12 m12 l12">
                    <h3 className="show-on-small hide-on-med-and-up" style={styleSmallHeader}>HitThemFr<img style={{width:25, height:25}} src={IconUser} alt="logo" />gs</h3>                    
                    <h1 className="hide-on-small-and-down" style={styleHeader}>HitThemFr<img style={{width:50, height:50}} src={IconUser} alt="logo" />gs</h1>
                        <div>
                            {/* <button className="linkStyle"><Link className="btn-main"  to="/room">START</Link></button> */}
                        </div>
                        <div>
                            {   
                            this.state.webcamIsActive === false
                            ?
                            <>
                            <LoadingBlock /> 
                            <h4 style={webcamMessage}>Turn on your webcam first</h4>
                            </>
                            :<WebCamCapture ref={ref => this.webcam = ref }/>
                        }
                        </div>
                        <div>
                            {/* {this.state.webcamIsActive == false && } */}
                        {/* <WebCamCapture ref={ref => this.webcam = ref }/> */}
                        </div>
                        <div >
                            {   
                            this.state.webcamIsActive === true
                            ? <form onSubmit={this.validateUserName}>
                            <input
                                style={styleInput}
                                name='inputUserName'
                                value={this.state.inputUserName}
                                placeholder=" Input Name here..."
                                onChange={this.onChange}
                                type="text"
                            />
                                <div id="toast">
                                    <div id="img"> <i className="material-icons">error</i></div>
                                    <div id="desc">{this.state.errMessage}</div>
                                </div>
                                <button onClick={this.validateUserName} className="btnnya-main linkStyle" id="new-game-button">Submit</button>
                                
                                </form>
                            :null
                            }
                        </div>
                        
                    </div>
                </div>
            }
            </>
        )
    }
}

const styleInput = {
    width:250,
    // marginTop: 290,
    padding : '5px',
    fontSize: '24px',
    marginRight: '10px',
    borderWidth: '2px',
    borderColor: 'green',
    backgroundColor: '#ffffff',
    color: '#434343',
    borderStyle: 'dashed',
    borderRadius: '15px',
    boxShadow: '1px 0px 5px rgba(16,16,66,0.75)',
    textShadow:  '1px 1px 1px rgba(105, 53, 53, 0.75)'
}

const styleHeader = {
    marginTop: '10px'
}

const styleSmallHeader = {
    fontFamily: 'Finger Paint, cursive'
}

const webcamMessage = {
    fontFamily: 'Finger Paint, cursive',
    marginTop: '100px'
}

export default HomePage
