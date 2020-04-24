import React, { useState, useRef } from "react";
import styled from "styled-components";
import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";

const Wrapper = styled.div`
  width: 100vw;
`;
const ImageDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  height: 400px;
  width: 100%;
  object-fit: cover;
`;
let Slider = (props) => {
  const [imageIndex] = useState(0);
  const imageIndexRef = useRef(imageIndex);
  imageIndexRef.current = imageIndex;

  return (
    <Wrapper>
      <Carousel autoPlay={7000} animationSpeed={6000} infinite>
        {props.images.map((url) => (
          <ImageDiv image={url}>{props.children}</ImageDiv>
        ))}
      </Carousel>
    </Wrapper>
  );
};
export default Slider;
