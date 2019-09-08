import React from 'react';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { replaceStaticUrl } from './../../utils/';
import { RaisedButton } from './../commons/';

import { Container, Row, Col } from 'reactstrap';

const Orders = ({ value, index, isLoading, orders }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
    >

      <Container className="my-3">
        <Row>
          <Col xs="12" lg="10" className="mx-auto">
          <div>
      { isLoading && <h3 key={0}>Loading, please wait</h3> }
      {
      !isLoading &&
        <div key={1}>
          <div>
            {
              orders.map(
                (
                  {
                    id: orderId,
                    visibleOrderId,
                    currencyPreference,
                    totalUsd: {
                      net: {
                        localized: usdLocalized
                      }
                    },
                    totalInr: {
                      net: {
                        localized: inrLocalized,
                      }
                    },
                    created,
                    statusDisplay,
                    lines,
                  }
                ) => (
                  <ExpansionPanel key={orderId}>
                    <ExpansionPanelSummary>
                      <div className="row justify-content-between col-12">
                        <div>
                          <div>#{visibleOrderId}</div>
                          <div>{new Date(created).toDateString()}</div>
                        </div>
                        <div>{currencyPreference == "INR"? inrLocalized: usdLocalized}</div>
                      </div>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      {
                        lines.map(
                          (
                            {
                              id: lineId,
                              productName,
                              variant: {
                                isDigital = false,
                                product: {
                                  images,
                                } = {},
                              } = {},
                              quantity,
                              thumbnail: {
                                url,
                              } = {},
                              unitPriceUsd: {
                                net:{
                                  localized: unitLocalizedUsd
                                } = {}
                              } = {},
                              unitPriceInr: {
                                net:{
                                  localized: unitLocalizedInr
                                } = {}
                              } = {},
                            }
                          ) => (
                            <div className="row col-12">
                              <div className="col-1 p-0">
                                <img className="col-12 p-0" src={replaceStaticUrl(images && images.length > 0?images[0].url:'')} />
                              </div>
                              <div className="col-11 row p-0 m-0">
                                <div className="col-9">
                                  <div>{productName}</div>
                                  <div>Quantity:&nbsp;&nbsp;{quantity}</div>
                                  <div>Price:&nbsp;&nbsp;{currencyPreference === "INR"? unitLocalizedInr: unitLocalizedUsd}</div>
                                </div>
                                <div className="col-3 p-0 text-right">
                                  {
                                    isDigital &&
                                      <RaisedButton
                                        onClick={
                                          (e) => (
                                            window.location.href = `/reader/?order-id=${orderId}&line-id=${lineId}`
                                          )
                                        }
                                      >
                                        Read
                                      </RaisedButton>
                                  }
                                </div>
                              </div>
                            </div>
                          )
                        )
                      }
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                )
              )
            }
          </div>
        </div>
    }
  </div>
          </Col>
        </Row>
      </Container>

    </div>
  )
}

export default Orders;
