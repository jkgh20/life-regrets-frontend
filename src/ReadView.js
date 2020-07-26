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

function Button(props) {
  return (
    <button id="button" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

class ReadView extends React.Component {
  constructor(props) {
    super(props);

    this.queryDb = this.queryDb.bind(this);
    this.typeMessage = this.typeMessage.bind(this);

    this.state = {
      count: DEFAULT_COUNT,
      message: "",
      characterCount: 0
    }
  }

  queryDb(onFirstLoad) {
    this.setState({
      message: "Getting married to the wrong person. Now Im close to 40, no kids, mostly bald. No one wants to take a chance on me. I just spent a weekend hanging out with friends who have 6-10 year olds and I really think I've missed out. I wasted my time and her time. Time is the one thing you cant get back. Don't waste it on the wrong person."
    });
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

  typeMessage(message) {
    const options = {
    	strings: [message],
      typeSpeed: 1,
      backSpeed: 1,
      cursorChar: '_',
      onComplete: self => {
        self.cursor.remove()
      }
    };
    this.typed2 = new Typed(this.myMessage, options);
  }

  async componentDidMount() {
    this.queryDb(true);

    const options = {
    	strings: ['Regrets.^1300 We all have them.^500', 'Someone regrets...'],
      typeSpeed: 20,
      backSpeed: 10,
      onComplete: self => self.cursor.remove(),
      cursorChar: '_'
    };
    this.typed = new Typed(this.myElement, options);

    await sleep(4800);

    this.typeMessage(this.state.message)
  }

  componentWillUnmount() {
    this.typed.destroy();
  }

  render() {
    return (
      <div id="read">
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
        <div id="everything-else">
          <Button
            value="Read another"
            onClick={() => this.queryDb(false)}
          />
        </div>
      </div>
    );
  }
}

export default ReadView;
