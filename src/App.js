import React from 'react';
import SessionDescriptions from './SessionDescriptions.js';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Media from 'react-bootstrap/Media';
import Row from 'react-bootstrap/Row';
import ScrollableAnchor from 'react-scrollable-anchor'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import data from './data.json';
import './App.css';

function CharacterPortrait(props) {
  return (
    <Col key={props.name} className="character-portrait-container" sm={4} xs={6}>
      <a href="#card" onClick={props.onClick}>
        <Image src={props.img} className="character-portrait img-shadow" alt={props.name} />
      </a>
      <a href="#card" onClick={props.onClick} className="character-portrait-name text-info">{props.name}</a>
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
        img={character.imgpixel}
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
      <Row className="justify-content-center">
        <a className="return-link" href="#session" onClick={props.onClick}>Return To List of Sessions</a>
      </Row>
      <Row className="justify-content-center" noGutters>
        <SessionDescriptions session={props.session.number} />
      </Row>
    </div>
  );
}

function SessionsList(props) {
  let sessions = props.sessions.map((session, i) => {
    return (
      <Row key={i} className='justify-content-center'>
        <a className="text-info" href="#session" onClick={(e) => props.onClick(i, e)}>{session.name}</a>
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
    // e.preventDefault();
    this.setState({
      current: i,
    });
  }

  handleReturnClick(e) {
    // e.preventDefault();
    this.setState({
      current: null,
    });
  }

  render() {
    if (this.state.current === null) {
      return(
        <div>
          <Row className="justify-content-center">
            <h4>
              {this.props.title}
            </h4>
          </Row>
          <SessionsList 
            sessions={this.props.sessions}
            onClick={(i, e) => this.handleClick(i, e)} 
          />
        </div>
      );  
    } else {
      return (
        <div>
          <Session session={this.props.sessions[this.state.current]} onClick={(e) => this.handleReturnClick(e)}  />
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
      coverImg: data.coverImg,
      title: data.title,
      subtitle: data.subtitle,
      copy: data.copy,
      characterListTitle: data.characterListTitle,
      sessionsListTitle: data.sessionsListTitle,
      graveyardTitle: data.graveyardTitle,
      graveyard: data.graveyard,
      author: data.author,
      authorEmail: data.authorEmail,
      testVar: "",
    }
  }

  handleClick(i, e) {
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
        <img src={this.state.coverImg} className="App-logo img-shadow" alt="logo" />
        <Row className="justify-content-center top-spacing" noGutters>
          <h2 className="title">
            {this.state.title}
          </h2>
        </Row>
        <Row className="justify-content-center" noGutters>
          <h5 className="subtitle">
            {this.state.subtitle}
          </h5>
        </Row>
        <Row className="justify-content-center top-spacing" noGutters>
          <p dangerouslySetInnerHTML={{__html: this.state.copy}} />
        </Row>
        <Row className="justify-content-center middle-divider" noGutters></Row>

        <Row className="justify-content-center">
          <h4>
            {this.state.characterListTitle}
          </h4>
        </Row>
        <CharacterPortraitGrid 
          characters={this.state.characters} 
          onClick={(i, e) => this.handleClick(i, e)}
        />
        <ScrollableAnchor id={'card'}>
          <Row className="justify-content-center top-spacing bottom-spacing">
            <CharacterCard 
              character={this.state.currentCharacter} 
              onClick={(e) => this.handleCardCloseClick(e)} 
            />
          </Row>
        </ScrollableAnchor>

        <Row className="justify-content-center middle-divider" noGutters></Row>

        <Row className="justify-content-center">
          <h4>
            {this.state.graveyardTitle}
          </h4>
        </Row>
        <Row className="justify-content-center top-spacing" noGutters>
          <p dangerouslySetInnerHTML={{__html: this.state.graveyard[0]}} />
        </Row>
        <Row className="justify-content-center top-spacing" noGutters>
          <p dangerouslySetInnerHTML={{__html: this.state.graveyard[1]}} />
        </Row>
        <Row className="justify-content-center top-spacing" noGutters>
          <p dangerouslySetInnerHTML={{__html: this.state.graveyard[2]}} />
        </Row>

        <ScrollableAnchor id={'session'}>
          <Row className="justify-content-center middle-divider" noGutters></Row>
        </ScrollableAnchor>

        <SessionsPane sessions={this.state.sessions} title={this.state.sessionsListTitle} />

        <Row className="justify-content-center bottom-divider" noGutters></Row>
        <Row className="footer justify-content-center">
          <Col>
            <span>
              {this.state.author}
            </span>
          </Col>
          <Col>
            <span>
              {this.state.authorEmail}
            </span>
          </Col>
        </Row>  
      </Container>
    );
  }
}

export default App;
