import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Heading from "../../components/Heading/Heading";
import Input from "../../components/Input/Input";
import styles from "./Login.module.css";
import { FormEvent, useState } from "react";
import { LoginI, ResponsI } from "../../interfaces/login.interface";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "../../helpers/API";

const Login = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { email, password } = e.target as typeof e.target & LoginI;
    await login(email.value, password.value);
  };

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      const { data } = await axios.post<ResponsI>(`${BASE_URL}/auth/login`, {
        email,
        password,
      });
      localStorage.setItem("jwt", data.access_token);
      navigate("/");
    } catch (e) {
      if (e instanceof AxiosError) {
        setError(e.response?.data.message);
      }
    }
  };

  return (
    <>
      <div className={styles["content"]}>
        <Heading title='Sign in' />
        {error && <div className={styles["error"]}>{error}</div>}
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
