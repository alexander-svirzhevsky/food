import ProductCard from "../../../components/ProductCard/ProductCard";
import { ProductI } from "../../../interfaces/product.interface";

interface MenuListProps {
  products: ProductI[];
}

const MenuList = ({ products }: MenuListProps) => {
  return products.map((p) => (
    <ProductCard
      key={p.id}
      id={p.id}
      name={p.name}
      description={p.ingredients.join(", ")}
      rating={p.rating}
      price={p.price}
      image={p.image}
    />
  ));
};

export default MenuList;
