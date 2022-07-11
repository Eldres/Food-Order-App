import CartContext from "./cart-context";

const CartProvider = (props) => {
  const handleAddItemToCart = (item) => {};
  const handleRemoveItemFromCart = (id) => {};

  const cartContext = {
    item: [],
    totalAmount: 0,
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
