import './App.css';
import React from 'react';

import ReadView from './ReadView';
import WriteView from './WriteView';

class App extends React.Component {
  render() {
    return (
      <div id="app">
        <ReadView />

        <WriteView />

        <div id="footer">
          About
        </div>
      </div>
    );
  }
}

export default App;
