import React, { Component } from 'react';
import {GameText} from './gameLogic';
import Data from './data.json';
import './App.scss';

class App extends Component {
	render() {
		return (
			<GameText wholeData={Data}/>
			/* <div className="message-box">
				<p>
					You are stranded on what looks like a lonely island. It is pretty sunny outside.
					You look around but no ones around you.
					From a distance, you notice a trail that walks to the forest.
				</p>
				<p>
					Do you want to walk to the forest or walk along the <b>shore</b>?
				</p>

				<input type="text" id="choice" placeholder="Your Choice.." />
			</div> */
		);
	}
}

export default App;
