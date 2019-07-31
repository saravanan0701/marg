import React, { useState } from 'react';
import styled from 'styled-components';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

import { RaisedButton, FlatButton } from './commons/';
import { Link } from 'react-router-dom';
import anand from './../images/anand.png';
import default_profile from './../images/default_profile.jpeg';

const Wrapper = styled.div`

  display: flex;
  flex-direction: column;
  padding: 0px 150px;

  & > div.hero-content {

    & > div.header {
      font-family: "Cormorant Garamond Medium";
      font-size: ${props => props.theme['$font-size-lg']};
      font-weight: ${props => props.theme['$weight-regular']};
      letter-spacing: 1px;
      line-height: 57px;
      padding: 100px 0px 60px;
      text-align: center;
    }

    & > div.content {
      display: flex;
      flex-direction: row;
      align-items: center;

      & > div.img-container {
        width: 50%;
        display: flex;
        flex-direction: row-reverse;
        padding-right: 40px;

        & > img {
          object-fit: contain;
          object-position: right;
        }
      }

      & > div.meta {
        width: 40%;
        display: flex;
        flex-direction: column;
        padding-top: 30px;

        & > div.sub-info {
          color: ${props => props.theme.secondaryColor};
          font-size: ${props => props.theme['$font-size-xxs']};
          font-weight: ${props => props.theme['$weight-regular']};
          letter-spacing: 0.59px;
          line-height: 23px;
        }

        & > div.name {
          font-size: ${props => props.theme['$font-size-xs']};
          font-weight: ${props => props.theme['$weight-bold']};
          letter-spacing: 0.66px;
          line-height: 23px;
        }

        & > div.description {
          font-size: ${props => props.theme['$font-size-xxs']};
          font-weight: ${props => props.theme['$weight-regular']};
          letter-spacing: 0.59px;
          line-height: 23px;
          padding-top: 20px;
        }
      }
    }

    & > .row-3 {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding-top: 90px;


      & > div {
        width: 30%;
      }
    }
  }

  & > .row-4 {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-top: 90px;
    padding-bottom: 200px;
    flex-wrap: wrap;


    & > div {
      width: 24%;
    }
  }
`;

const PersonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;

  & > img {
    width: 100%;
  }

  & > .sub-info {
    letter-spacing: 0.59px;
    line-height: 23px;
    text-transform: uppercase;
    font-size: ${props => props.theme['$font-size-xxs']};
    font-weight: ${props => props.theme['$weight-regular']};
  }

  & > .name {
    font-size: ${props => props.theme['$font-size-xs']};
    font-weight: ${props => props.theme['$weight-bold']};
    letter-spacing: 0.66px;
    line-height: 23px;
  }
`;

const PersonDetails = ({name, bio, designation, openBio}) => {
  const [ isOpen, setIsOpen ] = useState(false);

  return (<PersonWrapper className="my-4 px-2">
    <img src={default_profile} />
    {/*<div className="sub-info">
      1046 - Current
    </div>*/}
    <div className="name mt-2">
      {name}
    </div>
    <div className="sub-info">
      {designation}
    </div>
    {
      openBio &&
        <FlatButton onClick={(e) => setIsOpen(!isOpen)}>Know More</FlatButton>
    }
    <Modal isOpen={isOpen} style={{marginTop: 100}}>
      <ModalHeader toggle={() => setIsOpen(!isOpen)}>
        <div>{name}</div>
        <p className="mb-0" style={{fontSize: 16}}>{designation}</p>
      </ModalHeader>
      <ModalBody>
        {bio}
      </ModalBody>
    </Modal>
  </PersonWrapper>);
}

const DIRECTORS = [
  {
    name: "RIZIO B. YOHANNAN",
    designation: "CEO",
    bio: "She is a writer, educationist, translator and governance thinker whose broad professional experience spans two decades of work in journalism, book publishing, academics and institution-building. She is currently Chief Executive Officer at The Marg Foundation, Mumbai, and Founder and Patron of LILA Foundation for Translocal Initiatives. She was earlier affiliated to the Malayala Manorama Group, Macmillan India, Navneet Publications, and Katha, and the Universities of Madras, Mumbai, and Kerala; and Shiv Nadar University. She has published collections of poetry, novels, critical and edited volumes, research papers and translations with reputed publishers, journals and magazines across the world."
  },
  {
    name: "JYOTINDRA JAIN",
    designation: "EDITOR",
    bio: "Formerly Director of the National Crafts Museum; Professor at the School of Arts & Aesthetics, Jawaharlal Nehru University; and Member Secretary of the Indira Gandhi National Centre for the Arts, all New Delhi, was a Visiting Professor at Harvard University and a Rudolf-Arnheim Professor at Humboldt University, Berlin. An eminent scholar and curator, his major publications include: Tradition and Expression in Mithila Painting (1996); Other Masters: Five Contemporary Folk and Tribal Artists of India (1998); Picture Showmen: Insights into the Narrative Tradition in Indian Art (1998); Kalighat Painting: Images from a Changing World (1999); Indian Popular Culture: “The Conquest of the World as Picture” (2004), and  Francesco Clemente: Made in India (2005). He was a recipient of the 1998 Prince Claus Award for Culture and presently is a Member of the International Advisory Board of the Humboldt-Forum, Berlin."
  },
  {
    name: "NAMAN P. AHUJA",
    designation: "EDITOR",
    bio: "He is Professor at Jawaharlal Nehru University, New Delhi and is a widely published authority on the history and aesthetics of Indian art and design. He has held curatorial charge of Indian sculpture at the British Museum apart from curating several exhibitions of both classical and modern Indian art in India and internationally. Previously, as Fellow at the Ashmolean Museum, Oxford, he authored a comprehensive catalogue of their ancient Indian collections and at Fellowships at the Getty Institute he has explored the multicultural nature of the art of Gandhara. He is invited to speak at conferences and universities all over the world and has been a Visiting Professor at the University of Zurich, the Kunsthistorisches Institute in Florence, the University of Alberta in Edmonton and at SOAS, his alma mater."
  },
]

const EMPLOYEES = [
  {
    name: "Latika Gupta",
    designation: "Associate Editor"
  },
  {
    name: "Jyotsna Nambiar",
    designation: "Assistant Editor"
  },
  {
    name: "Mrinalini Vasudevan",
    designation: "Assistant Editor"
  },
  {
    name: "Nisha S. Nair",
    designation: "Editorial Executive"
  },
  {
    name: "Rivka Israel",
    designation: "Text Editor (Consultant)"
  },
  {
    name: "Naju Hirani",
    designation: "Designer"
  },
  {
    name: "Gautam V. Jadhav",
    designation: "Senior Production Executive"
  },
  {
    name: "Chetan S. More",
    designation: "Production Executive"
  },
  {
    name: "Rohinton B. Anklesaria",
    designation: "Financial Consultant"
  },
  {
    name: "Usha V. Shenoy",
    designation: "Accounts Head"
  },
  {
    name: "Neeta Suvarna",
    designation: "Executive Accounts"
  },              
  {
    name: "Almitra Billimoria",
    designation: "Marketing & Sales Head"
  },              
  {
    name: "Baptist Sequeira",
    designation: "Senior Manager Marketing & Sales"
  },              
  {
    name: "Mary Abraham",
    designation: "Manager Marketing & Sales"
  },            
  {
    name: "Anjana Premchand",
    designation: "Manager Digital Marketing & Branding"
  },
  {
    name: "Asha Shiralikar",
    designation: "Administrative Consultant"
  },
  {
    name: "Shyla Serrao",
    designation: "Manager Administration &nCirculation"
  },              
  {
    name: "Sadanand I. Salian",
    designation: "Office Assistant"
  },
  {
    name: "Ravindra K. Shewale",
    designation: "Despatch Assistant"
  },
  {
    name: "Rukmayya Suvarna", 
    designation: "Despatch Assistant"
  },
]

export const Team = props => (
  <Wrapper>
    <div className="hero-content">
      <div className="header">
        Marg Team
      </div>
      <div className="content">
        <div className="img-container">
          <img src={anand} />
        </div>
        <div className="meta">
          <div className="sub-info">
            1905–2004
          </div>
          <div className="name">
            Mulk Raj Anand
          </div>
          <div className="sub-info">
            FOUNDER EDITOR
          </div>
          <div className="description">
            Philosopher, litterateur, and social activist, he was the Founder Editor of Marg. An avowed nationalist and modernist, under his leadership, for over 30 years, Marg undertook the massive task of identifying, cataloguing, and publicizing the nation’s heritage in the built, visual, and performing arts, seeking to engender public debates about museums, monuments, urban planning, art education and questions of heritage.
          </div>
        </div>
      </div>
      <div className="row-3">
        {
          DIRECTORS.map((director) => (<PersonDetails {...director} openBio={true} />))
        }
      </div>
    </div>
    <div className="row-4">
      {
        EMPLOYEES.map((employee) => (<PersonDetails {...employee} />))
      }
    </div>
  </Wrapper>
)