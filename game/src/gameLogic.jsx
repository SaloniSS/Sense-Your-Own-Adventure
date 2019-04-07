import React from 'react';
import rnl2b from 'react-newline-to-break';
import Speech from 'speak-tts';

export class GameText extends React.Component {
    speech = new Speech();

    constructor(props){
        super(props);
        this.state = {
            currNode : props.wholeData,
            input : '',
            optMessage:''
        };
        this.textToSpeechInit();
        this.changeNode(props.wholeData);
    }

    textToSpeechInit() {
        this.speech.init({
            'volume': 1,
            'lang': 'en-GB',
            'rate': 1,
            'pitch': 1,
            'voice':'Google UK English Male',
            'splitSentences': true
        }).then((data) => {
            // The "data" object contains the list of available voices and the voice synthesis params
            console.log("Speech is ready, voices are available", data)
        }).catch(e => {
            console.error("An error occured while initializing : ", e)
        })
    }

    speak(elem) {
        this.speech.speak({ text: elem });
    }

    changeNode(elem) {
        this.setState({
            currNode: elem
        });
    }

    handleChange = (event) => {
        this.setState({input: event.target.value});
    };

    checkInput = () => {
        this.setState({
            optMessage: ''
        });
        if (this.state.input === this.state.currNode.right.data.name) {
            this.changeNode(this.state.currNode.right);
        }
        else if (this.state.input === this.state.currNode.left.data.name) {
            this.changeNode(this.state.currNode.left);
        }
        else {
            // this.speak("Input not recognized. Please enter either " + this.state.currNode.right.data.name + " or " + this.state.currNode.left.data.name);
            this.setState( {
                optMessage: "Input not recognized. Please enter either " + this.state.currNode.right.data.name + " or " + this.state.currNode.left.data.name
            })
        }
        this.setState({
            input: ''
        });
        //Else if >50% close to one word say “Did you mean to type (child keyword)? (Keyword) is spelled (). Please retype.”
        //Add incorrect Node’s data to an array
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.checkInput();
    };


    render() {
        if (this.state.currNode.right === undefined) {
            return (
                <div className="message-box">
                    <div className="message-text">
                        <p className="upper">
                            {this.state.currNode.data.story}
                        </p>
                        <p className="lower">
                            Thank you for playing!
                        </p>
                    </div>
                </div>
            );
         }
        else {
            let text = this.state.currNode.data.story;
            this.speak(text);
            text = rnl2b(text);
            this.speak("Type " + this.state.currNode.right.data.name + " or " + this.state.currNode.left.data.name);

            return (
                <div className="container">
                    <img className="image" src={process.env.PUBLIC_URL + "/images/" + this.state.currNode.data.image} />
                    <div className="message-box">
                        <div className="message-text">
                            <p className="upper">
                                {text}
                            </p>
                            <p className="lower">
                                Type <span className="keyWord">{this.state.currNode.right.data.name}</span> or <span
                                className="keyWord">{this.state.currNode.left.data.name}</span>
                            </p>
                            <p className="optMessage">{this.state.optMessage}</p>
                        </div>
                        <form className="form" onSubmit={ this.handleSubmit }>
                            <input type="text" className="input" id="choice" value={this.state.input} autoFocus onChange={this.handleChange.bind(this)} />
                            <input type="submit" className="submit" value="Enter" />
                        </form>
                    </div>
                </div>
            );
        }
    }
}