import './App.css';
import React from 'react';

import ReadView from './ReadView';
import WriteView from './WriteView';

const DEFAULT_MESSAGES = [
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
          defaultMessages={DEFAULT_MESSAGES}
          numberOfRegrets={this.state.numberOfRegrets}
          setNumberOfRegrets={this.setNumberOfRegrets}
        />

        <WriteView
          numberOfRegrets={this.state.numberOfRegrets}
        />

        <div id="footer">
          About
        </div>
      </div>
    );
  }
}

export default App;
