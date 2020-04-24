import React, { useState, useEffect } from "react";
import { useSelect, useDispatch } from "react-redux";
import { Link, Route } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
const Content = styled(CardContent)`
  &&& {
    padding: 0px;
    padding-bottom: 0px;
  }
`;
const Image = styled.img`
  height: 250px;
  width: 100%;
  border-bottom: 1px solid blue;
  object-fit: cover;
  display: ${props => {
    return props.hid ? "none" : "block";
  }};
`;
const ImageContent = styled(Image)`
  object-fit: contain;
`;
const Span = styled.span`
  color: gold;
  font-size: 20px;
`;
const Description = styled.span`
  font-family: "Lato", Arial, Helvetica, "sans-serif";
  font-weight: bold;
  font-size: 20px;
  text-decoration: none;
  color: blue;
`;
const DescriptionWrapper = styled.div`
  margin-left: 10px;
`;
let Items = props => {
  const [loadImage, setLoadImage] = useState(false);
  if (!props.item) return null; // ou bien tu peux aussi return <div>Loading...</div> par exemple
  let rat = Math.floor(
    props.item.reviews.reduce((acc, review) => {
      return acc + Number(review.rating);
    }, 0) / props.item.reviews.length
  );
  const {
    _id,
    price,
    description,
    location,
    image,
    inventory,
    images
  } = props.item;

  return (
    <Card>
      <Content>
        <Link to={"/itemDetail/" + _id}>
          <Image
            hid={!loadImage}
            src={image || images[0]}
            onLoad={() => {
              setLoadImage(true);
            }}
          />
          {!loadImage && <ImageContent src="/images/tomato_loading.gif" />}
        </Link>
        <DescriptionWrapper>
          <Typography>
            <Description>{description}</Description>
          </Typography>
          {Array(5)
            .fill()
            .map((e, idx) => {
              return idx + 1 < rat ? <Span>★</Span> : "☆";
            })}
          <Typography>{inventory}</Typography>
          <Typography>
            <Description>{price} $</Description>
          </Typography>
        </DescriptionWrapper>
      </Content>
    </Card>
    // <div>
    //   <div>{price}</div>
    //   <div>{description}</div>
    //   <div>{location}</div>
    //   <div>
    //     <Link to={"/itemDetail/" + _id}>
    //       <img src={image} />
    //     </Link>
    //   </div>
    //   <div>{inventory}</div>

    //   <div></div>
    // </div>
  );
};
export default Items;
