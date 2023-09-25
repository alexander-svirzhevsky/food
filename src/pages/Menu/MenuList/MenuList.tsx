import ProductCard from "../../../components/ProductCard/ProductCard";
import { ProductI } from "../../../interfaces/product.interface";
import styles from "./MenuList.module.css";

interface MenuListProps {
  products: ProductI[];
}

const MenuList = ({ products }: MenuListProps) => {
  return (
    <div className={styles["products"]}>
      {products.map((p) => (
        <ProductCard
          key={p.id}
          id={p.id}
          name={p.name}
          description={p.ingredients.join(", ")}
          rating={p.rating}
          price={p.price}
          image={p.image}
        />
      ))}
    </div>
  );
};

export default MenuList;
