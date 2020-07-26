import './App.css';
import { DEFAULT_MESSAGES, LAMBDA_URL } from './Helper.js'
import axios from 'axios';
import React from 'react';
import Typed from 'typed.js';

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

class ReadView extends React.Component {
  constructor(props) {
    super(props);

    this.queryDb = this.queryDb.bind(this);
    this.typeHeader = this.typeHeader.bind(this);
    this.typeMessage = this.typeMessage.bind(this);

    this.state = {
      message: ""
    }
  }

  queryDb(onFirstLoad) {
    if (1 === 1) {
      this.props.setNumberOfRegrets(21);
      this.setState({
        message: "Getting married to the wrong person. Now Im close to 40, no kids, mostly bald. No one wants to take a chance on me. I just spent a weekend hanging out with friends who have 6-10 year olds and I really think I've missed out. I wasted my time and her time. Time is the one thing you cant get back. Don't waste it on the wrong person."
      });
    } else {
      let count = this.props.numberOfRegrets;
      let randomMessage = DEFAULT_MESSAGES[Math.floor(Math.random() * count)]
      this.setState({
        message: randomMessage
      });
    }
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

  typeHeader() {
    const options = {
    	strings: ['Regrets.^1300 We all have them.^500', 'Someone regrets...'],
      typeSpeed: 20,
      backSpeed: 10,
      cursorChar: '_',
      onComplete: self => self.cursor.remove()
    };
    this.headerTyped = new Typed(this.headerText, options);
  }

  typeMessage(message) {
    const options = {
      strings: [message],
      typeSpeed: 1,
      backSpeed: 1,
      cursorChar: '_',
      onComplete: self => {
        // TODO: Show everything else after rendering the 1st message
        self.cursor.remove()
      }
    };
    this.messageTyped = new Typed(this.messageText, options);
  }

  async componentDidMount() {
    this.typeHeader();

    // Sleep for 2 seconds to prevent unnecessary queries on brief visits
    await sleep(2000);
    this.queryDb(true);

    // Let header finish typing before typing random or queried message
    await sleep(2800);
    this.typeMessage(this.state.message)
  }

  componentWillUnmount() {
    this.headerTyped.destroy();
    this.messageTyped.destroy();
  }

  render() {
    return (
      <div id="read">
        <h1 id="read-header">
          <span
            ref={headerText => { this.headerText = headerText; }}
          />
        </h1>
        <p id="read-message">
          <span
            // style={{ whiteSpace: 'pre' }}
            ref={messageText => { this.messageText = messageText; }}
          />
        </p>
        <button
          onClick={() => this.queryDb(false)}
        >Read Another</button>
      </div>
    );
  }
}

export default ReadView;
