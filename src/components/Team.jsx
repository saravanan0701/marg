import React, {useState} from 'react';
import styled from 'styled-components';
import {Container, Row, Col, Modal, ModalHeader, ModalBody} from 'reactstrap';

import {RaisedButton, FlatButton} from './commons/';
import {Link} from 'react-router-dom';

import anand from './../images/anand.png';
import Rizio from './../images/RIZIO 20190731_161734-04.jpg';
import Jain from './../images/J Jain 20190731_161734-04.jpg';
import Ahuja from './../images/N Ahuja 20190731_161734-04.jpg';
import Latika from './../images/LATIKA 20190731_161734-04.jpg';
// import Jyotsna from './../images/';
import Gautam from './../images/GAUTAM 20190731_161734-04.jpg';
import Suvarna from './../images/SUVARNA 20190731_161734-04.jpg';
import Almitra from './../images/ALMITRA 20190731_161734-04.jpg';
import Anjana from './../images/ANJANA 20190731_161734-04.jpg';
import Asha from './../images/ASHA 20190731_161734-04.jpg';
import Baptist from './../images/BAPTIST 20190731_161734-04.jpg';
import Chetan from './../images/CHETAN 20190731_161734-04.jpg';
import Mary from './../images/MARY 20190731_161734-04.jpg';
import Mrinalini from './../images/MRINALINI 20190731_161734-04.jpg';
import Naju from './../images/NAJU 20190731_161734-04.jpg';
import Neeta from './../images/NEETA 20190731_161734-04.jpg';
import Ravi from './../images/RAVI 20190731_161734-04.jpg';
import Sada from './../images/SADA 20190731_161734-04.jpg';
import Shyla from './../images/SHYLA 20190731_161734-04.jpg';
import Usha from './../images/USHA 20190731_161734-04.jpg';

import Rivka from './../images/RIVKA 20190731_161734-04.jpg';
import Rohinton from './../images/ROHINTON 20190731_161734-04.jpg';
import Savita from './../images/SAVITA 20190731_161734-04.jpg';


import default_profile from './../images/default_profile.jpeg';

const Wrapper = styled.div`  

  div.header {
    font-family: ${props => props.theme['$font-secondary-medium']};
    font-size: ${props => props.theme['$font-size-lg']};
    font-weight: ${props => props.theme['$weight-regular']};
    letter-spacing: 1px;
    line-height: 57px;
    padding: 100px 0px 60px;
    text-align: center;
  }

  div.img-container {
    width: 50%;
    display: flex;
    flex-direction: row-reverse;
    padding-right: 40px;
  
    img {
      object-fit: contain;
      object-position: right;
    }
  }

  div.meta {
    padding-top: 30px;

    div.sub-info {
      color: ${props => props.theme.secondaryColor};
      font-size: ${props => props.theme['$font-size-xxs']};
      font-weight: ${props => props.theme['$weight-regular']};
      letter-spacing: 0.59px;
      line-height: 23px;
    }

    div.name {
      font-size: ${props => props.theme['$font-size-xs']};
      font-weight: ${props => props.theme['$weight-bold']};
      letter-spacing: 0.66px;
      line-height: 23px;
    }

    div.description {
      font-size: ${props => props.theme['$font-size-xxs']};
      font-weight: ${props => props.theme['$weight-regular']};
      letter-spacing: 0.59px;
      line-height: 23px;
      padding-top: 20px;
    }
  }

`;

const PersonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;

  img {
    width: 100%;
    object-fit: cover;
    height: 275px;
  }
  
  @media (min-width: 768px) {
    img {
      height: 375px;
    }
  }

  .sub-info {
    letter-spacing: 0.59px;
    line-height: 23px;
    text-transform: uppercase;
    font-size: ${props => props.theme['$font-size-xxs']};
    font-weight: ${props => props.theme['$weight-regular']};
  }

  .name {
    font-size: ${props => props.theme['$font-size-xs']};
    font-weight: ${props => props.theme['$weight-bold']};
    letter-spacing: 0.66px;
    line-height: 23px;
  }
`;


const DIRECTORS = [
    {
        name: "RIZIO B. YOHANNAN",
        designation: "CEO",
        image: Rizio,
        bio: "She is a writer, educationist, translator and governance thinker whose broad professional experience spans two decades of work in journalism, book publishing, academics and institution-building. She is currently Chief Executive Officer at The Marg Foundation, Mumbai, and Founder and Patron of LILA Foundation for Translocal Initiatives. She was earlier affiliated to the Malayala Manorama Group, Macmillan India, Navneet Publications, and Katha, and the Universities of Madras, Mumbai, and Kerala; and Shiv Nadar University. She has published collections of poetry, novels, critical and edited volumes, research papers and translations with reputed publishers, journals and magazines across the world."
    },
    {
        name: "JYOTINDRA JAIN",
        designation: "EDITOR",
        image: Jain,
        bio: "Formerly Director of the National Crafts Museum; Professor at the School of Arts & Aesthetics, Jawaharlal Nehru University; and Member Secretary of the Indira Gandhi National Centre for the Arts, all New Delhi, was a Visiting Professor at Harvard University and a Rudolf-Arnheim Professor at Humboldt University, Berlin. An eminent scholar and curator, his major publications include: Tradition and Expression in Mithila Painting (1996); Other Masters: Five Contemporary Folk and Tribal Artists of India (1998); Picture Showmen: Insights into the Narrative Tradition in Indian Art (1998); Kalighat Painting: Images from a Changing World (1999); Indian Popular Culture: “The Conquest of the World as Picture” (2004), and  Francesco Clemente: Made in India (2005). He was a recipient of the 1998 Prince Claus Award for Culture and presently is a Member of the International Advisory Board of the Humboldt-Forum, Berlin."
    },
    {
        name: "NAMAN P. AHUJA",
        designation: "EDITOR",
        image: Ahuja,
        bio: "He is Professor at Jawaharlal Nehru University, New Delhi and is a widely published authority on the history and aesthetics of Indian art and design. He has held curatorial charge of Indian sculpture at the British Museum apart from curating several exhibitions of both classical and modern Indian art in India and internationally. Previously, as Fellow at the Ashmolean Museum, Oxford, he authored a comprehensive catalogue of their ancient Indian collections and at Fellowships at the Getty Institute he has explored the multicultural nature of the art of Gandhara. He is invited to speak at conferences and universities all over the world and has been a Visiting Professor at the University of Zurich, the Kunsthistorisches Institute in Florence, the University of Alberta in Edmonton and at SOAS, his alma mater."
    },
]

const EMPLOYEES = [
    {
        name: "Latika Gupta",
        designation: "Associate Editor",
        image: Latika
    },
    {
        name: "Mrinalini Vasudevan",
        designation: "Assistant Editor",
        image: Mrinalini
    },
    {
        name: "Naju Hirani",
        designation: "Designer",
        image: Naju
    },
    {
        name: "Gautam V. Jadhav",
        designation: "Production Manager",
        image: Gautam
    },
    {
        name: "Chetan S. More",
        designation: "Design & Production Executive",
        image: Chetan
    },
    {
        name: "Usha V. Shenoy",
        designation: "Head of Accounts & Support Services",
        image: Usha
    },
    {
        name: "Neeta Suvarna",
        designation: "Core Operations Manager",
        image: Neeta
    },
    {
        name: "Almitra Billimoria",
        designation: "Head of Partnerships",
        image: Almitra
    },
    {
        name: "Baptist Sequeira",
        designation: "Head of Sales & Subscriptions",
        image: Baptist
    },
    {
        name: "Mary Abraham",
        designation: "Public Relationships & Communications Manager",
        image: Mary
    },
    {
        name: "Anjana Premchand",
        designation: "Brand Manager",
        image: Anjana
    },
    {
        name: "Sadanand I. Salian",
        designation: "Despatch Supervisor",
        image: Sada
    },
    {
        name: "Ravindra K. Shewale",
        designation: "Despatch & Administration Assistant",
        image: default_profile
    },
    {
        name: "Rukmayya Suvarna",
        designation: "Office Assistant",
        image: default_profile
    },
    {
        name: "Rohinton B. Anklesaria",
        designation: "Financial Consultant",
        image: Rohinton
    },
    {
        name: "Seby Thomas",
        designation: "Management Consultant",
        image: default_profile
    },
    {
        name: "Asha Shiralikar",
        designation: "Administrative Consultant",
        image: Asha
    },
    {
        name: "Savita Chandiramani",
        designation: "Strategic Planning Consultant",
        image: Savita
    },
    {
        name: "Rivka Israel",
        designation: "Text Editor",
        image: Rivka
    },
]








const PersonDetails = ({name, bio, designation, openBio, image}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (<PersonWrapper className="col-6 col-md-4 col-lg-3 my-4">
        <img className="img-fluid" src={image}/>
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


export const Team = props => (
    <Wrapper>
        <div className="container my-5">
            <h1 className="heading">Marg Team</h1>
            <Row className="content justify-content-center">
                <Col xs={12} md={4} className="img-container">
                    <img className="img-fluid" src={anand}/>
                </Col>
                <Col xs={12} md={4}>
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
                            Philosopher, litterateur, and social activist, he was the Founder Editor of Marg. An avowed
                            nationalist and modernist, under his leadership, for over 30 years, Marg undertook the
                            massive task of identifying, cataloguing, and publicizing the nation’s heritage in the
                            built, visual, and performing arts, seeking to engender public debates about museums,
                            monuments, urban planning, art education and questions of heritage.
                        </div>
                    </div>
                </Col>
            </Row>
            <Row className="justify-content-center my-5">
                {
                    DIRECTORS.map((director) => (<PersonDetails {...director} openBio={true}/>))
                }
            </Row>
            <Row className="justify-content-center">
                {
                    EMPLOYEES.map((employee) => (<PersonDetails {...employee} />))
                }
            </Row>
        </div>

    </Wrapper>
)