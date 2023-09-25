import { useEffect } from "react";

import styles from "./Menu.module.css";
import Heading from "../../components/Heading/Heading";
import Search from "../../components/Search/Search";
import MenuList from "./MenuList/MenuList";
import useProducts from "../../hooks/useProducts";

const Menu = () => {
  const { products, isLoading, error, getProducts } = useProducts();

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <div className={styles["header"]}>
        <Heading title='Menu' />
        <Search placeholder='Search product' />
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
