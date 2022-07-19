import { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = cartCtx.totalAmount.toFixed(2);
  const hasItems = cartCtx.items.length > 0;

  const handleRemoveCartItem = (id) => {
    cartCtx.removeItem(id);
  };
  const handleAddCartItem = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const handleOrder = () => {
    setIsCheckout(true);
  };
  const handleOrderSubmit = (userData) => {
    fetch(
      "https://react-food-app-4099f-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <li key={item.id}>
          <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={handleRemoveCartItem.bind(null, item.id)}
            onAdd={handleAddCartItem.bind(null, item)}
          />
        </li>
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={handleOrder}>
          Order
        </button>
      )}
    </div>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>${totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={handleOrderSubmit} onCancel={props.onClose} />
      )}
      {!isCheckout && modalActions}
    </Modal>
  );
};

export default Cart;
