import React, { Component } from 'react'
import soundfile from '../../sound/sountrack_mini.mp3'
import LoadingBlock from '../../component/Loading2'
import WebCamCapture from '../../component/Webcam'
import axios from 'axios'
import host from '../../host'
import IconUser from '../../image/frog-transparent-pixel-art-1.gif'
import { css } from '@emotion/core';
import { ClipLoader } from 'react-spinners';
// Another way to import
// import ClipLoader from 'react-spinners/ClipLoader';

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
        console.log('validateUserName', this.state.inputUserName)
        if (this.state.inputUserName === undefined || this.state.inputUserName === '' ){
            console.log('nama blum diisi mas')
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
                // alert('username udah ada')
                console.log('go to room list')
                console.log(this.state.inputUserName)
            }
        }
    }
    
    onChange = (e) => this.setState({
        [e.target.name]: e.target.value
    })

    changeInputUserName(value){
        console.log(value)
    }

    launch_toast(message) {
        console.log('masuk launct toast', message)
        this.setState({
            errMessage: message
        })
        var x = document.getElementById("toast")
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 4000);
    }

    cekUserName() {
        let userNameLogin = localStorage.getItem('htf_username')
        console.log(userNameLogin, " adalah ")
        if (userNameLogin) {
            // this.routerPushToRoom()
            this.props.history.push('/room')
        }
    }

    componentDidMount() {
        let backsoundAudio = new Audio();
        backsoundAudio.src = soundfile
        // console.log('load mp3')
        // backsoundAudio.play()
            // console.log('done loading mp3')
        this.setState({
            isLoading: true
        })
        navigator.mediaDevices.getUserMedia({video: true})
        .then((response) => {
            this.setState({
                webcamIsActive: true,
                isLoading: false
            })

            console.log('WEBCAM IS ACTIVE',this.state.webcamIsActive);
        })
        .catch((err) => {
            console.log('GA ADAAA');
            this.setState({
                webcamIsActive: false,
                isLoading: false
            })
            console.log('WEBCAM IS ACTIVE',this.state.webcamIsActive)
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
                            this.state.webcamIsActive == false
                            ? <h4 style={webcamMessage}>Turn on your webcam first</h4>
                            :<WebCamCapture ref={ref => this.webcam = ref }/>
                            }
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
                        <div>
                            { this.state.isLoading && <ClipLoader
                                css={override}
                                sizeUnit={"px"}
                                size={150}
                                color={'#123abc'}
                                loading={this.state.loading}
                                />
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
const loader = {
    border: '16px solid #f3f3f3',
    borderRadius: '50%',
    borderTop: '16px solid #3498db',
    width: '120px',
    margin: '0 auto',
    height: '120px',
    animation: 'spin 2s linear infinite'
}

export default HomePage
