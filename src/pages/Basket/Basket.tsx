import { useSelector } from "react-redux";
import Heading from "../../components/Heading/Heading";
import { RootStore } from "../../store/store";
import { useEffect, useState } from "react";
import { ProductI } from "../../interfaces/product.interface";
import axios from "axios";
import { BASE_URL } from "../../helpers/API";
import BasketProduct from "../../components/BasketProduct/BasketProduct";

const Basket = () => {
  const items = useSelector((state: RootStore) => state.basket.items);

  const [products, setProducts] = useState<ProductI[]>([]);

  const loadProduct = async (id: number) => {
    const { data } = await axios.get<ProductI>(`${BASE_URL}/products/${id}`);
    return data;
  };

  const loadProducts = async () => {
    const response = await Promise.all(
      items.map((item) => loadProduct(item.id))
    );
    setProducts(response);
  };

  console.log({ products });

  useEffect(() => {
    loadProducts();
  }, [items]);

  return (
    <div>
      <Heading title='Basket' />
      {items.map((item) => {
        const currentProduct = products.find((p) => p.id === item.id);
        if (!currentProduct) {
          return;
        }

        return <BasketProduct count={item.count} {...currentProduct} />;
      })}
    </div>
  );
};

export default Basket;
