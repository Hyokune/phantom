import { Button } from '@material-ui/core';
import MediaStreamRecorder from 'msr';
import * as React from 'react';
import Modal from 'react-responsive-modal';


import './App.css';
import Header from "./components/Header"
import ThreadList from "./components/ThreadList"

import logo from './images/phantomLogo.png';

interface IState {
    authenticated: boolean,
    error: string,
    open: boolean,
    threads: any[],
    user: string
    value: string,
}

class App extends React.Component<{}, IState> {
	constructor (props : any) {
		super(props);

		this.state = {
            authenticated: false,
            error: "",
            open: false,
            threads: [],
            user: "",
            value: "",   
        };
        
        this.fetchThreads("");
        this.fetchThreads = this.fetchThreads.bind(this)
        this.authenticate = this.authenticate.bind(this)
        this.postAudio = this.postAudio.bind(this)
        this.searchByVoice = this.searchByVoice.bind(this)
    }
    
    public componentWillMount() {
        const cachedHits = sessionStorage.getItem('authenticated');
        const user = sessionStorage.getItem('user');
        if (cachedHits && user) {
            this.setState({ 
                authenticated: JSON.parse(cachedHits),
                user: JSON.parse(user)
            })
        }
    }

    public componentWillUpdate() {
        // For future purposes
    }

    public componentDidUpdate() {
        console.log(this.state.authenticated)
        console.log(this.state.user)
        sessionStorage.setItem('user', JSON.stringify(this.state.user));
        sessionStorage.setItem('authenticated', JSON.stringify(this.state.authenticated));
    }

	public render() {
		return (
		<div className="App">

            
                <Modal open={!this.state.authenticated} onClose={this.authenticate} closeOnOverlayClick={false} showCloseIcon={false} center={true}>
                    <img src={logo} id="login-logo-img"/>
                    <div className="login-logo">
                        <span>PHANTOM</span>
                    </div>
                    <div className="thread-window-login-input">
                        <input type="text" id="Username" required={true} placeholder="Username" />
                    </div>
                    <div className="thread-window-button-container">
                        <Button onClick={this.searchByVoice} variant="outlined" id="thread-window-login-button">Voice</Button>
                        <Button onClick={this.authenticate} variant="outlined" id="thread-window-login-button">Login</Button>
                    </div>
                </Modal>
			<Header 
                searchUser={this.fetchThreads}
                user={this.state.user}
            />
            <ThreadList 
                error={this.state.error}
                threads={this.state.threads}
                value={this.state.value}
                user={this.state.user}
            />
		</div>
		);
    }

    private authenticate() { 
        const textBox = document.getElementById("Username") as HTMLInputElement
        console.log(textBox.value)
        if (textBox.value === "") {
            return;
        }
        this.setState({
            authenticated: true,
            user: textBox.value
        })
        
    }

    // GET thread posts
	private fetchThreads(user: any) {
		let url = "http://phantomapi.azurewebsites.net/api/Phantom/threads/"
		if (user !== "") {
			url += user
		}
        fetch(url, {
            method: 'GET'
        })
        .then(res => res.json())
        .then(json => {
			const threadList = json[0]
			if (threadList === undefined) {
                this.setState({
                    error: "User not found"
                })
            } else {
                this.setState({
                    error: ""
                })
            }
			this.setState({
                threads: json
            })
            console.log(json)
        });
    }
    
    private searchByVoice() {
        const mediaConstraints = {
            audio: true
        }
        const onMediaSuccess = (stream: any) => {
            const mediaRecorder = new MediaStreamRecorder(stream);
            mediaRecorder.mimeType = 'audio/wav'; // check this line for audio/wav
            mediaRecorder.ondataavailable = (blob: any) => {
                this.postAudio(blob);
                mediaRecorder.stop()
            }
            mediaRecorder.start(3000);
        }
    
        navigator.getUserMedia(mediaConstraints, onMediaSuccess, onMediaError)
    
        function onMediaError(e: any) {
            console.error('media error', e);
        }
    }

    private postAudio (blob : any ) {
        let accessToken: any;
        fetch('https://westus.api.cognitive.microsoft.com/sts/v1.0/issueToken', {
            headers: {
                'Content-Length': '0',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Ocp-Apim-Subscription-Key': 'd1c3a6588a9d478597110be7436d185e'
            },
            method: 'POST'
        }).then((response) => {
            // console.log(response.text())
            return response.text()
        }).then((response) => {
            console.log(response)
            accessToken = response
        }).catch((error) => {
            console.log("Error", error)
        });

        // posting audio
        fetch('https://westus.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=en-US', {
            body: blob, // this is a .wav audio file    
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer' + accessToken,
                'Content-Type': 'audio/wav;codec=audio/pcm; samplerate=16000',
                'Ocp-Apim-Subscription-Key': 'd1c3a6588a9d478597110be7436d185e'
            },    
            method: 'POST'
        }).then((res) => {
            return res.json()
        }).then((res: any) => {
            console.log(res)
            const textBox = document.getElementById("Username") as HTMLInputElement
            textBox.value = (res.DisplayText as string).slice(0, -1)
        }).catch((error) => {
            console.log("Error", error)
        });
    }
    
}

export default App;