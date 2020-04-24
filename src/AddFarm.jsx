import React, { useState } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const ButtonMargin = styled(Button)`
  position: absolute;
  right: 50px;
  left: 50px;

  && {
    margin: 22px;
  }
`;
const Wrapper = styled.div`
  display: flex;
`;

const ImageForme = styled.div`
  display: grid;
  position: relative;
  padding: 0px;

  margin-left: 0px;
  margin-right: 0px;
  margin-top: 0px;
  background-color: white;

  justify-content: center;
  align-items: center;
`;
let AddFarm = () => {
  const initialState = { size: 0, description: "", location: "", image: "" };
  const [form, setForm] = useState(initialState);
  let sizeHandler = (event) => {
    console.log(event.target.value);
    return setForm({ ...form, size: event.target.value });
  };
  let descriptionHandler = (event) => {
    console.log(event.target.value);
    return setForm({ ...form, description: event.target.value });
  };
  let locationHandler = (event) => {
    console.log(event.target.value);
    return setForm({ ...form, location: event.target.value });
  };
  let imageHandler = (event) => {
    console.log("Image event");
    return setForm({ ...form, image: event.target.value });
  };
  let submitHandler = async (event) => {
    event.preventDefault();
    console.log("sumit form");
    let data = new FormData();
    data.append("size", form.size);
    data.append("description", form.description);
    data.append("location", form.location);
    data.append("image", form.image);
    let responseObject = await fetch("/farm/add", {
      method: "POST",
      body: data,
      credentials: "include",
    });
    let responseBody = await responseObject.text();
    let parsed = JSON.parse(responseBody);
    if (parsed.success) {
      setForm(initialState);
    }
  };
  return (
    <div>
      <Wrapper>
        <ImageForme>
          <h5>Farm information</h5>
          <form onSubmit={submitHandler}>
            <div>
              <TextField
                id="standard-basic"
                label="Description"
                type="text"
                value={form.description}
                onChange={descriptionHandler}
              />
              <div>
                <TextField
                  id="standard-basic"
                  label="Location"
                  type="text"
                  value={form.location}
                  onChange={locationHandler}
                />
              </div>
              <div>
                <TextField
                  id="standard-basic"
                  label="Size"
                  type="text"
                  value={form.size}
                  onChange={sizeHandler}
                />
              </div>
              <div>
                <TextField
                  id="standard-basic"
                  label="image"
                  type="file"
                  onChange={imageHandler}
                />
              </div>
            </div>

            <div>
              <ButtonMargin variant="contained" color="primary" type="submit">
                Add
              </ButtonMargin>
            </div>
          </form>
        </ImageForme>
      </Wrapper>
    </div>
  );
};
export default AddFarm;
