import './App.css';
import { sleep, LAMBDA_URL } from './Helper.js'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
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
      fadeType: "medium-fade-in"
    }
  }

  updateMessageInput(event) {
    this.setState({ messageInput: event.target.value, });
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
    this.setState({ fadeType: "quick-fade-out" });

    await sleep(500);

    this.props.setNumberOfRegrets(this.props.numberOfRegrets + 1);
    this.setState({ messageInput: "", fadeType: "quick-fade-in" });
  }

  render() {
    return (
      <div id="write-view" className={this.props.fMessageFinished ? this.state.fadeType : "hidden"}>
        <h1>
          <span>
            {this.props.numberOfRegrets} regrets and counting... What's yours?
          </span>
        </h1>

        <Form.Control
          as="textarea"
          id="write-message"
          value={this.state.messageInput}
          rows="7"
          onChange={this.updateMessageInput}
          maxLength={CHARACTER_LIMIT}
          placeholder="I regret..."
        />

        <div class="container">
          <p class="fixed">
            {this.state.messageInput.length}/{CHARACTER_LIMIT} characters
          </p>
          <div class="flex-item" style={{ "padding-top": "16px" }}>
            <Button
              class="flex-item"
              variant="secondary"
              size="sm"
              disabled={this.state.messageInput.length < 1}
              onClick={() => {
                this.writeToDb(this.state.messageInput);
                this.resetState();
              }}
            >Send</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default WriteView;
