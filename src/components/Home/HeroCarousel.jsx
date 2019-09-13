import React, { Component } from "react";
import styled from "styled-components";
import { RaisedButton } from "./../commons/";
import FontAwesome from "react-fontawesome";
import Hero1 from "../../images/Hero_new.jpg";
import Hero2 from "../../images/Contemporary Hindu Temple LR.jpg";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselItem,
  CarouselIndicators,
  Container,
  Row,
  Col
} from "reactstrap";

const items = [
  {
    positiom: "1",
    label: "Current Issue",
    title: "Gandhara: A Confluence of Cultures",
    subtitle: "Edited by: Naman P. Ahuja",
    description:
      "This issue presents the latest finds from recent excavations and on advances in Gandhara Art  Studies and examines migrations from different periods — from Bronze Age to the movements of Ghaznavids and Mughals.",
    imageSrc: Hero1,
    ctaText: "View This Issue",
    ctaUrl: "/product/UHJvZHVjdDozMDQz",
    textColor: "#FFFFFF"
  },
  {
    position: "2",
    label: "QUARTERLY BOOK",
    title: "The Contemporary Hindu Temple: Fragments for a History",
    subtitle: "Edited by: Annapurna Garimella, Shriya Sridharan, A. Srivathsan",
    description:
      "This book presents the Hindu temple from the perspectives of institutions and individuals, including priests, building practitioners and worshippers, to consider what it means when the temple is no longer at the centre of Indic life.",
    imageSrc: Hero2,
    ctaText: "View This Book",
    ctaUrl: "/product/UHJvZHVjdDo1MjUy",
    textColor: "#000000"
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
    height: 100%;
    max-height: 616px !important;
    width: 100%;
    object-fit: cover;
    object-position: top;
  }

  #carouselInfoCol {
    padding-bottom: 150px;
    @media (min-width: 1200px) {
      min-height: 450px;
      position: absolute;
      top: 20%;
      max-width: 40%;
      left: 5%;
    }

    @media (max-width: 1200px) {
      color: black !important;
      padding: 1.5rem;
    }

  }

  .controls {
    display: inline-flex;
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
      border-radius: 100%;
      width: 10px;
      height: 10px;
    }
  }

  .carousel-indicators .active {
    background-color: black;
    opacity: unset;
  }

  .label {
    display: block;
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
    font-family: "Cormorant Garamond Medium";
    font-weight: 500;
    /* min-height: 126px; */
  }

  .subtitle {
    font-family: Lato;
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 1px;
  }

  .description {
    font-family: Lato;
    font-size: 16px;
    font-weight: 400;
    line-height: 23px;
    @media (min-width: ${props => props.theme["mobileBreakpoint"]}) {
      min-height: 92px;
    }
  }

  .cta {
    @media (min-width: 1200px) {
      position: absolute;
      bottom: 20%;
    }
    a {
      color: white;
    }
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
    const nextIndex =
      this.state.activeIndex === items.length - 1
        ? 0
        : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === 0
        ? items.length - 1
        : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    const slides = items.map(item => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.position}
        >
          <Container
            className="px-0 text-center"
            fluid="true"
            style={{
              position: "relative"
            }}
          >
            <img className="carousel-image" src={item.imageSrc} alt="" />
            <div
              id="carouselInfoCol"
              lg="5"
              className="text-left"
              style={{ color: item.textColor }}
            >
              <span className="label my-3">{item.label}</span>
              <h1 className="title my-2">{item.title}</h1>
              <h3 className="subtitle mb-4">{item.subtitle}</h3>
              <p className="description">{item.description}</p>
              <RaisedButton className="cta">
                <Link to={item.ctaUrl}>{item.ctaText}</Link>
              </RaisedButton>
            </div>
            <div class="controls mb-4 my-lg-4">
              <FontAwesome
                className="icon"
                name="chevron-left"
                onClick={this.previous}
              />
              <CarouselIndicators
                items={items}
                activeIndex={activeIndex}
                onClickHandler={this.goToIndex}
              />
              <FontAwesome
                className="icon"
                name="chevron-right"
                onClick={this.next}
              />
            </div>
          </Container>
        </CarouselItem>
      );
    });

    return (
      <CarouselWrapper className="full-width">
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
