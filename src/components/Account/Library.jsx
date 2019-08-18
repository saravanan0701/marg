import React from 'react';
import { replaceStaticUrl, getEditorName } from './../../utils/';
import { Container, Row, Col } from 'reactstrap';
import styled from 'styled-components';
import { RaisedButton } from './../commons/';

const CardContainer = styled.div`

  /* cursor: pointer; */

  & > div {
    @media (min-width: ${props => props.theme['mobileBreakpoint']}) {
      padding-left: 10px;
      padding-right: 10px;
    }
  }

  .name, .meta, .price {
    font-size: 12px;
    @media (min-width: ${props => props.theme['mobileBreakpoint']}) {
      font-size: ${props => props.theme['$font-size-xxs']};
    }
  }

  & > .name {
    color: #000000;
    font-weight: ${props => props.theme['$weight-bold']};
    letter-spacing: 0.66px;
    padding-top: 15px;
  }

  & > .meta {
    color: #000000;
    font-weight: ${props => props.theme['$weight-regular']};
    letter-spacing: 0.59px;
    display: flex;
    flex-direction: row;
    padding-top: 5px;
    padding-bottom: 5px;

    & > .spacer {
      margin: 0px 10px;
    }
  }

  & > .price {
    color: #000000;
    font-weight: ${props => props.theme['$weight-regular']};
  }
`;

const Library = ({ children, value, index, orders }) => {
  return (

    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
    >
      <Container>
        <Row>
          <Col xs="12" lg="10" className="mx-auto">
            <Row>
              {orders.map(({ lines, id: orderId }) => (
                lines.map(({ id: lineId, variant: { isDigital, product: { images, name, editors, attributes } = {} } = {}, thumbnail: { url } = {} }) => {
                  if (isDigital) {
                    const cardEditors = getEditorName(editors);
                    let year = "";
                    attributes.forEach((it) => {
                      if(it.attribute.slug == 'year') {
                        year = it.value.name
                      }
                    });
                    return (
                      <Col xs="6" lg="4" className="mb-5">
                        <CardContainer>
                          <img className="img-fluid w-100" src={replaceStaticUrl(images.length > 0 ? images[0].url : url)} />
                          <div className="name">{name}</div>
                          <div className="meta">
                            <div>{cardEditors}</div>
                            {
                              cardEditors && year &&
                              <div className="spacer">|</div>
                            }
                            <div>{year}</div>
                          </div>
                          <div className="col-3 p-0 text-right my-2">
                            {
                                <RaisedButton
                                  onClick={
                                    (e) => (
                                      window.open(`/reader/?order-id=${orderId}&line-id=${lineId}`, '_blank')
                                    )
                                  }
                                >
                                  Read
                                </RaisedButton>
                            }
                          </div>
                        </CardContainer>
                      </Col>
                    )
                  }
                })
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
      
    </div>
  )
}

export default Library;
