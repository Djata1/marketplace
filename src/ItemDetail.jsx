import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Magnifier from "react-magnifier";
const ImageGrid = styled.img`
  width: 100px;
  height: 100px;
  margin-right: 100px;
  object-fit: cover;
  margin-bottom: 20px;
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
const ReviewSize = styled(Link)`
  font-size: 25px;
  margin: 10px;
`;
const ButtonMarg = styled.button`
  margin-right: 0px;
  min-height: 40px;
  text-shadow: none;
  position: relative;
  width: 40%;
  padding-left: 0px;
  padding-right: 0px;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 0.909rem;
  background-color: rgb(0, 114, 206);
  color: rgb(255, 255, 255);
  border-style: solid;
  border-radius: 21px;
  border-width: 2px;
  border-color: #0072ce;
`;
const ButtonMargin = styled(Button)`
  && {
    margin: 22px;
  }
`;
const Wrapper = styled.div`
  margin-top: 100px;
  display: grid;
  grid-template-columns: 150px auto 300px;
  background-color: white;
  justify-content: center;
  align-items: center;
  grid-gap: 20px;
`;
const Sidebar = styled.div`
  display: block;
  padding: 40px;
  font-weight: bold;
  & > * {
    margin-top: 10px;
    text-align: left;
  }
`;
const ImgContente = styled.div`
  display: flex;
  align-items: center;
`;
const ImageMagnific = styled(Magnifier)`
  width: 500px !important;
  height: 400px !important;
  & > img {
    object-fit: cover;
  }
  & > div > img {
    max-height: 600px;
    max-width: 600px;
    object-fit: cover;
    border-radius: 100px;
  }
  img,
  img + div {
    border-radius: 100px;
  }
`;
const ProductCard = styled.div`
  img {
    max-width: 100%;
  }
`;
const Span = styled.span`
  color: gold;
`;
let ItemDetail = (props) => {
  const [item, setItem] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [rating, setRating] = useState(0);
  const [descriptionRating, setDescription] = useState("");
  const [mainImageIndex, setMainImageIndex] = useState(0);

  const isLoging = useSelector((state) => {
    return state.login;
  });
  const history = useHistory();
  const dispatch = useDispatch();
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
    data.append("description", descriptionRating);
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
  let cartState = useSelector((state) => {
    return state.cart;
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    if (!isLoging) history.push("/signup");
  };
  let foundItem = async () => {
    console.log(" props.itemId", props.itemId);
    let responseObject = await fetch("/foundItem?id=" + props.itemId);
    let responseBody = await responseObject.text();
    console.log("itemggg", props.itemId);
    let bodyParsed = JSON.parse(responseBody);
    if (bodyParsed) {
      setItem(bodyParsed.item);
    }
  };
  useEffect(() => {
    foundItem();
  }, []);
  let addToCart = async () => {
    let data = new FormData();
    data.append("itemId", item._id);
    let bodyParsed = await fetch("/cart/add", { method: "POST", body: data })
      .then((response) => {
        return response.text();
      })
      .then((body) => {
        return JSON.parse(body);
      });

    if (bodyParsed.success) {
      dispatch({ type: "add-cart", content: { ...item, qty: 1 } });
    }
  };
  if (!item) return null; // ou bien return <div>Loading...</div> par exemple
  let rat = Math.floor(
    item.reviews.reduce((acc, review) => {
      return acc + Number(review.rating);
    }, 0) / item.reviews.length
  );
  console.log("item.reviews.length", item.reviews.length);
  console.log("rating", rating);
  const { _id, price, description, location, image, inventory, images } = item;

  return (
    <Wrapper>
      <div>
        {images.map((image, index) => (
          <ImageGrid src={image} onClick={() => setMainImageIndex(index)} />
        ))}
      </div>
      <ImgContente>
        <ImageMagnific src={image || images[mainImageIndex]} />
      </ImgContente>
      <Sidebar>
        <div>
          <h1>{description}</h1>
        </div>
        <h1>
          {" "}
          {Array(5)
            .fill()
            .map((e, idx) => {
              return idx + 1 < rat ? <Span>★</Span> : "☆";
            })}
          <ReviewSize>({item.reviews.length})</ReviewSize>
        </h1>
        <div>
          <h1>{inventory}</h1>
        </div>
        <div>
          <h1>{price} $</h1>
        </div>
        <div>
          <h3>Quantity : </h3>
          <ButtonDec>+</ButtonDec>
          <InputNumber type="text" size="5" value="1" />
          <ButtonIncre>-</ButtonIncre>
        </div>
        <div>
          <ButtonMarg onClick={() => (isLoging ? addToCart() : setOpen(true))}>
            Add to cart
          </ButtonMarg>
        </div>

        <div>
          <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            Add review
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            {isLoging ? (
              <>
                <DialogTitle id="form-dialog-title">Review</DialogTitle>
                <DialogContent>
                  <DialogContentText>Evaluate this item</DialogContentText>

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
                        value={descriptionRating}
                        onChange={descriptionHandler}
                      />
                    </div>
                    <div>
                      <ButtonMargin
                        variant="contained"
                        color="primary"
                        type="submit"
                        onClick={handleClose}
                      >
                        Add Review
                      </ButtonMargin>
                    </div>
                  </form>
                </DialogContent>
              </>
            ) : (
              <DialogContent>
                <DialogContentText>please login</DialogContentText>
              </DialogContent>
            )}
          </Dialog>
        </div>
      </Sidebar>
    </Wrapper>
  );
};
export default ItemDetail;
