import React, { Component } from 'react';
import Board from './Board';
import './App.css';

/** Simple app that just shows the LightsOut game. */

class App extends Component {
	render() {
		return (
			<div className='App'>
				<Board numRows={5} numCols={5} chanceLightStartsOn={0.25} />
			</div>
		);
	}
}

export default App;
