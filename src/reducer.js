import produce from "immer";
const initialState = {
  login: false,
  cart: [],
  items: [],
  farms: [],
  username: "",
  searchQuery: "",
  category: "",
};

let reducer = (state = initialState, action) => {
  return produce(state, (draftState) => {
    switch (action.type) {
      case "login-success":
        draftState.login = true;
        draftState.username = action.content;
        draftState.cart = action.cart || [];
        break;
      case "all-items":
        draftState.items = action.content;
        break;
      case "empty-cart":
        draftState.cart = [];
        break;
      case "all-farms":
        draftState.farms = action.content;
        break;
      case "add-cart":
        let index = draftState.cart.findIndex(
          (item) => item.id === action.content.id
        );
        if (index === -1) draftState.cart.push(action.content);
        else draftState.cart[index].qty++;
        break;
      case "cart":
        draftState.cart = action.content;
        break;
      case "query":
        draftState.searchQuery = action.content;
        break;
      case "delete-one":
        draftState.cart.splice(action.content, 1);
        break;
      case "cart-decQty":
        if (draftState.cart[action.content].qty === 1) return;
        draftState.cart[action.content].qty--;
        break;
      case "cart-incQty":
        draftState.cart[action.content].qty++;
        break;
      case "logout":
        draftState.login = false;
        draftState.username = "";
        draftState.cart = [];
        break;
      case "categoryChange":
        draftState.category = action.category;
        break;

      default:
        state;
    }
  });
};

export default reducer;
