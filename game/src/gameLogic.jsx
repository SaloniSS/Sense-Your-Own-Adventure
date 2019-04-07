import React from 'react';

export class GameText extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            currNode : props.wholeData
        };
    }

    handleChange = (event) => {
        this.setState({storyText: event.target.value});
    }

    handleKeyPress = (event) => {       // stop getting user input on enter
        if(event.key === 'Enter'){
            // checkInput();
            alert(this.state.currNode.data.name);
        }
    }

    nextPart(Node) {
        this.setState({storyText: Node.target.value});
    }

    render() {
        return (
            <div>
                <p>{this.state.currNode.data.story}</p>
                <input onChange={this.handleChange.bind(this)} onKeyPress={this.handleKeyPress.bind(this)}/>
            </div>
        );
    }
}