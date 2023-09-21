import styles from "./Menu.module.css";
import Heading from "../../components/Heading/Heading";
import Search from "../../components/Search/Search";

const Menu = () => {
  return (
    <div className={styles["header"]}>
      <Heading title='Menu' />
      <Search placeholder='Search product' />
    </div>
  );
};

export default Menu;
