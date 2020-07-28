import React from 'react';

function About(props) {
  return (
    <div
      id="about"
      className={props.fMessageFinished ? "fmessage-fade-in" : "hidden"}
      onClick={() => {}}
    >About</div>
  );
}

export default About;
