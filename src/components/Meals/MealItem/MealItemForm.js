import { useState } from "react";
import Input from "../../UI/Input/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const [enteredAmount, setEnteredAmount] = useState(1);
  const [amountIsValid, setAmountIsValid] = useState(true);

  const handleChange = (event) => {
    setEnteredAmount(Number(event.target.value));
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    if (enteredAmount < 1 || enteredAmount > 5) {
      setAmountIsValid(false);
      return;
    }

    props.onAddToCart(enteredAmount);
    setEnteredAmount(1);
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <Input
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
          value: enteredAmount,
          onChange: handleChange,
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;
