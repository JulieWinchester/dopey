import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Media from 'react-bootstrap/Media';
import Row from 'react-bootstrap/Row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import data from './data.json';
import './App.css';

function CharacterPortrait(props) {
  console.log(props.img);
  return (
    <Col key={props.name} className="character-portrait-container" sm={4} xs={6}>
      <a href="#" onClick={props.onClick}>
        <Image src={props.img} className="character-portrait img-shadow" alt={props.name} />
      </a>
      <a href="#" onClick={props.onClick} className="character-portrait-name text-info">{props.name}</a>
    </Col>
  );
}

function shuffleArray(array) {
  const array2 = array.slice();
  let i = array2.length - 1;
  for (; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array2[i];
    array2[i] = array2[j];
    array2[j] = temp;
  }
  return array2;
}

function CharacterPortraitGrid(props) {
  let grid = props.characters.map((character, i) => {
    return (
      <CharacterPortrait key={character.name}
        name={character.name}
        img={character.img}
        onClick={(e) => props.onClick(i, e)}
      />
    );
  });

  return (
    <Row className="justify-content-center character-portrait-grid">
      {grid}
    </Row>
  );
}

function CharacterCard(props) {
  if (!props.character) {
    return null;
  }

  return (
    <Row className="justify-content-center media-container">
      <Col xs={11}>
      <Media className="">
            <Media.Body className="align-self-center">
              <h5>{props.character.name}</h5>
              <p>{props.character.desc}</p>
            </Media.Body>
            <Image
              className="align-self-center media-image"
              src={props.character.img}
              alt={props.character.name}
              rounded
            />
      </Media>
      </Col>
      <Col xs={0.5} className="icon-container">
      <FontAwesomeIcon icon={faTimes} size="lg" onClick={props.onClick} />
      </Col>
    </Row>
  );
}

function Session(props) {
  return (
    <div className="session">
      <Row className="justify-content-center">
        <h4>
          {props.session.name}
        </h4>
      </Row>
      <Row className="justify-content-center" noGutters>
        <p>
          {props.session.desc}
        </p>
      </Row>
    </div>
  );
}

function SessionsList(props) {
  let sessions = props.sessions.map((session, i) => {
    return (
      <Row key={i} className='justify-content-center'>
        <a className="text-info" href="#" onClick={(e) => props.onClick(i, e)}>{session.name}</a>
      </Row>
    );
  });

  return (
    <div>
      {sessions}
    </div>
  );
}

class SessionsPane extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: null,
    }
  }

  handleClick(i, e) {
    e.preventDefault();
    this.setState({
      current: i,
    });
  }

  handleReturnClick(e) {
    e.preventDefault();
    this.setState({
      current: null,
    });
  }

  render() {
    if (this.state.current === null) {
      return(
        <SessionsList 
          sessions={this.props.sessions}
          onClick={(i, e) => this.handleClick(i, e)} 
        />
      );  
    } else {
      return (
        <div>
          <a className="return-link" href="#" onClick={(e) => this.handleReturnClick(e)}>Return To List of Sessions</a>
          <Session session={this.props.sessions[this.state.current]} />
        </div>
      );
    }
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCharacter: null,
      characters: shuffleArray(data.characters),
      sessions: data.sessions,
      cover_img: data.cover_img,
    }
  }

  handleClick(i, e) {
    e.preventDefault();
    this.setState({
      currentCharacter: this.state.characters[i],
    });
  }

  handleCardCloseClick(e) {
    e.preventDefault();
    this.setState({
      currentCharacter: null,
    });
  }

  render() {
    return (
      <Container className="App">
        <Row className="justify-content-center App-header">
          <Image src={this.state.cover_img} className="App-logo img-shadow" alt="logo" fluid />
        </Row>
        <Row className="justify-content-center top-spacing" noGutters>
          <h2 className="title">
            Dragons of Phandelver
          </h2>
        </Row>
        <Row className="justify-content-center" noGutters>
          <h5 className="subtitle">
            A Mash-Up of Lost Mines of Phandelver and Dragon of Icespire Peak
          </h5>
        </Row>
        <Row className="justify-content-center top-spacing" noGutters>
          <p>
            The frontier town of Phandalin is plagued by dragons! Locals have spotted great scaly beasts silhouetted through the clouds, livestock have gone missing, and copses of trees bear great scars of broken branches. No one knows exactly how many of the creatures there are or exactly what they look like, but the diversity of descriptions suggest more than one of the terrors lurks above. The least cautious among the locals note the similarity between recent events and the swarms of dragons that ravaged the sword coast over a generation ago, only to be beaten back by resourceful folk heroes.
          </p>
        </Row>
        <Row className="justify-content-center" noGutters>
          <p>
            Beyond just the presence of the beasts, dragon panic has turned the already rough and tumble area even more chaotic. The merchant charter company overseeing mining in Phandalin has left town, creating peril and opportunity for both mundane prospectors and relic-hunters seeking after the region's arcane past. Mercenary goblins have been spotted in the forests, and lone travellers have been stalked by unexpected packs of ravenous hyenas. And more, who can say what nefarious forces are using the chaos to maneuver and scheme to achieve their dark ends? It is time again for capable individuals to rise to the challenge.
          </p>
        </Row>
        <Row className="justify-content-center middle-divider" noGutters></Row>


        <Row className="justify-content-center">
          <h4>
            Cast of Characters
          </h4>
        </Row>
        <CharacterPortraitGrid 
          characters={this.state.characters} 
          onClick={(i, e) => this.handleClick(i, e)}
        />
        <Row className="justify-content-center top-spacing bottom-spacing">
          <CharacterCard 
            character={this.state.currentCharacter} 
            onClick={(e) => this.handleCardCloseClick(e)} 
          />
        </Row>

        <Row className="justify-content-center middle-divider" noGutters></Row>

        <Row className="justify-content-center">
          <h4>
            Sessions
          </h4>
        </Row>

        <SessionsPane sessions={this.state.sessions} />

        <Row className="justify-content-center bottom-divider" noGutters></Row>
        <Row className="footer justify-content-center">
          <Col>
            <span>
              Julie Winchester
            </span>
          </Col>
          <Col>
            <span>
              julia.m.winchester@gmail.com
            </span>
          </Col>
        </Row>


      </Container>
    );
  }
}

// TODO: Add action for character pane close, deploy, export text to JSON

export default App;
