import './App.css';
import axios from 'axios';
import React from 'react';

let LAMBDA_URL = "https://m8o1q7cin4.execute-api.us-east-2.amazonaws.com/prod";
let CHARACTER_LIMIT = 500;

class WriteView extends React.Component {
  constructor(props) {
    super(props);

    this.writeToDb = this.writeToDb.bind(this);
    this.updateCharacterCount = this.updateCharacterCount.bind(this);

    this.state = {
      characterCount: 0
    }
  }

  updateCharacterCount(event) {
    let input = event.target.value;
    this.setState({
      characterCount: input.length
    })
  }

  writeToDb(inputMessage) {
    axios.post(`${LAMBDA_URL}/write`, {message: inputMessage})
      .catch(() => {})
      .then(() => {});
  }

  render() {
    return (
      <div id="write">
        <h1>
            <span>
            {this.state.count} regrets and counting... What's yours?
            </span>
        </h1>
        <textarea
            name="message"
            rows="10"
            cols="30"
            onChange={this.updateCharacterCount}
            maxLength={CHARACTER_LIMIT}
        />
        <p>
            {this.state.characterCount}/{CHARACTER_LIMIT} characters
        </p>
        {/* <Button
            value="Send"
            onClick={() => this.writeToDb("My life.")}
            /> */}
      </div>
    );
  }
}

export default WriteView;