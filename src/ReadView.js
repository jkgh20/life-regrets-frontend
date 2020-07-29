import './App.css';
import { sleep, FALLBACK_MESSAGES, LAMBDA_URL } from './Helper.js';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import React from 'react';
import Typed from 'typed.js';

class ReadView extends React.Component {
  constructor(props) {
    super(props);

    this.queryDb = this.queryDb.bind(this);
    this.setFallbackMessage = this.setFallbackMessage.bind(this);
    this.typeHeader = this.typeHeader.bind(this);
    this.typeMessage = this.typeMessage.bind(this);

    this.headerTyped = null;
    this.messageTyped = null;

    this.state = {
      requests: 0,
      message: "",
      messageFadeType: "hidden"
    };
  }

  queryDb(onFirstLoad) {
    // Each session can read at most 100 remote requests to prevent abuse
    if (this.state.requests < 100) {
      this.setState({ requests: this.state.requests + 1 });

      let data = {
        sender: window.location.href
      }
      axios.get(`${LAMBDA_URL}/read`, data)
      .then(response => {
        // TODO: Refactor and check on status code
        if (response.data.count === undefined || response.data.message === undefined) {
          this.setFallbackMessage();
        } else {
          let count = onFirstLoad ? response.data.count : this.props.numberOfRegrets;
          let retrievedMessage = response.data.message

          this.props.setNumberOfRegrets(count);
          this.setState({ message: retrievedMessage });
        }
      })
      .catch(() => {
        this.setFallbackMessage();
      });
    } else {
      this.setFallbackMessage();
    }
  }

  setFallbackMessage() {
    let randomMessage = FALLBACK_MESSAGES[Math.floor(Math.random() * FALLBACK_MESSAGES.length)];
    this.setState({ message: randomMessage });
  }

  typeHeader() {
    const options = {
      strings: ['Regrets.^1500 We all have them.^300', 'Someone regrets...'],
      typeSpeed: 20,
      backSpeed: 10,
      cursorChar: '_',
      onComplete: self => self.cursor.remove()
    };
    this.headerTyped = new Typed(this.headerText, options);
  }

  typeMessage() {
    if (this.messageTyped !== null) {
      this.messageTyped.destroy();
    }

    const options = {
      strings: [this.state.message],
      typeSpeed: 0,
      backSpeed: 0,
      cursorChar: '_',
      onComplete: self => {
        self.cursor.remove();
        this.props.setMessageFinished();
      }
    };
    this.messageTyped = new Typed(this.messageText, options);
  }

  async componentDidMount() {
    this.typeHeader();

    // Sleep for 2.5 seconds to prevent unnecessary queries on brief visits
    await sleep(2000);
    this.queryDb(true);

    // Fade in read message border
    await sleep(1200);
    this.setState({ messageFadeType: "slow-fade-in" });

    // Let header finish typing before typing random or queried message
    await sleep(1600);
    this.typeMessage();
  }

  componentWillUnmount() {
    this.headerTyped.destroy();
    this.messageTyped.destroy();
  }

  render() {
    return (
      <div id="read">
        <h1 id="header" className="slow-fade-in">
          <span ref={headerText => { this.headerText = headerText; }} />
        </h1>
        <div id="read-message" className={this.state.messageFadeType}>
          <span ref={messageText => { this.messageText = messageText; }} />
        </div>

        <div className="container">
          <div className="flex-right">
            <Button
              variant="secondary"
              size="sm"
              className={this.props.fMessageFinished ? "fmessage-fade-in" : "hidden"}
              onClick={() => {
                this.queryDb(false);
                this.typeMessage();
              }}
            >Read Another</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default ReadView;
