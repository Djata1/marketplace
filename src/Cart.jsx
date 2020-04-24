import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Checkout from "./Checkout.jsx";
const Center = styled.div`
  & > * {
    display: grid;
    justify-content: center;
    align-items: center;
  }
`;
const InputNumber = styled.input`
  position: relative;
  text-align: center;
  width: 56px;
  height: 38px;
  top: -4px;
  border: none;
  -moz-appearance: textfield;
  font-size: 16px;
`;
const ButtonDec = styled.button`
  min-height: 40px;
  text-shadow: none;
  position: relative;
  padding-left: 0px;
  padding-right: 0px;
  background-color: rgb(0, 114, 206);
  color: rgb(255, 255, 255);
  width: 56px;
  height: 40px;
  font-size: 1.772rem;
  padding-top: 0px;
  padding-bottom: 0px;
  font-weight: 100;
  border-radius: 21px 0px 0px 21px;
  border-width: initial;
  border-style: none;
  border-color: initial;
  border-image: initial;
`;
const NavLinka = styled.a`
  font-family: "Lato", Arial, Helvetica, "sans-serif";
  font-weight: bold;
  font-size: 15px;
  /* text-decoration: none; */
  color: blue;
  margin-top: 100px;
`;
const ButtonIncre = styled.button`
  min-height: 40px;
  border-style: solid;
  text-shadow: none;
  position: relative;
  width: 100%;
  padding-left: 0px;
  padding-right: 0px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 21px;
  border-width: 2px;
  font-size: 0.909rem;
  background-color: #0072ce;
  color: #fff;
  border-color: #0072ce;
  width: 56px;
  height: 40px;
  border: none;
  font-size: 1.772rem;
  padding-top: 0px;
  padding-bottom: 0px;
  font-weight: 100;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`;
let Cart = (props) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const history = useHistory();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    dispatch({ type: "empty-cart" });
    // history.push("/");
  };
  let dispatch = useDispatch();
  const cartState = useSelector((state) => {
    return state.cart;
  });
  console.log("cart", cartState);

  let loadCart = async () => {
    console.log("cart function");
    let responseObject = await fetch("/cart/load");
    let responseBody = await responseObject.text();
    let dataParsed = JSON.parse(responseBody);

    if (dataParsed.success) {
      console.log("dataParsed.cart", dataParsed.cart);
      console.log("success success");
      dispatch({ type: "cart", content: dataParsed.cart });
      setLoading(false);
    }
  };
  useEffect(() => {
    loadCart();
  }, []);
  let deleteItemHandler = async (item, idx) => {
    let data = new FormData();
    data.append("itemId", item._id);
    console.log("item._id", item);
    let responseObject = await fetch("/cart/delete", {
      method: "POST",
      body: data,
    });
    let body = await responseObject.text();
    console.log("body", body);
    let bodyParse = JSON.parse(body);
    if (bodyParse.success) {
      dispatch({ type: "delete-one", content: idx });
    }
  };

  let incrementQtyHandler = async (item, idx) => {
    let data = new FormData();
    data.append("itemId", item._id);
    console.log("item._id", item);
    let responseObject = await fetch("/cart/incrementQty", {
      method: "POST",
      body: data,
    });
    let body = await responseObject.text();
    console.log("body", body);
    let bodyParse = JSON.parse(body);
    if (bodyParse.success) {
      dispatch({ type: "cart-incQty", content: idx });
    }
  };
  let decrementQtyHandler = async (item, idx) => {
    let data = new FormData();
    data.append("itemId", item._id);
    console.log("item._id", item);
    let responseObject = await fetch("/cart/decrementQty", {
      method: "POST",
      body: data,
    });
    let body = await responseObject.text();
    console.log("body", body);
    let bodyParse = JSON.parse(body);
    if (bodyParse.success) {
      dispatch({ type: "cart-decQty", content: idx });
    }
  };
  let cartTotal = cartState.reduce((acc, item) => {
    return acc + Number(item.price) * item.qty;
  }, 0);
  return (
    <DivG>
      {cartState.length === 0 ? (
        <Center>
          <h1>Your cart is empty</h1>
          <div>
            <img src="/images/paniervide.png" />
          </div>
          <NavLinka href="/viewItems"> Continue shopping</NavLinka>
        </Center>
      ) : (
        <Wrapper>
          {!loading &&
            cartState.map((item, idx) => {
              return (
                <div>
                  <CartContent>
                    {/* <Items item={item} /> */}
                    <GridImage>
                      <img src={item.images[0]} />
                    </GridImage>
                    <GridDescrip>
                      <h3>{item.description}</h3>
                    </GridDescrip>
                    <GridQte>
                      <h4>Quantity : </h4>
                      <ButtonDec onClick={() => incrementQtyHandler(item, idx)}>
                        +
                      </ButtonDec>
                      <InputNumber type="text" size="2" value={item.qty} />
                      <ButtonIncre
                        onClick={() => decrementQtyHandler(item, idx)}
                      >
                        -
                      </ButtonIncre>
                    </GridQte>
                    <GridPrix>
                      <h3>{item.price} $ </h3>
                    </GridPrix>

                    <GridDelete onClick={() => deleteItemHandler(item, idx)}>
                      X Delete
                    </GridDelete>
                  </CartContent>
                </div>
              );
            })}
        </Wrapper>
      )}
      <div>
        <TotalGrid>
          <DivT>
            <div>Subtotal: </div>
            <div>{cartTotal} $</div>
          </DivT>
          <Div>
            <div>shipping: </div>
            <div>FREE</div>
          </Div>
          <Div>
            <div>0% GST: </div>
            <div>FREE</div>
          </Div>
          <Div>
            <div>0% QST: </div>
            <div>FREE</div>
          </Div>
          <DivT1>
            <div>Estimated total: </div>
            <div>{cartTotal} $</div>
          </DivT1>

          <Button color="primary" onClick={handleClickOpen}>
            <Checkoutp>proceed to Checkout</Checkoutp>
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Payment</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To pay, please enter your cart Number, the expiration date , the
                CVC and the address here.
              </DialogContentText>

              <Checkout />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Pay
              </Button>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>

          <h3>Accepted Payment Methods</h3>
          <BankCart>
            <ImageCart>
              <img src="/images/visa.png" />
            </ImageCart>
            <ImageCart>
              <img src="/images/MasterCart.png" />
            </ImageCart>

            <ImageCart>
              <img src="/images/americanExpress.png" />
            </ImageCart>
            <ImageCart>
              <img src="/images/debitCart.png" />
            </ImageCart>
          </BankCart>
        </TotalGrid>
      </div>
    </DivG>
  );
};

const Checkoutp = styled.button`
  min-height: 40px;
  text-shadow: none;
  position: relative;
  width: 100%;
  padding-left: 0px;
  padding-right: 0px;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 0.909rem;
  background-color: #0072ce;
  color: rgb(255, 255, 255);
  border-style: solid;
  border-radius: 21px;
  border-width: 2px;
  border-color: #0072ce;
`;
const BankCart = styled.div`
  justify-content: space-between;
  border-top: 1px solid;
  display: flex;
`;
const ImageCart = styled.div`
  & > img {
    object-fit: cover;

    max-width: 72px;

    height: 44 px;
    overflow: visible;
  }
`;
const DivT = styled.div`
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  font-size: 25px;
  border-bottom: 1px solid;
`;
const DivT1 = styled.div`
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  font-size: 25px;
  border-top: 1px solid;
`;

const DivG = styled.div`
  margin-top: 100px;
  display: grid;
  grid-template-columns: 70% 30%;
`;
const Div = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Wrapper = styled.div`
  justify-content: left;
  margin-top: 50px;
`;
const CartContent = styled.div`
  position: relative;
  display: flex;
  justify-content: space-around;

  border-bottom: 1px grey solid;
  background-color: white;
  padding: 30px;
`;

const GridImage = styled.div`
  & > img {
    height: 100px;
    object-fit: cover;

    width: 100px;
  }
`;
const GridDelete = styled.button`
  cursor: pointer;
  color: rgb(0, 114, 206);
  font-size: 0.826rem;
  text-align: right;
  position: absolute;
  right: 0;
  bottom: 0;
  border: none;
  background: none;
  text-decoration: none;
`;
const TotalGrid = styled.div`
  margin: 20px;
  background-color: rgb(242, 241, 239);
  position: sticky;
  top: 5px;

  padding: 16px;
  justify-content: left;
  padding-top: 16px;

  flex-direction: column;
  display: flex;
  font-size: 1rem;
  font-family: Roboto, Arial, Helvetica, sans-serif;
  font-style: normal;
  font-weight: 400;
  & > * {
    margin: 20px;
  }
`;
const GridDescrip = styled.div``;
const GridQte = styled.div``;
const GridPrix = styled.div``;
export default Cart;
