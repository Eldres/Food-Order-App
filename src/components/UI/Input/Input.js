import classes from "./Input.module.css";

const Input = (props) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      {/* using the spread operator, this allows for all key/value pairs, are added to the input tag. 
          ie: type='text' will auto populate for the corresponding field.
      */}
      <input {...props.input} />
    </div>
  );
};

export default Input;
