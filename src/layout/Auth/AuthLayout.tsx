import { Outlet } from "react-router-dom";
import styles from "./AuthLayout.module.css";

const AuthLayout = () => {
  return (
    <div className={styles["layout"]}>
      <div className={styles["logo"]}>
        <img src='/logo.svg' alt='Company logo' />
      </div>
      <div className={styles["form"]}>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
