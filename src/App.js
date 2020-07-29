import './App.css';
import { FALLBACK_MESSAGES } from './Helper.js';
import About from './About';
import React from 'react';
import ReadView from './ReadView';
import WriteView from './WriteView';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.setNumberOfRegrets = this.setNumberOfRegrets.bind(this);
    this.setMessageFinished = this.setMessageFinished.bind(this);

    this.state = {
      numberOfRegrets: FALLBACK_MESSAGES.length,
      fMessageFinished: false,
      showModal: false
    };
  }

  setNumberOfRegrets(count) {
    this.setState({ numberOfRegrets: count });
  }

  setMessageFinished() {
    this.setState({ fMessageFinished: true });
  }

  render() {
    return (
      <div id="app-view">
        <ReadView
          numberOfRegrets={this.state.numberOfRegrets}
          setNumberOfRegrets={this.setNumberOfRegrets}

          fMessageFinished={this.state.fMessageFinished}
          setMessageFinished={this.setMessageFinished}
        />

        <WriteView
          numberOfRegrets={this.state.numberOfRegrets}
          setNumberOfRegrets={this.setNumberOfRegrets}

          fMessageFinished={this.state.fMessageFinished}
        />

        <div id="about" className={this.state.fMessageFinished ? "fmessage-fade-in" : "hidden"}>
          <span
            id="about-text"
            onClick={() => this.setState({ showModal: true })}
          >About</span>
        </div>

        <About
          show={this.state.showModal}
          onHide={() => this.setState({ showModal: false })}
        />
      </div>
    );
  }
}

export default App;
