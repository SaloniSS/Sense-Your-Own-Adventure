import React, { Component } from 'react';
import {GameText} from './gameLogic';
import Data from './data.json';
import './App.scss';
import rnl2b from 'react-newline-to-break';
import './App.scss'

class App extends Component {


	render() {
		let text = "You are stranded on what looks like a lonely island. It is pretty sunny outside. You look around but no ones around you. From a distance, you notice a trail that walks to the forest.\nDo you want to walk to the forest or walk along the shore?";
		text = rnl2b(text);

		return (
			<div className="message-box">
				<div className="message-text">
					<p>
						{ text }
					</p>
				</div>
				<input type="text" id="choice" placeholder="Your Choice.." />
			</div>
		);
	}
}

export default App;
