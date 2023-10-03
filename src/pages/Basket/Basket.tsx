import { useDispatch, useSelector } from 'react-redux';
import styles from './Basket.module.css';
import Heading from '../../components/Heading/Heading';
import { AppDispatch, RootStore } from '../../store/store';
import { useEffect, useState } from 'react';
import { ProductI } from '../../interfaces/product.interface';
import axios from 'axios';
import { BASE_URL } from '../../helpers/API';
import BasketProduct from '../../components/BasketProduct/BasketProduct';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { CheckoutI } from '../../interfaces/checkout.interface';
import { basketActions } from '../../store/basket.slice';

const DELIVERY_FEE = 169;

const Basket = () => {
  const items = useSelector((state: RootStore) => state.basket.items);
  const jwt = useSelector((state: RootStore) => state.user.jwt);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [products, setProducts] = useState<ProductI[]>([]);

  const total = items
    .map((i) => {
      const product = products.find((p) => p.id === i.id);
      if (!product) {
        return 0;
      }
      return i.count * product.price;
    })
    .reduce((acc, i) => (acc += i), 0);

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

  const onCheckoutClick = async () => {
    try {
      const { data } = await axios.post<CheckoutI>(
        `${BASE_URL}/order`,
        {
          products: items,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      if (data.status === 'new') {
        dispatch(basketActions.clear());
        navigate('/success');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [items]);

  return (
    <div>
      <Heading title="Basket" />
      {items.map((item) => {
        const currentProduct = products.find((p) => p.id === item.id);
        if (!currentProduct) {
          return;
        }

        return <BasketProduct count={item.count} {...currentProduct} />;
      })}
      <div className={styles['line']}>
        <div className={styles['text']}>Итог</div>
        <div className={styles['price']}>
          {total}&nbsp;<span>₽</span>
        </div>
      </div>
      <hr className={styles['hr']} />
      <div className={styles['line']}>
        <div className={styles['text']}>Доставка</div>
        <div className={styles['price']}>
          {DELIVERY_FEE}&nbsp;<span>₽</span>
        </div>
      </div>
      <hr className={styles['hr']} />
      <div className={styles['line']}>
        <div className={styles['text']}>Итог ({items.length})</div>
        <div className={styles['price']}>
          {total + DELIVERY_FEE}&nbsp;<span>₽</span>
        </div>
      </div>
      <Button onClick={onCheckoutClick} size="lg" disabled={items.length === 0}>
        Checkout
      </Button>
    </div>
  );
};

export default Basket;
