import React, { useState } from 'react';
import styled from 'styled-components';
import { Container,Row,Modal, ModalHeader, ModalBody } from 'reactstrap';
import { RaisedButton, FlatButton } from './commons/';
import { Link } from 'react-router-dom';
import default_profile from './../images/default_profile.jpeg';

import Shyam from './../images/trustees/Shyam.jpg';
import Bahram from './../images/trustees/Bahram.jpg';
import Cyrus from './../images/trustees/Cyrus.jpg';
import Divya from './../images/trustees/Divya.jpg';
import Geeta from './../images/trustees/Geeta.jpg';
import Issat from './../images/trustees/Issat.jpg';
import Kapila from './../images/trustees/Kapila.jpg';

const Wrapper = styled.div`
`

const TrusteeWrapper = styled.div`


  div.content {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      width: 100%;
      justify-content: space-around;
    }
`;

const TrusteeDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  margin-bottom: 10px;

  & > div.img {
    & > img {
      width: 100%;
      object-fit: cover;
    }
  }

  & > .date {
    color: #3a3a3a;
    font-size: ${props => props.theme['$font-size-xxs']};
    font-weight: ${props => props.theme['$weight-regular']};
    letter-spacing: 0.59px;
    line-height: 23px;
    text-transform: uppercase;
  }

  & > .name {
    margin-top: 10px;
    font-size: ${props => props.theme['$font-size-xxs']};
    font-weight: ${props => props.theme['$weight-bold']};
    line-height: 23px;
  }

  & > .designation {
    color: #3a3a3a;
    font-size: ${props => props.theme['$font-size-xxs']};
    font-weight: ${props => props.theme['$weight-regular']};
    line-height: 23px;
  }
`;



const TRUSTEES = [
  {
    name: "Ishaat Hussain",
    image: Issat,
    designation: "Chairman",
    bio: 'He is a corporate veteran. He joined Tata Sons as Executive Director in 1999 and held key positions in other companies within the group. Prior to Tata Sons, he was Senior Vice President and Executive Director of Finance at Tata Steel for nearly a decade. For most of his tenure in Tata Sons, he was a member of Ratan Tata’s core team, contributing actively to a long period of rapid and sustained growth.  He is Fellow at the Institute of Chartered Accountants in England and Wales and Member of the Securities and Exchange Board of India committees on insider trading and primary capital markets. Till recently he was also a Trustee of India Foundation for the Arts.'
  },
  {
    name: "Shyam Benegal",
    image: Shyam,
    bio: 'He has made award-winning films, documentaries and TV series, notably a series on the history of India titled Bharat Ek Khoj and on the making of the Indian Constitution titled Samvidhaan. He runs a production company in Mumbai and was a Member of the Rajya Sabha, 2006‒12. The Government of India has conferred on him two of its most prestigious awards – Padma Shri in 1976 and Padma Bhushan 1991. He received the Indira Gandhi National Integration Award in 2004 and the Dadasaheb Phalke Award for Lifetime Achievement in 2005. In 2007, he was conferred a D. Litt from Jamia Millia University, New Delhi and in 2011 from the University of Calcutta.'
  },
  {
    name: "Divyabhanusinh Chavda",
    image: Divya,
    bio: 'He is the author of The End of a Trail: The Cheetah in India, The Story of Asia’s Lions and The Story of India’s Unicorns (the last two published by Marg). He is actively involved in conservation and was the president of WWF–India and Vice President of the Bombay Natural History Society. He is a member of the Species Survival Commission, Cat Specialist Group of World Conservation Union (IUCN). He was a member of the National Board for Wildlife from 2008 to 2013 and its Standing Committee. He had a long stint in the hospitality sector working with Indian Hotels Company Limited.'
  },
  {
    name: "Cyrus Guzder",
    image: Cyrus,
    bio: 'He is the Chairman and Managing Director of AFL Private Limited. He also serves as a Director on the Boards of the Great Eastern Shipping Company Limited and Mahindra Holidays Limited.  He was a Founder Director of The Indian Institute for Human Settlements and has also served on the boards of Air India Limited, Tata Infomedia Limited, Tata Honeywell Limited, Alfa Laval India Limited and BP (India) Limited. He has also served on the Local Advisory Board of Barclays Bank, India and was a member of the Reserve Bank of India’s Banking Codes and Standard Board of India. He is currently a Member of the Court of Governors of the Administrative Staff College and a Trustee of the Asiatic Society of Bombay.'
  },
  {
    name: "Geeta Kapur",
    image: Geeta,
    bio: 'She is a critic and curator. Her essays are extensively anthologized; her books include Contemporary Indian Artists (1978); When Was Modernism (2000); Critic’s Compass: Navigating Practice (forthcoming). A founder-editor, Journal of Arts & Ideas; editorial advisory, Third Text; trustee and editorial advisory, Marg. Curatorial projects: "Dispossession", Johannesburg Biennale (1995); "Century City", Tate Modern, London (co-curation, 2001); "subTerrain", House of World Cultures, Berlin (2003); "Aesthetic Bind", Chemould, Mumbai (2013-14). Jury: Biennales of Venice, Dakar, Sharjah. Member advisory board: Tate Research Centre (Asia); Asia Art Archive; Asian Art Council, Guggenheim. Visiting Fellowships: Institute of Advanced Study, Shimla; Clare Hall, University of Cambridge; Nehru Memorial  Museum and Library, Delhi. Awarded Padma Shri, 2009.'
  },
  {
    name: "Bahram Navroz Vakil",
    image: Bahram,
    bio: 'He is one of the founding partners of AZB & Partners and  one of India’s foremost finance lawyers. He has been on several government-constituted committees and played a lead role in drafting the Bankruptcy Code passed by Parliament. His key practice areas are Infrastructure and Project Finance, Joint Ventures and M&A. He supports Wishing Well, an organization that attempts to bridge the gap by matching volunteers, services and donations with the needs of NGOs. He is also a keen art collector.',
  },
  {
    name: "Kapila Vatsyayan",
    image: Kapila,
    bio: 'She is a distinguished scholar of Indian classical dance, art, architecture, and art history. She has been a Member of the Rajya Sabha and a bureaucrat and served as Founding Director of the Indira Gandhi National Centre for the Arts. She is also a Trustee of the India international Centre and Chairperson of the IIC-Asia Project.'
  }
];


const TrusteeDetails = ({name, bio, image, designation}) => {
  const [ isOpen, setIsOpen ] = useState(false);

  return (
    <TrusteeDetailsWrapper className="col-6 col-md-4 col-lg-3 my-4">
      <div className="img">
        <img src={image} />
      </div>
      {/*<div className="date">
        2011 - CURRENT
      </div>*/}
      <div className="name">
        {name}
      </div>
      {
        designation && <div className="designation">
          {designation}
        </div>
      }
      <FlatButton onClick={(e) => setIsOpen(!isOpen)}>Know More</FlatButton>
      <Modal isOpen={isOpen} style={{marginTop: 100}}>
        <ModalHeader toggle={() => setIsOpen(!isOpen)}>{name}</ModalHeader>
        <ModalBody>
          {bio}
        </ModalBody>
      </Modal>
    </TrusteeDetailsWrapper>
  );
}

const Trustee = ({name}) => (<TrusteeWrapper>
  <div>
    <div className="heading">{name}</div>
    <div className="row">
      {
        TRUSTEES.map((trustee) => (<TrusteeDetails {...trustee}></TrusteeDetails>))
      }
    </div>
  </div>    
</TrusteeWrapper>);



export const Trustees = props => (
  <Wrapper>
    <Container className="my-5">
        <Trustee name="Trustees">
        </Trustee>
    </Container>
  </Wrapper>
)