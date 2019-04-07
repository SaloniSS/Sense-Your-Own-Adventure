import React from 'react';
import rnl2b from 'react-newline-to-break';

export class GameText extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            currNode : props.wholeData,
            input : ''
        };
    }

    handleChange = (event) => {
        this.setState({input: event.target.value});
    };

    checkInput = () => {
        console.log(this.state.currNode.right.data.name);
        if (this.state.input === this.state.currNode.right.data.name) {
            this.setState({
                currNode: this.state.currNode.right
            });
            this.nextPart();
        } else alert("not whoa");
        console.log("changed: " + this.state.currNode.right.data.name);
        //Else if >50% close to one word say “Did you mean to type (child keyword)? (Keyword) is spelled (). Please retype.”
        //Add incorrect Node’s data to an array
        //Else say “Input not recognized. Please enter either (list child keywords).”
    };

    nextPart() {

    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.checkInput();
    };


    render() {
        let text = this.state.currNode.data.story;
        text = rnl2b(text);

        return (
            <div className="container">
                <img className="image" src={process.env.PUBLIC_URL + "/images/beach.jpg"} />
                <div className="message-box">
                    <div className="message-text">
                        <p>
                            { text }
                        </p>
                    </div>
                    <form className="form" onSubmit={ this.handleSubmit }>
                        <input type="text" className="input" id="choice" onChange={this.handleChange.bind(this)} />
                        <input type="submit" className="submit" value="Enter" />
                    </form>
                </div>
            </div>
        );
    }
}