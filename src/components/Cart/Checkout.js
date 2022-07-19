import classes from "./Checkout.module.css";

const Checkout = (props) => {
  const handleConfirm = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleConfirm}>
      <div className={classes.control}>
        <label htmlFor="name">Your Name:</label>
        <input type="text" id="name" />
      </div>
      <div className={classes.control}>
        <label htmlFor="name">Street</label>
        <input type="text" id="street" />
      </div>
      <div className={classes.control}>
        <label htmlFor="name">Postal Code</label>
        <input type="text" id="postal" />
      </div>
      <div className={classes.control}>
        <label htmlFor="name">City</label>
        <input type="text" id="city" />
      </div>
      <button>Confirm</button>
      <button type="button" onClick={props.onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default Checkout;
