import React from 'react';
import styled from 'styled-components';

import {RaisedButton} from './commons/';
import emblem from "./../images/emblem.png";

const Wrapper = styled.div`
    & .embem {
        width: 50%;
        height: 50%;
    }
`;


export const NotFound = ({history: push}) => (
    <Wrapper className="container">
        <div className="row justify-content-center">
            <div className="col-12">
                <img className="emblem" src={emblem} />
            </div>
            <div className="col-12">Error 404</div>
            <div className="col-12">Sorry, this page was not found.</div>
            <RaisedButton  className="col-12" onClick={() => push("/")} >Home</RaisedButton>
        </div>
    </Wrapper>
)