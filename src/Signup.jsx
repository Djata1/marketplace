import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import AddFarm from "./AddFarm.jsx";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

const ButtonMargin = styled(Button)`
  position: absolute;

  margin: auto;
  && {
    margin: 22px;
  }
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const GlobalStyle = createGlobalStyle`
  body {
    object-fit:cover;
    background-image: url("/images/fraise.jpg");
  }
`;
const ImageForme = styled.div`
  padding: 40px;
  border-radius: 0.5rem;
  /* margin-left: 600px;
  margin-right: 500px; */
  margin-top: 100px;
  background-color: white;

  justify-content: center;
  align-items: center;
`;
let Signup = (props) => {
  const login = useSelector((state) => {
    return state.login;
  });
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");
  let usernameHandler = (event) => {
    console.log("username:", event.target.value);
    return setUsername(event.target.value);
  };
  let passewordHandler = (event) => {
    console.log("password:", event.target.value);
    return setPassword(event.target.value);
  };
  let typeHandler = (event) => {
    console.log("type:", event.target.value);
    return setType(event.target.value);
  };
  let submitHandler = async (event) => {
    console.log("submit function");
    event.preventDefault();
    let data = new FormData();
    data.append("username", username);
    data.append("password", password);
    data.append("type", type);
    let responseObject = await fetch("/signup", {
      method: "POST",
      body: data,
      credentials: "include",
    });
    let responseBody = await responseObject.text();
    let parsed = JSON.parse(responseBody);
    if (parsed.success) {
      console.log("success");
      cart: parsed.cart,
        dispatch({
          type: "login-success",
          content: parsed.username,
        });
    }
    props.history.push("/");
  };
  return (
    <div>
      <GlobalStyle />
      <Wrapper>
        <ImageForme>
          <h1>Signup</h1>
          <form onSubmit={submitHandler}>
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
                onChange={passewordHandler}
              />
            </div>

            <FormControl>
              <InputLabel htmlFor="age-native-required">Type</InputLabel>
              <Select
                native
                value={type}
                onChange={typeHandler}
                inputProps={{
                  id: "age-native-required",
                }}
              >
                <option value="" />
                <option value="buyer">buyer</option>
                <option value="farmer">farmer</option>
              </Select>
              {type === "farmer" && <AddFarm />}
            </FormControl>

            <div>
              <ButtonMargin variant="contained" color="primary" type="submit">
                Create an Account
              </ButtonMargin>
            </div>

            <div>
              <Link to="/login">Do you already have un compte? Login</Link>
            </div>
          </form>
        </ImageForme>
      </Wrapper>
    </div>
  );
};
export default withRouter(Signup);
