import cn from "classnames";
import styles from "./Heading.module.css";
import { HTMLAttributes } from "react";

interface HeadingProps extends HTMLAttributes<HTMLHeadElement> {
  title: string;
}

const Heading = ({ title, ...rest }: HeadingProps) => {
  return (
    <h1 {...rest} className={cn(styles["heading"])}>
      {title}
    </h1>
  );
};

export default Heading;
