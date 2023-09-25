import { useState } from "react";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "../helpers/API";
import { ProductI } from "../interfaces/product.interface";

const useProducts = () => {
  const [products, setProducts] = useState<ProductI[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getProducts = async () => {
    try {
      setIsLoading(true);
      await new Promise<void>((res) => {
        setTimeout(() => {
          res();
        }, 2000);
      });
      const { data } = await axios.get<ProductI[]>(`${BASE_URL}/products`);
      setProducts(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    products,
    isLoading,
    error,
    getProducts
  }
}

export default useProducts;