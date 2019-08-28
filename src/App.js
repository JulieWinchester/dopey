import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Media from 'react-bootstrap/Media';
import Row from 'react-bootstrap/Row';
import './App.css';

import cover from './images/cover.png';
import chappy from './images/characters/chappy.jpg';
import friendly from './images/characters/friendly.jpg';
import nyoma from './images/characters/nyoma.png';
import bounty from './images/characters/bounty.png';
import pandjet from './images/characters/pandjet.png';

function CharacterPortrait(props) {
  console.log('Called CP once');
  return (
    <Col key={props.name} className="character-portrait-container" sm={4} xs={6}>
      <a href="">
        <Image src={props.img} className="character-portrait img-shadow" alt={props.name} />
      </a>
      <a href="" className="character-portrait-name text-info">{props.name}</a>
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
  const grid = shuffleArray(props.characters).map((character) => {
    return (
      <CharacterPortrait key={character.name}
        name={character.name}
        img={character.img}
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
  return (
    <Media>
          <Media.Body>
            <h5>{props.character.name}</h5>
            <p>{props.character.desc}</p>
          </Media.Body>
          <img
            className="align-self-center media-image"
            src={props.character.img}
            alt={props.character.name}
          />
    </Media>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: [
        {
          name: "Chappy Quickstep",
          desc: "Level 2 Halfing Bard.",
          img: chappy
        },
        {
          name: "Friendly",
          desc: "Level 2 Firbolg Druid.",
          img: friendly
        },
        {
          name: "Nyoma Izarren",
          desc: "Level 2 Tiefling Warlock.",
          img: nyoma
        },
        {
          name: "Bounty of Nonsense",
          desc: "Level 2 Tabaxi Rogue.",
          img: bounty
        },
        {
          name: "Prexijandilin Pandjet",
          desc: "Level 2 Dragonborn Paladin.",
          img: pandjet
        },
      ]
    }
  }

  render() {
    return (
      <Container className="App">
        <Row className="justify-content-center App-header">
          <Image src={cover} className="App-logo img-shadow" alt="logo" fluid />
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
        <CharacterPortraitGrid characters={this.state.characters} />
        <CharacterCard character={this.state.characters[2]} />
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

// TODO: Set up state to reflect currently displayed character, then create an onclick handler to pass down to character portraits that when clicked changes that state, I think that should result in updated card?

export default App;
