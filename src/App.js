import './App.css';
import axios from 'axios';
import React from 'react';
import Typed from 'typed.js';

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
    <button id="button" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.queryDb = this.queryDb.bind(this);
    this.writeToDb = this.writeToDb.bind(this);
    this.typeMessage = this.typeMessage.bind(this);
    this.state = {
      count: DEFAULT_COUNT,
      message: ""
    }
  }

  queryDb(onFirstLoad) {
    this.typeMessage("Getting married to the wrong person. Now Im close to 40, no kids, mostly bald. No one wants to take a chance on me. I just spent a weekend hanging out with friends who have 6-10 year olds and I really think I've missed out. I wasted my time and her time. Time is the one thing you cant get back. Don't waste it on the wrong person.")
    // axios.get(`${LAMBDA_URL}/read`)
    //   .then(response => {
    //     if (onFirstLoad) {
    //       this.setState({
    //         count: response.data.count
    //       });
    //     }
    //     this.setState({
    //       message: response.data.message
    //     });
    //     this.typeMessage(response.data.message)
    //   })
    //   .catch(error => {
    //     this.setState({
    //       message: DEFAULT_MESSAGES[Math.floor(Math.random() * DEFAULT_COUNT)]
    //     });
    //   });
  }

  writeToDb(inputMessage) {
    axios.post(`${LAMBDA_URL}/write`, {message: inputMessage})
      .catch(() => {})
      .then(() => {});
  }

  componentDidMount() {
    this.queryDb(true);

    const options = {
    	strings: ['Regrets.^1000 We all have them.^1000', 'Someone regrets...'],
      typeSpeed: 45,
      backSpeed: 15,
      onComplete: self => self.cursor.remove(),
      cursorChar: '_'
    };
    this.typed = new Typed(this.myElement, options);
  }

  componentWillUnmount() {
    this.typed.destroy();
  }

  typeMessage(message) {
    const options = {
    	strings: [message],
      typeSpeed: 5,
      backSpeed: 15,
      onComplete: self => self.cursor.remove(),
      cursorChar: '_'
    };
    this.typed2 = new Typed(this.myMessage, options);
  }

  render() {
    return (
      <div id="app">
        <div>
          <h1 id="read-header">
            <span
              ref={myElement => { this.myElement = myElement; }}
            />
          </h1>
          <p id="read-message">
            <span
              ref={myMessage => { this.myMessage = myMessage; }}
            />
          </p>
        </div>
        <div id="everything-else">
          <Button
            value="Read another"
            onClick={() => this.queryDb(false)}
          />

          <div id="write">
            <h1>
              {this.state.count} regrets and counting... What's yours?
            </h1>
            <textarea name="message" rows="10" cols="30"></textarea><br />
            <Button
              value="Send"
              onClick={() => this.writeToDb("My life.")}
              />
          </div>

          <div id="footer">
            About
          </div>
        </div>
      </div>
    );
  }
}

export default App;
