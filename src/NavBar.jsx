import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withRouter, Link } from "react-router-dom";
import ListItemText from "@material-ui/core/ListItemText";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import Search from "./Search.jsx";
import IconButton from "@material-ui/core/IconButton";
import styled, { css } from "styled-components";
import { connect } from "react-redux";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
const Logout = styled.div`
  text-decoration: none;
  border: none;
`;
const ItemType = styled.div`
  display: flex;
  justify-content: space-between;
  & > * {
    margin: 10px;
  }
`;

const NavLinkMenu = styled(Link)`
  & > img {
    max-width: 100px;
    max-height: 100px;
    margin-right: 20px;
  }
`;

const csswelcome = css`
  width: 100%;
  background-color: transparent;
  box-sizing: border-box;
`;

const Nav = styled.div`
  z-index: 1;
  position: fixed;
  width: 100%;
  box-sizing: border-box;
  background-color: rgb(255, 255, 255);

  margin-bottom: 8px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background-color: white;
  ${(props) => (props.overrid ? csswelcome : "")};
  ${(props) => (props.overridSignup ? csswelcome : "")};
`;
const NavRight = styled.div`
  display: flex;
  align-items: center;
  & > * {
    margin: 10px;
  }
  & > button {
    background: none;
    border: none;
    font-family: "Montserrat", sans-serif;
    border: none;
    font-size: 1rem;
    cursor: pointer;
  }
`;
const Span = styled.span`
  position: absolute;
  top: 2px;
  right: 30px;
  background: transparent;
  color: black;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const NavLink = styled(Link)`
  font-family: "Lato", Arial, Helvetica, "sans-serif";
  font-weight: bold;
  font-size: 15px;
  text-decoration: none;
  color: black;
`;
const NavLinka = styled.a`
  font-family: "Lato", Arial, Helvetica, "sans-serif";
  font-weight: bold;
  font-size: 15px;
  text-decoration: none;
  color: black;
`;
const NavDiv = styled.div`
  font-family: "Lato", Arial, Helvetica, "sans-serif";
  font-weight: bold;
  font-size: 15px;
  text-decoration: none;
  color: black;
  cursor: pointer;
`;
const NavLinkCart = styled(Link)`
  text-decoration: none;
  color: black;
  & > span {
    position: absolute;
    top: 30px;
    right: 80px;
    background: red;
    color: #fff;
    border-radius: 50%;
    width: 15px;
    height: 15px;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileMenuAnchorEl: null,
      MobileMenuAnchorEl: null,
    };
  }

  handleProfileMenuOpen = (event) => {
    this.setState({ profileMenuAnchorEl: event.currentTarget });
  };
  handleMobileileMenuOpen = (event) => {
    this.setState({ MobileMenuAnchorEl: event.currentTarget });
  };
  handleMobileMenuClose = () => {
    this.setState({ MobileMenuAnchorEl: null });
  };
  handleProfileMenuClose = () => {
    this.setState({ profileMenuAnchorEl: null });
  };

  componentDidMount() {
    this.loadCarts();
  }

  loadCart = async () => {
    console.log("cart function");
    let responseObject = await fetch("/cart/load");
    let responseBody = await responseObject.text();
    let dataParsed = JSON.parse(responseBody);

    if (dataParsed.success) {
      console.log("dataParsed.cart", dataParsed.cart);
      console.log("success success");
      this.props.dispatch({ type: "cart", content: dataParsed.cart });
    }
  };
  renderLogout = async () => {
    let responseObject = await fetch("/logout", { method: "POST" });
    let responseBody = await responseObject.text();
    let parsed = JSON.parse(responseBody);
    if (parsed.success) {
      this.props.dispatch({ type: "logout" });
    }
  };
  componentDidMount() {
    this.loadCart();
  }
  changeCategory = (category) => {
    this.props.dispatch({ type: "categoryChange", category });
    this.props.history.push("/viewItems");
  };
  render() {
    const isMenuOpen = Boolean(this.state.profileMenuAnchorEl);
    const menuId = "primary-search-account-menu";
    return (
      <Nav
        overrid={this.props.location.pathname === "/"}
        overridSignup={this.props.location.pathname === "/signup"}
        overridSell={this.props.location.pathname === "/sell"}
      >
        <div>
          <NavLinkMenu to="/">
            <img src="/images/logog.png" />
          </NavLinkMenu>
        </div>
        <ItemType>
          <div>
            <NavDiv onClick={() => this.changeCategory("Vegetables")}>
              VEGETABLES
            </NavDiv>
          </div>
          <div>
            <NavDiv onClick={() => this.changeCategory("Fruits")}>
              FRUITS
            </NavDiv>
          </div>
          <div>
            {" "}
            <NavDiv onClick={() => this.changeCategory("Cheese")}>
              CHEESE
            </NavDiv>
          </div>
          <div>
            <NavDiv onClick={() => this.changeCategory("Meat")}>MEAT</NavDiv>
          </div>
          <div>
            <NavDiv onClick={() => this.changeCategory("Fish")}>FISH</NavDiv>
          </div>
          <div>
            <NavDiv onClick={() => this.changeCategory("Chicken")}>
              CHICKEN
            </NavDiv>
          </div>
        </ItemType>
        <Search />
        <NavRight>
          <NavLinka href="/viewItems">MARKETPLACE</NavLinka>

          <NavLink to="/sell">SELL</NavLink>
          <NavLinkCart to="/cart">
            <img src="/images/cart.svg" />{" "}
            <span>
              {this.props.cart.reduce((acc, item) => {
                return acc + item.qty;
              }, 0)}
            </span>
          </NavLinkCart>
          <Span>
            {" "}
            {this.props.username ? <h2> {this.props.username}</h2> : ""}
          </Span>

          {console.log("this.props.usernamenmm", this.props.username)}
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={this.handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={this.state.profileMenuAnchorEl}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={isMenuOpen}
            onClose={this.handleProfileMenuClose}
          >
            <MenuItem onClick={this.handleProfileMenuClose}>
              <NavLink to="/signup">My Account</NavLink>
            </MenuItem>
            <MenuItem onClick={this.handleProfileMenuClose}>
              <Logout onClick={this.renderLogout}>Logout</Logout>
            </MenuItem>
          </Menu>
        </NavRight>
      </Nav>
    );
  }
}

let mapStateToProps = (state) => {
  console.log("state:", state);
  return {
    login: state.login,
    itemState: state.itemState,
    cart: state.cart,
    username: state.username,
  };
};
export default withRouter(connect(mapStateToProps)(NavBar));
