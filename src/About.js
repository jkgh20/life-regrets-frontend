import Modal from 'react-bootstrap/Modal';
import React from 'react';

function About(props) {
  return (
    <Modal {...props} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          About
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        Marry, and you will regret it; don’t marry, you will also regret it; marry or don’t marry, you will regret it either way. Laugh at the world’s foolishness, you will regret it; weep over it, you will regret that too; laugh at the world’s foolishness or weep over it, you will regret both. Believe a woman, you will regret it; believe her not, you will also regret it… Hang yourself, you will regret it; do not hang yourself, and you will regret that too; hang yourself or don’t hang yourself, you’ll regret it either way; whether you hang yourself or do not hang yourself, you will regret both. This, gentlemen, is the essence of all philosophy.
      </Modal.Body>
    </Modal>
  );
}

export default About;
