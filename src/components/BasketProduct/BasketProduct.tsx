import { useDispatch } from 'react-redux';
import { ProductI } from '../../interfaces/product.interface';
import styles from './BasketProduct.module.css';
import { AppDispatch } from '../../store/store';
import { basketActions } from '../../store/basket.slice';

export interface BasketProductI extends ProductI {
  count: number;
}

const BasketProduct = ({ name, price, image, count, id }: BasketProductI) => {
  const dispatch = useDispatch<AppDispatch>();

  const onAddProduct = () => {
    dispatch(basketActions.addProduct(id));
  };

  const onRemovePoduct = () => {
    dispatch(basketActions.removeProduct(id));
  };

  const deleteProduct = () => {
    dispatch(basketActions.deleteProduct(id));
  };

  return (
    <div className={styles['item']}>
      <div
        className={styles['image']}
        style={{ backgroundImage: `url('${image}')` }}
      ></div>
      <div className={styles['description']}>
        <div className={styles['name']}>{name}</div>
        <div className={styles['price']}>{price}&nbsp;₽</div>
      </div>
      <div className={styles['actions']}>
        <button className={styles['minus']} onClick={onRemovePoduct}>
          <img src="/minus-icon.svg" alt="Удалить из корзины" />
        </button>
        <div className={styles['number']}>{count}</div>
        <button className={styles['plus']} onClick={onAddProduct}>
          <img src="/plus-icon.svg" alt="Добавить в корзину" />
        </button>
        <button className={styles['remove']} onClick={deleteProduct}>
          <img src="/delete-icon.svg" alt="Удалить все" />
        </button>
      </div>
    </div>
  );
};

export default BasketProduct;
