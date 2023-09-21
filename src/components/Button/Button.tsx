import { ButtonHTMLAttributes, ReactNode } from "react";
import cn from "classnames";
import styles from "./Button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  size?: "md" | "lg";
}

const Button = ({ children, size = "md", ...rest }: ButtonProps) => {
  return (
    <button
      {...rest}
      className={cn(styles["button"], {
        [styles["medium"]]: size === "md",
        [styles["large"]]: size === "lg",
      })}
    >
      {children}
    </button>
  );
};

export default Button;
