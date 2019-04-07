import React, { Component } from 'react';
import {GameText} from './gameLogic';
import Data from './data.json';
import './App.scss';
import './App.scss'

class App extends Component {


	render() {
		return <GameText wholeData={Data}/>
	}
}

export default App;
