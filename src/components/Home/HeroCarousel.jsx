import React, { Component } from 'react';
import styled from 'styled-components';
import { RaisedButton } from './../commons/';
import FontAwesome from 'react-fontawesome';
import {
  Carousel,
  CarouselItem,
  CarouselIndicators,
  Container,
  Row,
  Col
} from 'reactstrap';

const items = [
  {
    positiom: '1',
    label: "Current Issue",
    title: "The Weight of a Petal: Ars Botanica",
    subtitle: "Edited by: Sita Reddy",
    description: "This is description about the Magazine, It must give the user a summary or an outline to what this issue focuses on.",
    imageSrc: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa1d%20text%20%7B%20fill%3A%23555%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa1d%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22285.921875%22%20y%3D%22218.3%22%3EFirst%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
    ctaText: "View This Issue"
  },
  {
    position: '2',
    label: "Archived Issue",
    title: "The History of South India",
    subtitle: "Edited by: Manmohan Singh",
    description: "This is description about the Magazine, It must give the user a summary or an outline to what this issue focuses on.",
    imageSrc: "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa20%20text%20%7B%20fill%3A%23444%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa20%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23666%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22247.3203125%22%20y%3D%22218.3%22%3ESecond%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E",
    ctaText: "Buy Now"
  }
];

const CarouselWrapper = styled.div`

  * {
    -webkit-transition: opacity 2s ease-in;
    -moz-transition: opacity 2s ease-in;
    -o-transition: opacity 2s ease-in;
    -ms-transition: opacity 2s ease-in;
    transition: opacity 2s ease-in;
  }

  .carousel-image {
    @media (min-width: ${props => props.theme['mobileBreakpoint']}) {
      width: 60%;
      float: right;
    }
  }

  #carouselInfoCol {
    padding-bottom: 150px;
  }

  .controls {
    position: absolute;
    bottom: 5%;
    display: flex;
    align-items: center;
  }

  span.fa {
    cursor: pointer;
  }

  .carousel-indicators {
    display: inline-flex;
    margin: 0;
    justify-content: unset;
    position: unset;
    right: unset;
    left: unset;
    bottom: unset;
    margin: 0px 10px;

    li {
      background-color: #cccccc;
      cursor: pointer;
      margin: 0px 5px;
    }
  }

  .carousel-indicators .active {
    background-color: black;
    opacity: unset;
  }

  .label {
    display: block;
    color: #000000;
    font-family: Lato;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .title {
    font-size: 26px;
    line-height: 26px;
    @media (min-width: 992px) {
      font-size: 42px;
      line-height: 42px;
    }
    color: #000000;
    font-family: "Cormorant Garamond Medium";
    font-weight: 500;
  }

  .subtitle {
    color: #3a3a3a;
    font-family: Lato;
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 1px;
  }

  .description {
    color: #000000;
    font-family: Lato;
    font-size: 16px;
    font-weight: 400;
    line-height: 23px;
  }

  .cta {
    position: absolute;
    bottom: 20%;
  }

`;

class HeroCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    const slides = items.map((item) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.position}
        >
          <Container fluid="true">
            <Row>
              <Col lg="7" className="order-lg-2 px-0">
                <img className="w-100" src={item.imageSrc} alt="" />
              </Col>
              <Col id="carouselInfoCol" lg="5">
                <span className="label my-3">{item.label}</span>
                <h1 className="title my-2">{item.title}</h1>
                <h3 className="subtitle mb-4">{item.subtitle}</h3>
                <p className="description">{item.description}</p>
                <RaisedButton className="cta">{item.ctaText}</RaisedButton>
                <div class="controls">
                  <FontAwesome className="icon" name='chevron-left' onClick={this.previous} />
                  <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                  <FontAwesome className="icon" name='chevron-right' onClick={this.next} />
                </div>
              </Col>
            </Row>
          </Container>
        </CarouselItem>
      );
    });

    return (
      <CarouselWrapper className="full-width-lg-below">
        <Carousel
          activeIndex={activeIndex}
          next={this.next}
          previous={this.previous}
          slide={false}
        >
          {slides}

        </Carousel>
      </CarouselWrapper>
    );
  }
}


export default HeroCarousel;