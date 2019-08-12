import React, { Component } from 'react'
import styled from 'styled-components';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { replaceStaticUrl } from './../../utils/';
import { RaisedButton } from './../commons/';


const Account = ({
  isLoading,
  orders,
}) => (
  <div>
    {
      isLoading &&
        <h3 key={0}>Loading, please wait</h3>
    }
    {
      !isLoading &&
        <div key={1}>
          <h3>Recent orders:</h3>
          <div>
            {
              orders.map(
                (
                  {
                    id: orderId,
                    total: {
                      net: {
                        amount,
                        currency
                      }
                    },
                    lines,
                  }
                ) => (
                  <ExpansionPanel key={orderId}>
                    <ExpansionPanelSummary>
                      <div className="row justify-content-between col-12">
                        <div>{orderId}</div>
                        <div>{currency}.{amount}</div>
                      </div>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      {
                        lines.map(
                          (
                            {
                              id: lineId,
                              productName,
                              isShippingRequired,
                              quantity,
                              thumbnail: {
                                url,
                              } = {},
                              unitPrice: {
                                net:{
                                  amount,
                                  currency
                                } = {}
                              } = {}
                            }
                          ) => (
                            <div className="row col-12">
                              <div className="col-1 p-0">
                                <img className="col-12 p-0" src={replaceStaticUrl(url)} />
                              </div>
                              <div className="col-11 row p-0 m-0">
                                <div className="col-9">
                                  <div>{productName}</div>
                                  <div>Qtry:&nbsp;&nbsp;{quantity}</div>
                                  <div>Price:&nbsp;&nbsp;{currency}&nbsp;{amount}</div>
                                </div>
                                <div className="col-3 p-0 text-right">
                                  {
                                    isShippingRequired &&
                                      <RaisedButton
                                        onClick={
                                          (e) => (
                                            window.location.href = `/reader/?order-id=${orderId}&line-id=${lineId}`
                                          )
                                        }
                                      >
                                        View Doc
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
);


export default Account;