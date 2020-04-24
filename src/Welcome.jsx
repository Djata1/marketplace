import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import Slider from "./Slider.jsx";
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
`;

const ImageGrid = styled(Link)`
  margin: 10px;
  img {
    width: 100%;
    object-fit: cover;
    transition: 0.3s ease-in-out;
    &:hover {
      border-radius: 50%;
    }
  }
`;

const Span = styled.span`
  font-family: "Lato", Arial, Helvetica, "sans-serif";
  font-weight: bold;
  font-size: 35px;
  text-decoration: none;
  color: white;
`;
const images = [
  "/images/farm.jpg",
  "/images/peche.jpg",
  "/images/chicken.jpg",
  "/images/plant.jpg",

  "/images/fishers.jpg",
  "https://images.unsplash.com/photo-1564245598219-2edc822c0ba8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80",
];

let Welcome = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const changeCategory = (category) => {
    dispatch({ type: "categoryChange", category });
    history.push("/viewItems");
  };
  return (
    <div>
      <Slider images={images}>
        <Span>Welcome to your farm</Span>
      </Slider>
      <Wrapper>
        <ImageGrid onClick={() => changeCategory("Vegetables")}>
          <img src="https://images.unsplash.com/photo-1557844352-761f2565b576?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" />
        </ImageGrid>
        <ImageGrid onClick={() => changeCategory("Cheese")}>
          <img
            src="https://images.unsplash.com/photo-1464688934599-fc5108f8d1af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80
"
          />
        </ImageGrid>
        <ImageGrid onClick={() => changeCategory("Meat")}>
          <img src="https://images.unsplash.com/photo-1448907503123-67254d59ca4f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1349&q=80" />
        </ImageGrid>
        <ImageGrid onClick={() => changeCategory("Chicken")}>
          <img src="/images/chik.jpg" />
        </ImageGrid>
        <ImageGrid onClick={() => changeCategory("Fruits")}>
          <img src="/images/fruit.jpg" />
        </ImageGrid>
        <ImageGrid onClick={() => changeCategory("Fish")}>
          <img src="/images/fish.jpg" />
        </ImageGrid>
      </Wrapper>
    </div>
  );
};
export default Welcome;
{
  /* <NavDiv onClick={() => this.changeCategory("Fruits")}>
              FRUITS
            </NavDiv> */
}
