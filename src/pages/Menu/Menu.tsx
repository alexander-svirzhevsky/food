import { useEffect, useState } from "react";

import styles from "./Menu.module.css";
import Heading from "../../components/Heading/Heading";
import Search from "../../components/Search/Search";
import MenuList from "./MenuList/MenuList";
import useProducts from "../../hooks/useProducts";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "../../hooks/useDebounce";

const Menu = () => {
  const { products, isLoading, error, getProducts } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchText, setSearchText] = useState("");
  const debouncedValue = useDebounce<string>(searchText, 700);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    setSearchParams({ name: e.target.value });
  };

  useEffect(() => {
    const searchParam = searchParams.get("name") ?? "";
    setSearchText(searchParam);
  }, []);

  useEffect(() => {
    getProducts(debouncedValue);
  }, [debouncedValue]);

  return (
    <>
      <div className={styles["header"]}>
        <Heading title='Menu' />
        <Search
          value={searchText}
          onChange={onSearchChange}
          placeholder='Search product'
        />
      </div>
      <div>
        {error && <>{error}</>}
        {isLoading && <>Loading...</>}
        {!isLoading && <MenuList products={products} />}
      </div>
    </>
  );
};

export default Menu;
