import React from 'react';

let numberOfRegrets = 100;

function App() {
  return (
    <div>
      <p>
        Someone regrets...
      </p>
      <p>
        This is my first regret.
      </p>
      <button type="button">Read Another</button>

      <br />
      <br />
      <br />

      <p>
        {numberOfRegrets} regrets and counting. What's yours?
      </p>
      <form action="">
        <textarea name="message" rows="10" cols="30"></textarea><br />
        <input type="submit" value="Send" />
      </form>

      <br />
      <br />
      <br />

      <footer>
        <a href="">About</a>
      </footer>
    </div>
  );
}

export default App;
