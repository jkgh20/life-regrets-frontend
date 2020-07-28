import React from 'react';

function Footer(props) {
  return (
    <div
      id="footer"
      className={props.fMessageFinished ? "fmessage-fade-in" : "hidden"}
      onClick={() => {}}
    >About</div>
  );
}

export default Footer;
