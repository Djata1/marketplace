import React, { Component } from "react";
import Signup from "./Signup.jsx";
import { connect } from "react-redux";
import { Route, BrowserRouter } from "react-router-dom";
import Login from "./Login.jsx";
import AddItem from "./AddItem.jsx";
import Content from "./Content.jsx";
import ItemDetail from "./ItemDetail.jsx";
import Welcome from "./Welcome.jsx";
import Cart from "./Cart.jsx";
import NavBar from "./NavBar.jsx";
import Review from "./AddReview.jsx";
import Footer from "./Footer.jsx";
import styled from "styled-components";

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100vh;
`;
class App extends Component {
  renderAuthentify = (routerProps) => {
    const isSignup = routerProps.location.pathname === "/signup";
    return (
      <div>
        {isSignup ? (
          <Signup history={routerProps.history} />
        ) : (
          <Login history={routerProps.history} />
        )}
      </div>
    );
  };
  keepSession = async () => {
    let responseObject = await fetch("/session");
    let responseBody = await responseObject.text();
    let parsedBody = JSON.parse(responseBody);
    if (parsedBody.success) {
      this.props.dispatch({
        type: "login-success",
        content: parsedBody.username,
        cart: parsedBody.cart,
      });
    }
  };
  componentDidMount() {
    this.keepSession();
  }
  renderSelleHandler = () => {
    return <AddItem />;
  };
  renderItemDetail = (routerData) => {
    let itemId = routerData.match.params.itemId;
    console.log("itemId:", itemId);

    return <ItemDetail itemId={itemId} />;
  };
  renderAllItem = () => {
    return <Content />;
  };
  renderCartHandler = () => {
    return <Cart />;
  };
  renderWelcome = () => {
    return <Welcome />;
  };

  renderReview = (routerData) => {
    let itemId = routerData.match.params.itemId;
    console.log("itemId:", itemId);
    return <Review itemId={itemId} />;
  };
  renderItem = () => {
    return <Content />;
  };
  render() {
    return (
      <Wrapper>
        <BrowserRouter>
          <NavBar />
          <Route exact={true} path="/signup" render={this.renderAuthentify} />
          <Route exact={true} path="/login" render={this.renderAuthentify} />
          <Route exact={true} path="/AllItem" render={this.renderAllItem} />
          <Route
            exact={true}
            path="/itemDetail/:itemId"
            render={this.renderItemDetail}
          />
          <Route
            exact={true}
            path="/review/:itemId"
            render={this.renderReview}
          />
          <Route exact={true} path="/viewItems" render={this.renderAllItem} />

          <Route exact={true} path="/" render={this.renderWelcome} />
          <Route exact={true} path="/cart" render={this.renderCartHandler} />
          <Route exact={true} path="/sell" render={this.renderSelleHandler} />
          <Route
            exact={true}
            path="/sheeseItems"
            render={this.renderCheeseItems}
          />
          <Route
            exact={true}
            path="/chickenItems"
            render={this.renderChickenItems}
          />
          <Route exact={true} path="/fishItems" render={this.renderFishItems} />
          <Route exact={true} path="/meatItems" render={this.renderMeatItems} />

          <Route
            exact={true}
            path="/vegetableItems"
            render={this.renderVegetableItems}
          />
          <Route
            exact={true}
            path="/fruitItems"
            render={this.renderFruitItems}
          />
          <Footer />
        </BrowserRouter>
      </Wrapper>
    );
  }
}
let mapStateToProps = (state) => {
  console.log(state);
  return { login: state.login };
};
export default connect(mapStateToProps)(App);
