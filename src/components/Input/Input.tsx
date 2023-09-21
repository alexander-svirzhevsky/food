import cn from "classnames";
import styles from "./Input.module.css";
import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  labelText: string;
  placeholder: string;
}

const Input = ({ labelText, placeholder, ...rest }: InputProps) => {
  return (
    <div className={cn(styles["group"])}>
      <label htmlFor={placeholder} className={cn(styles["label"])}>
        {labelText}
      </label>
      <input
        {...rest}
        id={placeholder}
        className={cn(styles["input"])}
        placeholder={placeholder}
      ></input>
    </div>
  );
};

export default Input;
