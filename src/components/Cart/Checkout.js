import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isTooShort = (value) => value.trim().length !== 5;

const Checkout = (props) => {
  const [formInputIsValid, setFormInputIsValid] = useState({
    name: true,
    street: true,
    city: true,
    postal: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const handleConfirm = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalIsValid = !isTooShort(enteredPostal);

    setFormInputIsValid({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postal: enteredPostalIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredCityIsValid &&
      enteredPostalIsValid &&
      enteredStreetIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postal: enteredPostal,
    });
  };

  const nameControlClasses = `${classes.control} ${
    formInputIsValid.name ? "" : classes.invalid
  }`;
  const streetControlClasses = `${classes.control} ${
    formInputIsValid.street ? "" : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    formInputIsValid.city ? "" : classes.invalid
  }`;
  const postalControlClasses = `${classes.control} ${
    formInputIsValid.postal ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={handleConfirm}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name:</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputIsValid.name && <p>Please enter a valid name.</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="name">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputIsValid.street && <p>Please enter a valid street.</p>}
      </div>
      <div className={postalControlClasses}>
        <label htmlFor="name">Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef} />
        {!formInputIsValid.postal && (
          <p>Please enter a valid postal (5 characters long).</p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="name">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputIsValid.city && <p>Please enter a valid city.</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
