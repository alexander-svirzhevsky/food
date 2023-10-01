import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Heading from "../../components/Heading/Heading";
import Input from "../../components/Input/Input";
import styles from "./Login.module.css";
import { FormEvent, useEffect } from "react";
import { LoginI } from "../../interfaces/login.interface";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootStore } from "../../store/store";
import { login, userActions } from "../../store/user.slice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { jwt, errorMessage } = useSelector((state: RootStore) => state.user);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(userActions.clearError());
    const { email, password } = e.target as typeof e.target & LoginI;
    await sendData(email.value, password.value);
  };

  const sendData = async (email: string, password: string) => {
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (jwt) {
      navigate("/");
    }
  }, [jwt, navigate]);

  return (
    <>
      <div className={styles["content"]}>
        <Heading title='Sign in' />
        {errorMessage && <div className={styles["error"]}>{errorMessage}</div>}
        <form className={styles["form"]} onSubmit={onSubmit}>
          <Input
            labelText='Your email'
            name='email'
            placeholder='Email'
            type='text'
          />
          <Input
            name='password'
            labelText='Your password'
            placeholder='Password'
            type='password'
          />
          <Button type='submit' size='lg' className={styles["button"]}>
            Sign in
          </Button>
        </form>
        <div className={styles["controls"]}>
          <span className={styles["subtitle"]}>Don't have an account yet?</span>
          <Link className={styles["link"]} to='/auth/register'>
            Register
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
