import './App.css';
import { LAMBDA_URL } from './Helper.js'
import axios from 'axios';
import React from 'react';

let CHARACTER_LIMIT = 500;

class WriteView extends React.Component {
  constructor(props) {
    super(props);

    this.updateCharacterCount = this.updateCharacterCount.bind(this);
    this.writeToDb = this.writeToDb.bind(this);

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
            {this.props.numberOfRegrets} regrets and counting... What's yours?
            </span>
        </h1>
        <textarea
            name="message"
            rows="10"
            cols="30"
            onChange={this.updateCharacterCount}
            maxLength={CHARACTER_LIMIT}
            placeholder="I regret..."
        />
        <p>
            {this.state.characterCount}/{CHARACTER_LIMIT} characters
        </p>
        <button
          onClick={() => this.writeToDb(this.state.message)}
        >Send</button>
      </div>
    );
  }
}

export default WriteView;
