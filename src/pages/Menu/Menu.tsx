import styles from "./Menu.module.css";
import Heading from "../../components/Heading/Heading";
import Search from "../../components/Search/Search";
import ProductCard from "../../components/ProductCard/ProductCard";

const Menu = () => {
  return (
    <>
      <div className={styles["header"]}>
        <Heading title='Menu' />
        <Search placeholder='Search product' />
      </div>
      <div>
        <ProductCard
          id={1}
          title='Product title'
          description='description of the product'
          rating={4.5}
          price={300}
          image='/product-demo.png'
        />
      </div>
    </>
  );
};

export default Menu;
