import './App.css';
import { LAMBDA_URL } from './Helper.js'
import axios from 'axios';
import React from 'react';

let CHARACTER_LIMIT = 500;

class WriteView extends React.Component {
  constructor(props) {
    super(props);

    this.updateMessageInput = this.updateMessageInput.bind(this);
    this.writeToDb = this.writeToDb.bind(this);

    this.state = {
      messageInput: ""
    }
  }

  updateMessageInput(event) {
    this.setState({
      messageInput: event.target.value,
    });
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
              {this.props.numberOfRegrets} regrets and counting... What's yours?
            </span>
        </h1>

        <textarea
          value={this.state.messageInput}
          rows="10"
          cols="70"
          onChange={this.updateMessageInput}
          maxLength={CHARACTER_LIMIT}
          placeholder="I regret..."
        />

        <p>
            {this.state.messageInput.length}/{CHARACTER_LIMIT} characters
        </p>
        <button
          onClick={() => this.writeToDb(this.state.messageInput)}
        >Send</button>
      </div>
    );
  }
}

export default WriteView;
