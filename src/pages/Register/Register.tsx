import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Heading from "../../components/Heading/Heading";
import Input from "../../components/Input/Input";
import styles from "./Register.module.css";
import { FormEvent, useEffect } from "react";
import { RegisterI } from "../../interfaces/register.interface";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootStore } from "../../store/store";
import { register, userActions } from "../../store/user.slice";

const Register = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { errorMessage, jwt } = useSelector((state: RootStore) => state.user);
  const navigate = useNavigate();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(userActions.clearError());

    const { email, password, name } = e.target as typeof e.target & RegisterI;

    dispatch(
      register({
        email: email.value,
        password: password.value,
        name: name.value,
      })
    );
  };

  useEffect(() => {
    if (jwt) {
      navigate("/");
    }
  }, [jwt, navigate]);

  return (
    <>
      <div className={styles["content"]}>
        <Heading title='Sign up' />
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
          <Input
            name='name'
            labelText='Your name'
            placeholder='User name'
            type='text'
          />
          <Button type='submit' size='lg' className={styles["button"]}>
            Sign up
          </Button>
        </form>
        <div className={styles["controls"]}>
          <span className={styles["subtitle"]}>Already have an account?</span>
          <Link className={styles["link"]} to='/auth/login'>
            Log in
          </Link>
        </div>
      </div>
    </>
  );
};

export default Register;
