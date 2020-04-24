import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
const ButtonMargin = styled(Button)`
  && {
    margin: 22px;
  }
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 30%;
`;
const Sidebar = styled.div`
  & > img {
    object-fit: cover;
    width: 100%;
    height: 100vh;
  }
`;

const ImageForme = styled.div`
  display: grid;
  background-color: beige;
  justify-content: center;
  align-items: center;
`;
let Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  let usernameHandler = (event) => {
    console.log(event.target.value);
    return setUsername(event.target.value);
  };
  let passwordHandler = (event) => {
    console.log(event.target.value);
    return setPassword(event.target.value);
  };
  let submitHandler = async (event) => {
    console.log("in submit");
    event.preventDefault();
    let data = new FormData();
    data.append("username", username);
    data.append("password", password);
    let responseObject = await fetch("/login", {
      method: "POST",
      body: data,
      credentials: "include",
    });

    let responseBody = await responseObject.text();
    console.log(responseBody);
    let parsed = JSON.parse(responseBody);
    if (parsed.success) {
      console.log("success");
      dispatch({
        type: "login-success",
        content: parsed.username,
        cart: parsed.cart,
      });
    }
    props.history.push("/");
  };
  return (
    <Wrapper>
      <Sidebar>
        <img src="/images/ananas.jpg" />
      </Sidebar>

      <ImageForme>
        <form onSubmit={submitHandler}>
          <h2>Login</h2>
          <TextField
            id="standard-basic"
            label="Username"
            type="text"
            value={username}
            onChange={usernameHandler}
          />
          <div>
            <TextField
              id="standard-basic"
              label="Password"
              type="password"
              value={password}
              onChange={passwordHandler}
            />
          </div>

          <div>
            <ButtonMargin variant="contained" color="primary" type="submit">
              Connect
            </ButtonMargin>
          </div>
        </form>
      </ImageForme>
    </Wrapper>
  );
};
export default Login;
