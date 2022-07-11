import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (cartState, action) => {
  if (action.type === "ADD_ITEM") {
    const updatedTotalAmount =
      cartState.totalAmount + action.payload.price * action.payload.amount;

    const existingCartItemIdx = cartState.items.findIndex(
      (item) => item.id === action.payload.id
    );
    const existingCartItem = cartState.items[existingCartItemIdx];

    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.payload.amount,
      };
      updatedItems = [...cartState.items];
      updatedItems[existingCartItemIdx] = updatedItem;
    } else {
      updatedItems = cartState.items.concat(action.payload);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "REMOVE_ITEM") {
    const existingCartItemIdx = cartState.items.findIndex(
      (item) => item.id === action.payload
    );
    const existingCartItem = cartState.items[existingCartItemIdx];
    const updatedTotalAmount = cartState.totalAmount - existingCartItem.price;

    let updatedItems;

    if (existingCartItem.amount === 1) {
      updatedItems = cartState.items.filter(
        (item) => item.id !== action.payload
      );
    } else {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      updatedItems = [...cartState.items];
      updatedItems[existingCartItemIdx] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const handleAddItemToCart = (item) => {
    dispatchCartAction({ type: "ADD_ITEM", payload: item });
  };
  const handleRemoveItemFromCart = (id) => {
    dispatchCartAction({ type: "REMOVE_ITEM", payload: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: handleAddItemToCart,
    removeItem: handleRemoveItemFromCart,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
