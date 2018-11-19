import * as React from 'react';
import './App.css';
import Header from "./components/Header"

// import logo from './images/phantomLogo.png';

interface IState {
	open: boolean,
}

export default class App extends React.Component<{}, IState> {
	constructor (props : any) {
		super(props);

		this.state = {
			open: false
		};
	}

	public render() {
		return (
		<div className="App">
			<Header />
		</div>
		);
	}
}
