import React from 'react';
import rnl2b from 'react-newline-to-break';

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
        let text = this.state.currNode.data.story;
        text = rnl2b(text);

        return (
            <div className="message-box">
                <div className="message-text">
                    <p>
                        { text }
                    </p>
                </div>
                <input type="text" id="choice" onChange={this.handleChange.bind(this)} onKeyPress={this.handleKeyPress.bind(this)}/>
            </div>
        );
    }
}