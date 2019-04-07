import React from 'react';
import rnl2b from 'react-newline-to-break';
import Speech from 'speak-tts';
import Sound from 'react-sound';

export class GameText extends React.Component {
    speech = new Speech();
    wrongWords = [];
    wrong = false;	// flag/bool to catch wrong words and add to array

    constructor(props) {
        super(props);
        this.state = {
            currNode : {
            	data: {
            		sound: "undefined.wav"
	            },
	            left: props.wholeData,
	            right: props.wholeData
            },
            input : 'Begin',
            optMessage:'',
	        sound: Sound.status.STOPPED,
	        lastSpoken: ''
        };
        this.textToSpeechInit();
	    this.handleSubmit = this.handleSubmit.bind(this);
		this.handleSubmitPrac = this.handleSubmitPrac.bind(this);
	    this.handleChange = this.handleChange.bind(this);
    }

    textToSpeechInit(cb = () => {}) {
        this.speech.init({
            'volume': 1,
            'lang': 'en-GB',
            'rate': 1,
            'pitch': 1,
            'voice':'Google UK English Male',
            'splitSentences': true
        }).then((data) => {
	        cb();
        });
    }


    changeNode(elem) {
    	if (elem.data.sound === undefined || elem.data.sound === "") {
    		elem.data.sound = "undefined.wav";
	    }
	    this.setState({
		    currNode: elem,
		    input: ''
	    }, () => {
		    this.speech.cancel();
	    	this.setState({
			    sound: Sound.status.PLAYING
		    });
	    });
    }

    handlePlaying = (soundObj) => {
    	if (soundObj.position >= 5000) {
			this.handleFinishPlaying();
	    }
    };

    handleFinishPlaying = () => {
	    this.setState({
		    sound:  Sound.status.STOPPED
	    }, () => {
		    this.speak();
	    });
    };

    speak = () => {
	    const elem = this.state.currNode;
	    if (elem.data.story) {
		    let text = elem.data.story;
		    if (elem.left !== undefined && elem.right !== undefined) {
			    text += 'Type. ' + elem.right.data.name + '. or. ' + elem.left.data.name;
		    }
		    if (text !== this.state.lastSpoken) {
		    	this.setState({
				    lastSpoken: text
			    });
			    this.speech.speak({
				    text: text
			    });
		    }
	    }
    };

    handleChange(event) {
	    if (this.speech.speaking() || this.state.sound === Sound.status.PLAYING) {
		    this.setState({input: ''});
	    } else {
		    this.setState({input: event.target.value});
	    }
    };

    checkInput = () => {
        this.setState({
            optMessage: ''
        }, () => {
        	const input = (this.state.input).toLowerCase().replace(/[^a-z]+/g, '');
	        const left = (this.state.currNode.left.data.name).toLowerCase().replace(/[^a-z]+/g, '');
	        const right = (this.state.currNode.right.data.name).toLowerCase().replace(/[^a-z]+/g, '');
	        if (input === right) {
	        	if(this.wrong === true) {	// if flagged that typed wrong then got correct the next time, add to practice list
	        		this.wrongWords.push(this.state.currNode.right.data);
	        		this.wrong = false;
				}
	            this.changeNode(this.state.currNode.right);
	        }
	        else if (input === left) {
				if(this.wrong === true) {
					this.wrongWords.push(this.state.currNode.left.data);
					this.wrong = false;
				}
	            this.changeNode(this.state.currNode.left);
	        }
	        else {
	        	this.wrong = true;
	            this.setState( {
	                optMessage: "Wrong spelling. Please enter either " + this.state.currNode.right.data.name + " or " + this.state.currNode.left.data.name
	            }, () => {
	                const elem = this.state.currNode;
		            const text = 'Type. ' + elem.right.data.name + '. or. ' + elem.left.data.name;
					this.speech.speak({
						text: text
					});
	            });
	        }
	        this.setState({
	            input: ''
	        });
        });
    };

    handleSubmit(event) {
        event.preventDefault();
	    if (this.speech.speaking() || this.state.sound === Sound.status.PLAYING) {
	    } else {
	        this.checkInput();
        }
    };

	handleSubmitPrac(event) {
		event.preventDefault();
		this.setState({
			optMessage: ''
		}, () => {
			const userInput = (this.state.input).toLowerCase().replace(/[^a-z]+/g, '');
			const answer = (this.wrongWords[0].name).toLowerCase().replace(/[^a-z]+/g, '');
			if (userInput === answer) {
				this.wrongWords.shift();
			} else {
				let spelling = '';
				for (const c of this.wrongWords[0].name) spelling += (c.toUpperCase() + '.');
				this.setState({
					optMessage: "You spelled the word wrong again. " + this.wrongWords[0].name + " is spelled " + spelling + " Please retype it again."
				}, () => {
					this.speech.speak({
						text: "You spelled the word wrong again. " + this.wrongWords[0].name + " is spelled " + spelling + " Please retype it again."
					});
				});
			}
			this.setState({
				input: ''
			});
		});
	}

	speakWord = () => {
		const elem = this.wrongWords[0];
		if (elem.name) {
			let text = ("You missed the word " + elem.name + ". Please retype it for practice.");
			if (text !== this.state.lastSpoken) {
				this.setState({
					lastSpoken: text
				});
				this.speech.speak({
					text: text
				});
			}
		}
	};

	endGame = () => {
		let text = ("There are no words to practice. Thank you for playing!");
		if (text !== this.state.lastSpoken) {
			this.setState({
				lastSpoken: text
			});
			this.speech.speak({
				text: text
			});
		}
	};

    lowerMessage = (
		<span>
		</span>
	);
    form = (
		<span>
		</span>
	);

    calculateText = () => {
	    if ((this.state.currNode.right !== undefined) && (this.state.currNode.left !== undefined)) {
		    this.lowerMessage = (
			    <span>
				    Type <span className="keyWord">{this.state.currNode.right.data.name}</span> or <span
				    className="keyWord">{this.state.currNode.left.data.name}</span>
			    </span>
		    );
		    this.form = (
			    <form className="form" onSubmit={this.handleSubmit}>
				    <input type="text" className="input" id="choice" autoFocus
				           onChange={ this.handleChange } value={ this.state.input } tabIndex={1} />
				    <input type="submit" className="submit" value="Enter" tabIndex={-1} />
			    </form>
		    );
	    } else {
	    	if (this.wrongWords.length === 0) {	// no more words to practice
				this.endGame();
				this.lowerMessage = (
					<span>There are no words to practice. Thank you for playing!</span>);
				this.form = (
					<span></span>);
			}
	    	else {		// words to practice
				this.speakWord();		// ADDED SPEAK WORD HERE
				this.lowerMessage = (
					<span>You missed the word {this.wrongWords[0].name}. Please retype it for practice.</span>
				);
				this.form = (
					<form className="form" onSubmit={this.handleSubmitPrac}>
						<input type="text" className="input" id="choice" autoFocus
							   onChange={this.handleChange} value={this.state.input} tabIndex={1}/>
						<input type="submit" className="submit" value="Enter" tabIndex={-1}/>
					</form>
				);
			}
	    }
    };


    render() {
	    let text = this.state.currNode.data.story;
	    text = rnl2b(text);

	    this.calculateText();

        return (
            <div className="container">
	            <Sound url={process.env.PUBLIC_URL + "/sounds/" + this.state.currNode.data.sound} playStatus={ this.state.sound } autoLoad onFinishedPlaying={ this.handleFinishPlaying } onStop={ this.handleFinishPlaying } onError={ this.handleFinishPlaying } onPlaying={ this.handlePlaying } />
	            <img className="image" src={process.env.PUBLIC_URL + "/images/" + this.state.currNode.data.image} alt={this.state.currNode.data.image} />
                <div className="message-box">
                    <div className="message-text">
                        <p className="upper">
                            { text }
                        </p>
                        <p className="lower">
                            { this.lowerMessage }
                        </p>
                        <p className="optMessage">{this.state.optMessage}</p>
                    </div>
                    { this.form }
                </div>
            </div>
        );

    }
}