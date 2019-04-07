import React from 'react';

export class GameText extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            input: '',
            currNode : 'data?',
            // or
            storyText: 'example story',
            music: 'example.mp3',
        };
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleKeyPress = (event) => {       // stop getting user input on enter
        if(event.key === 'Enter'){
            checkInput();
        }
    }

    nextPart(Node){
        this.setState({storyText: Node.target.value});
    }

    render() {
        return (
            <div>
                <p>{this.state.storyText}</p>
                <input onchange={this.handleChange.bind(this)} onkeypress={this.handleKeyPress.bind(this)}/>
            </div>
        );
    }
}

export default GameText;