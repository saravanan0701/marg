import React, { useState } from "react";
import styled from 'styled-components';
import FlatButton from './FlatButton';
import FontAwesome from 'react-fontawesome';

const Wrapper = styled.div`
  width: 100%;
  #showToggle {
    margin-left: -35px;
    cursor: pointer;
    display: inline;
    font-size: 20px;
  }
`;

const PasswordInput = ({ value, onChange, onBlur, name }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Wrapper>
      <input
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        type={showPassword ? "text" : "password"}
      />
      {/* <FlatButton id="showToggle" onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? "HIDE" : "SHOW"}
      </FlatButton> */}
      <FontAwesome id="showToggle" name={`${showPassword ? 'eye-slash' : 'eye'}`} onClick={() => setShowPassword(!showPassword)} />
    </Wrapper>
  );
};

export default PasswordInput;
