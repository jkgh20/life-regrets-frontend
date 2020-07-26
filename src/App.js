import './App.css';
import { DEFAULT_MESSAGES } from './Helper.js'
import React from 'react';
import ReadView from './ReadView';
import WriteView from './WriteView';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.setNumberOfRegrets = this.setNumberOfRegrets.bind(this);
    this.state = {
      numberOfRegrets: DEFAULT_MESSAGES.length
    }
  }

  setNumberOfRegrets(count) {
    this.setState({
      numberOfRegrets: count
    });
  }

  render() {
    return (
      <div id="app">
        <ReadView
          numberOfRegrets={this.state.numberOfRegrets}
          setNumberOfRegrets={this.setNumberOfRegrets}
        />

        <WriteView
          numberOfRegrets={this.state.numberOfRegrets}
          setNumberOfRegrets={this.setNumberOfRegrets}
        />

        <div id="footer">
          About
        </div>
      </div>
    );
  }
}

export default App;
