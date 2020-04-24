import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
const Wrapper = styled.div`
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  display: grid;

  background-color: beige;
  /* background-color: white; */
`;
let Footer = (props) => {
  return (
    <Wrapper>
      <div>
        <h4>Address</h4>

        <div>djata.drabo@gmail.com</div>
      </div>
    </Wrapper>
  );
};
export default Footer;
