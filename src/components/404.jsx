import React from 'react';
import styled from 'styled-components';

import {RaisedButton} from './commons/';
import emblem from "./../images/emblem.png";

const Wrapper = styled.div`

    & .row {
        padding-top: 100px;
        padding-bottom: 100px;
    }

    & .embem {
        width: 50%;
        height: 50%;
    }

    & .header {
        font-size: 13px;
        font-weight: 700;
        letter-spacing: 1px;
        text-transform: uppercase;
    }

    & .text {
        font-family: "Cormorant Garamond Medium";
        font-size: 42px;
        font-weight: 500;
        letter-spacing: 1px;
        line-height: 57px;
    }

    & .button {
        margin-top: 30px;
    }
`;


export const NotFound = ({history: { push }}) => (
    <Wrapper className="container">
        <div className="row justify-content-center">
            <div className="col-12 text-center">
                <img className="emblem" src={emblem} />
            </div>
            <div className="col-12 text-center">
                <div className="header">
                    Error 404
                </div>
            </div>
            <div className="col-12 text-center">
                <div className="text">
                    Sorry, this page was not found.
                </div>
            </div>
            <div className="col-12 text-center">
                <RaisedButton className="button" onClick={() => push("/")} >Go to Home</RaisedButton>
            </div>
        </div>
    </Wrapper>
)