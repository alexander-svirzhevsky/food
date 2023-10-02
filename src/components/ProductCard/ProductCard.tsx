import { Link } from "react-router-dom";
import styles from "./ProductCard.module.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { basketActions } from "../../store/basket.slice";

export interface ProductCardProps {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  rating: number;
}

function ProductCard({
  id,
  name,
  description,
  image,
  price,
  rating,
}: ProductCardProps) {
  const dispatch = useDispatch<AppDispatch>();

  const onAddToBasketClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(basketActions.addProduct(id));
  };

  return (
    <Link to={`/product/${id}`} className={styles["link"]}>
      <div className={styles["card"]}>
        <div
          className={styles["head"]}
          style={{ backgroundImage: `url('${image}')` }}
        >
          <div className={styles["price"]}>
            {price}&nbsp;
            <span className={styles["currency"]}>₽</span>
          </div>
          <button
            className={styles["add-to-cart"]}
            onClick={onAddToBasketClick}
          >
            <img src='/cart-button-icon.svg' alt='Add to basket' />
          </button>
          <div className={styles["rating"]}>
            {rating}&nbsp;
            <img src='/star-icon.svg' alt='star icon' />
          </div>
        </div>
        <div className={styles["footer"]}>
          <div className={styles["name"]}>{name}</div>
          <div className={styles["description"]}>{description}</div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
