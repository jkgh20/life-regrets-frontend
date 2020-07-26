import './App.css';
import axios from 'axios';
import React from 'react';

let LAMBDA_URL = "https://m8o1q7cin4.execute-api.us-east-2.amazonaws.com/prod";
let DEFAULT_MESSAGES = [
  "Not getting divorced sooner. Spent too much time being miserable.",
  "Not spending enough time with my son when he was younger.",
  "Spending too much time on side projects at the expense of spending time with my kids.",
  "Not pursuing mathematics when I was doing my cs degree in college.",
  "Holding back in life",
  "Not marrying my high school sweetheart.",
  "Having children. Decided it wasn't for me.",
  "Spending way too much time at work instead of investing it in myself.",
  "Not buying a thousand bitcoins when they were worth $3!",
  "Being born.",
];
let DEFAULT_COUNT = DEFAULT_MESSAGES.length;

function ReadRegret(props) {
  return (
    <div>
      {props.value}
    </div>
  );
}

function Button(props) {
  return (
    <button className="button" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.queryDb = this.queryDb.bind(this);
    this.writeToDb = this.writeToDb.bind(this);
    this.state = {
      count: DEFAULT_COUNT,
      message: ""
    }
  }

  queryDb(onFirstLoad) {
    axios.get(`${LAMBDA_URL}/read`)
      .then(response => {
        if (onFirstLoad) {
          this.setState({
            count: response.data.count
          });
        }
        this.setState({
          message: response.data.message
        });
      })
      .catch(error => {
        this.setState({
          message: DEFAULT_MESSAGES[Math.floor(Math.random() * DEFAULT_COUNT)]
        });
      });
  }

  writeToDb(inputMessage) {
    axios.post(`${LAMBDA_URL}/write`, {message: inputMessage})
      .catch(() => {})
      .then(() => {});
  }

  componentDidMount() {
    this.queryDb(true);
  }

  render() {
    return (
      <div class="app">
        <div class="read">
          <h1>
            Someone regrets...
          </h1>
          <ReadRegret
            value={this.state.message}
          />
          <Button
            value="Read another"
            onClick={() => this.queryDb(false)}
          />
        </div>

        <div class="write">
          <h1>
            {this.state.count} regrets and counting... What's yours?
          </h1>
          <textarea name="message" rows="10" cols="30"></textarea><br />
          <Button
            value="Send"
            onClick={() => this.writeToDb("My life.")}
          />
        </div>

        <footer id="footer">
          About
        </footer>
      </div>
    );
  }
}

export default App;
