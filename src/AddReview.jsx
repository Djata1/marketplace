import React, { useState } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const ButtonMargin = styled(Button)`
  && {
    margin: 22px;
  }
`;
let AddReview = (props) => {
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  let descriptionHandler = (event) => {
    console.log(event.target.value);
    return setDescription(event.target.value);
  };
  let ratingHandler = (event) => {
    console.log(event.target.value);
    return setRating(event.target.value);
  };

  let submitHandler = async (event) => {
    event.preventDefault();
    console.log("sumit form");
    let data = new FormData();
    data.append("itemId", props.itemId);
    data.append("description", description);
    data.append("rating", rating);

    let responseObject = await fetch("/review/add", {
      method: "POST",
      body: data,
      credentials: "include",
    });
    let responseBody = await responseObject.text();
    let parsed = JSON.parse(responseBody);
    if (parsed.success) {
      setDescription("");
      setRating(0);
    }
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <TextField
          id="standard-basic"
          label="Rating"
          type="text"
          value={rating}
          onChange={ratingHandler}
        />
        <div>
          <TextField
            id="standard-basic"
            label="Description"
            type="text"
            value={description}
            onChange={descriptionHandler}
          />
        </div>
        <div>
          <ButtonMargin variant="contained" color="primary" type="submit">
            Add Review
          </ButtonMargin>
        </div>
      </form>
    </div>
  );
};
export default AddReview;
