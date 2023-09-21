import { InsHTMLAttributes } from "react";
import cn from "classnames";
import styles from "./Search.module.css";

interface SearchProps extends InsHTMLAttributes<HTMLInputElement> {}

const Search = ({ ...rest }: SearchProps) => {
  return (
    <div className={styles["search"]}>
      <input {...rest} type='text' className={cn(styles["input"])}></input>
      <img className={cn(styles["icon"])} src='/search.svg' alt='search icon' />
    </div>
  );
};

export default Search;
