import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import cn from 'classnames';
import styles from './Layout.module.css';
import Button from '../../components/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootStore } from '../../store/store';
import { getProfile, userActions } from '../../store/user.slice';
import { useEffect } from 'react';

const Layout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector((state: RootStore) => state.user.profile);
  const products = useSelector((state: RootStore) => state.basket.items);

  const onExitClick = () => {
    dispatch(userActions.removeJwt());
    navigate('/auth/login');
  };

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  return (
    <div className={styles['layout']}>
      <div className={styles['sidebar']}>
        <div className={styles['user']}>
          <img
            className={styles['avatar']}
            src="/avatar.png"
            alt="User avatar"
          />
          <div className={styles['name']}>{profile?.name}</div>
          <div className={styles['email']}>{profile?.email}</div>
        </div>
        <div className={styles['menu']}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              cn(styles['link'], {
                [styles['active']]: isActive,
              })
            }
          >
            <img src="/menu-icon.svg" alt="Menu icon" />
            Menu
          </NavLink>
          <div className={styles['basket']}>
            <NavLink
              to="/basket"
              className={({ isActive }) =>
                cn(styles['link'], {
                  [styles['active']]: isActive,
                })
              }
            >
              <img src="/cart-icon.svg" alt="Bakset icon" />
              Basket
            </NavLink>
            <span className={styles['product-count']}>
              {products.reduce((acc, item) => (acc += item.count), 0)}
            </span>
          </div>
        </div>
        <Button onClick={onExitClick} className={styles['exit']}>
          <img src="/exit-icon.svg" alt="Exit icon" />
          Exit
        </Button>
      </div>
      <div className={styles['content']}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
