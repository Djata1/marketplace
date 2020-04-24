import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    background-image: url("/images/sheepAddItem.jpg");
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;
const MarginDiv = styled.div`
  margin: 10px;
`;
const ImageForme = styled.div`
  position: relative;
  text-align: center;
  box-shadow: 0 50px 60px rgba(0, 0, 0, 0.2);
  padding: 40px;
  margin-top: 170px;
  border-radius: 0.5rem;

  background-color: white;
`;

const Text = styled(TextField)`
  size: 80px;
`;
let AddItems = () => {
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [images, setImages] = useState([]);

  const [name, setName] = useState("");
  const [type, setType] = useState("");

  const dispatch = useDispatch();
  const [inventory, setInventory] = useState(0);
  let priceHandler = (event) => {
    console.log(event.target.value);
    return setPrice(event.target.value);
  };
  let descriptionHandler = (event) => {
    console.log(event.target.value);
    return setDescription(event.target.value);
  };
  let locationHandler = (event) => {
    console.log(event.target.value);
    return setLocation(event.target.value);
  };
  let nameHandler = (event) => {
    console.log(event.target.value);
    return setName(event.target.value);
  };
  let typeHandler = (event) => {
    console.log(event.target.value);
    return setType(event.target.value);
  };

  let imageHandler = (event) => {
    console.log("Image event:", event.target.files);

    const files = [...event.target.files];
    return setImages(files);
  };
  let submitHandler = async (event) => {
    event.preventDefault();
    console.log("sumit form");
    let data = new FormData();
    data.append("price", price);
    data.append("description", description);
    data.append("location", location);
    data.append("name", name);
    data.append("type", type);
    images.forEach((image) => {
      data.append("image", image);
    });
    // data.append("image", image);
    let responseObject = await fetch("/item/add", {
      method: "POST",
      body: data,
      credentials: "include",
    });
    let responseBody = await responseObject.text();
    let parsed = JSON.parse(responseBody);
    if (parsed.success) {
      setPrice(0);
      setDescription("");
      setLocation("");
      setName("");
      setType("");
    }
  };
  return (
    <Wrapper>
      <GlobalStyle />

      <ImageForme>
        <h1>Sell</h1>
        <form onSubmit={submitHandler} noValidate autoComplete="off">
          <div>
            <MarginDiv>
              <Text
                id="outlined-full-width"
                variant="outlined"
                label="Description"
                type="text"
                value={description}
                onChange={descriptionHandler}
                size="small"
                fullWidth
              />
            </MarginDiv>
            <MarginDiv>
              <TextField
                fullWidth
                id="outlined-basic"
                variant="outlined"
                label="Location"
                type="text"
                value={location}
                onChange={locationHandler}
                size="small"
              />
            </MarginDiv>
            <MarginDiv>
              <TextField
                id="outlined-basic"
                variant="outlined"
                label="Price"
                value={price}
                type="text"
                onChange={priceHandler}
                size="small"
                fullWidth
              />
            </MarginDiv>
            <MarginDiv>
              <TextField
                id="outlined-basic"
                variant="outlined"
                label=""
                type="file"
                size="small"
                onChange={imageHandler}
                fullWidth
                inputProps={{ multiple: true }}
              />
            </MarginDiv>

            <MarginDiv>
              <TextField
                id="outlined-basic"
                variant="outlined"
                label="Category"
                value={name}
                type="text"
                onChange={nameHandler}
                size="small"
                fullWidth
              />
            </MarginDiv>
            <MarginDiv>
              <TextField
                id="outlined-basic"
                variant="outlined"
                label="Type"
                value={type}
                type="text"
                onChange={typeHandler}
                size="small"
                fullWidth
              />
            </MarginDiv>
          </div>
          <div>
            <Button variant="contained" color="primary" type="submit">
              Add
            </Button>
          </div>
        </form>
      </ImageForme>
    </Wrapper>
  );
};
export default AddItems;
