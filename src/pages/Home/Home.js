import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import './Home.css';

export class HomePage extends Component {
    state = {
        inputUserName: '',
        statusUserName: false
    }

    validateUserName = (e) => {
        e.preventDefault();
        console.log('validateUserName', this.state.inputUserName)
        if (this.state.inputUserName === undefined || this.state.inputUserName === '' ){
            console.log('nama blum diisi mas')
            this.launch_toast()
        } else {
            console.log('go to room list')
            console.log(this.inputUserName)
            localStorage.setItem('htf_username', this.state.inputUserName)
            this.setState({
                inputUserName: ''
            })
            this.routerPushToRoom()
        }
    }

    routerPushToRoom(){
        this.setState({
            statusUserName: true
        })
    }
    
    onChange = (e) => this.setState({
        [e.target.name]: e.target.value
    })

    changeInputUserName(value){
        console.log(value)
    }

    launch_toast() {
        var x = document.getElementById("toast")
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 4000);
    }

    cekUserName() {
        let userNameLogin = localStorage.getItem('htf_username')
        console.log(userNameLogin, " adalah ")
        if (userNameLogin) {
            this.routerPushToRoom()
        }
    }

    componentDidMount() {
        console.log('componentDidMount trigger')
        this.cekUserName()
    }


    render() {
        return (
            <>
            {
                !this.state.statusUserName
                &&
                <div className="startGameStyle col s12 m12 l12">
                <h1>HitThatFrogs</h1>
                    <div>
                        {/* <button className="linkStyle"><Link className="btn-main"  to="/room">START</Link></button> */}
                    </div>
                    <div >
                        <form onSubmit={this.validateUserName}>
                            <input
                                style={styleInput}
                                name='inputUserName'
                                value={this.state.inputUserName}
                                placeholder=" Input Name here..."
                                onChange={this.onChange}
                                type="text"
                            />
                        <div id="toast"><div id="img"> <i className="material-icons">error</i></div><div id="desc">Please Input your name..</div></div>
                        <button onClick={this.validateUserName} className="btnnya-main linkStyle" id="new-game-button">Submit</button>
                        </form>
                    </div>
                </div>
            }
            {
                this.state.statusUserName
                &&
                <Redirect to='/room' />
            }
            </>
        )
    }
}

const styleInput = {
    width:250,
    marginTop: 290,
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

export default HomePage
