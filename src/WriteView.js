import './App.css';
import { sleep, LAMBDA_URL } from './Helper.js';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import React from 'react';

let CHARACTER_LIMIT = 500;

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class WriteView extends React.Component {
  constructor(props) {
    super(props);

    this.updateMessageInput = this.updateMessageInput.bind(this);
    this.writeToDb = this.writeToDb.bind(this);
    this.resetState = this.resetState.bind(this);

    let formatted = numberWithCommas(this.props.numberOfRegrets)
    this.state = {
      requests: 0,
      headerText: `${formatted} regrets and counting... What's yours?`,
      messageInput: "",
      fadeType: "fmessage-fade-in"
    };
  }

  updateMessageInput(event) {
    this.setState({ messageInput: event.target.value, });
  }

  writeToDb(inputMessage) {
    // Who is going to sit down and write 50 regrets in a single session?
    if (this.state.requests > 50) {
      return;
    }
    this.setState({ requests: this.state.requests + 1 });

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

    axios.post(`${LAMBDA_URL}/write`, { message: trimmed })
      .catch(() => {});
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
        <h1 id="header">
          <span>
            {this.state.headerText}
          </span>
        </h1>

        <Form.Control
          as="textarea"
          rows="7"
          maxLength={CHARACTER_LIMIT}
          placeholder="I regret..."
          value={this.state.messageInput}
          id="write-message"
          onChange={this.updateMessageInput}
        />

        <div className="container">
          <div className="flex-left">
            {this.state.messageInput.length}/{CHARACTER_LIMIT} characters
          </div>
          <div className="flex-right">
            <Button
              className="flex-right"
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
