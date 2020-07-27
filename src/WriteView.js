import './App.css';
import { sleep, LAMBDA_URL } from './Helper.js'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import React from 'react';

let CHARACTER_LIMIT = 500;

class WriteView extends React.Component {
  constructor(props) {
    super(props);

    this.updateMessageInput = this.updateMessageInput.bind(this);
    this.writeToDb = this.writeToDb.bind(this);
    this.resetState = this.resetState.bind(this);

    this.state = {
      messageInput: "",
      visible: true
    }
  }

  updateMessageInput(event) {
    this.setState({
      messageInput: event.target.value,
    });
  }

  writeToDb(inputMessage) {
    let trimmed = inputMessage.trim();
    // Can you really say anything meaninful in less than 3 characters?
    if (trimmed.length < 3 || trimmed.length > 500) {
      return;
    }

    let split = trimmed.split(" ");
    // Your entry can't be comprised solely of words 3 characters or less.
    if (split.length > 125) {
      return;
    }

    // Your entry can't have a word longer than 50 characters.
    if (Math.max(...split.map(x => x.length)) > 50) {
      return;
    }

    axios.post(`${LAMBDA_URL}/write`, {message: trimmed})
      .catch(() => {})
      .then(() => {});
  }

  async resetState() {
    this.setState({
      visible: false
    });
    await sleep(400);
    this.props.setNumberOfRegrets(this.props.numberOfRegrets + 1);
    this.setState({
      messageInput: "",
      visible: true
    });
  }

  render() {
    return (
      <div id="write" className={this.state.visible ? 'fadeIn' : 'fadeOut'}>
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

        <Button
          variant="secondary"
          size="sm"
          disabled={this.state.messageInput.length < 1}
          onClick={() => {
            this.writeToDb(this.state.messageInput);
            this.resetState();
          }}
        >Send</Button>
      </div>
    );
  }
}

export default WriteView;
