import './App.css';
import { FALLBACK_MESSAGES } from './Helper.js';
import React from 'react';
import Footer from './Footer';
import ReadView from './ReadView';
import WriteView from './WriteView';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.setNumberOfRegrets = this.setNumberOfRegrets.bind(this);
    this.setMessageFinished = this.setMessageFinished.bind(this);

    this.state = {
      numberOfRegrets: FALLBACK_MESSAGES.length,
      fMessageFinished: false
    };
  }

  setNumberOfRegrets(count) {
    this.setState({
      numberOfRegrets: count
    });
  }

  setMessageFinished() {
    this.setState({
      fMessageFinished: true
    });
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

        <Footer
          fMessageFinished={this.state.fMessageFinished}
        />
      </div>
    );
  }
}

export default App;
