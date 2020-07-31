import Modal from 'react-bootstrap/Modal';
import React from 'react';

function About(props) {
  return (
    <Modal {...props} size="md" className="about-modal">
      <Modal.Header>
        <Modal.Title className="col-12">
          About
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
Regrets are a funny thing. They often paint a picture of one's wants and desires
moreso than asking that person directly. As one might come to read, some are
whimsical while others show a deep longing for a reality that isn't.
<br />
<br />
Regrets often bring pain. Most of us have something we'd like to change about
our lives. Some wish they didn't have this life at all. I believe the gnawing
sense of having had and lost some infinite thing starts in adolescence, finds
its peaks during adulthood, and finally quiets down when we not only know but
deeply understand that life just <em>is</em>.
<br />
<br />
Chances are, you the reader are living along these peaks. The point of this
journal isn't to ruminate on these feelings, but rather to empathize, vent, let
go, and learn from each other. Truly learn to forgive yourself if you haven't
yet - you didn't know what you know now.
<br />
<br />
In my own journey, I myself have come to believe that my feelings of
regret stem not from my circumstances, but from who I am as a person - and I'm
incredibly lucky to be able to say that. I'm realizing that even if I were given
a chance to start over, I would STILL have regrets and want to do it over again.
Call this a personal moment of catharsis if you will.
<br />
<br />
I do hope you'll walk away with <em>something</em> after reading a couple of
these entries. Some of the biggest moments of clarity can come from the most
mundane moments. If you get the chance, call your family and give your ma a big
hug.
      </Modal.Body>
    </Modal>
  );
}

export default About;
