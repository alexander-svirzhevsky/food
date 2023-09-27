import { NavLink, Outlet, useNavigate } from "react-router-dom";
import cn from "classnames";
import styles from "./Layout.module.css";
import Button from "../../components/Button/Button";

const Layout = () => {
  const navigate = useNavigate();

  const onExitClick = () => {
    localStorage.removeItem("jwt");
    navigate("/auth/login");
  };

  return (
    <div className={styles["layout"]}>
      <div className={styles["sidebar"]}>
        <div className={styles["user"]}>
          <img
            className={styles["avatar"]}
            src='/avatar.png'
            alt='User avatar'
          />
          <div className={styles["name"]}>Alexander Svirzhevsky</div>
          <div className={styles["email"]}>alexander.sv@gmail.com</div>
        </div>
        <div className={styles["menu"]}>
          <NavLink
            to='/'
            className={({ isActive }) =>
              cn(styles["link"], {
                [styles["active"]]: isActive,
              })
            }
          >
            <img src='/menu-icon.svg' alt='Menu icon' />
            Menu
          </NavLink>
          <NavLink
            to='/basket'
            className={({ isActive }) =>
              cn(styles["link"], {
                [styles["active"]]: isActive,
              })
            }
          >
            <img src='/cart-icon.svg' alt='Bakset icon' />
            Basket
          </NavLink>
        </div>
        <Button onClick={onExitClick} className={styles["exit"]}>
          <img src='/exit-icon.svg' alt='Exit icon' />
          Exit
        </Button>
      </div>
      <div className={styles["content"]}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
