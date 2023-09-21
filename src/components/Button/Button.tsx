import { ButtonHTMLAttributes, ReactNode } from "react";
import cn from "classnames";
import styles from "./Button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  size?: "md" | "lg";
  className?: string;
}

const Button = ({ children, size = "md", className, ...rest }: ButtonProps) => {
  return (
    <button
      {...rest}
      className={cn(styles["button"], className, {
        [styles["medium"]]: size === "md",
        [styles["large"]]: size === "lg",
      })}
    >
      {children}
    </button>
  );
};

export default Button;
