import * as React from 'react';
import './App.css';
import Header from "./components/Header"
import ThreadList from "./components/ThreadList"

// import logo from './images/phantomLogo.png';

interface IState {
    error: string
    open: boolean,
    threads: any[],
    value: string
    
}

export default class App extends React.Component<{}, IState> {
	constructor (props : any) {
		super(props);

		this.state = {
            error: "",
            open: false,
            threads: [],
            value: ""
            
        };
        
        this.fetchThreads("");
        this.fetchThreads = this.fetchThreads.bind(this)
	}

	public render() {
		return (
		<div className="App">
			<Header 
                searchUser={this.fetchThreads}
            />
            <ThreadList 
                error={this.state.error}
                threads={this.state.threads}
                value={this.state.value}
            />
		</div>
		);
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
            console.log(threadList)
            console.log(url)
            console.log(json)
        });
	}
}
