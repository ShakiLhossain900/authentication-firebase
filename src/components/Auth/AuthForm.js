import { useState, useRef, useContext } from "react";

import classes from "./AuthForm.module.css";
import AuthContext from '../../store/auth-context';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx =useContext(AuthContext);


  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setIsLoading(true);
    let url;
    if (isLogin) {
      url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBGorlsRTjc57zxjn8lKmmKfYeYIS5VSrM'
    } else {
    url= "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBGorlsRTjc57zxjn8lKmmKfYeYIS5VSrM"
    }
    fetch(
     url,
      {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "content-type": "application/json",
        },
      }
    ).then((res) => {
      setIsLoading(false);
      if (res.ok) {
        return res.json()
      } else {
        return res.json().then((data) => {
          let errorMessage = "Authentication Failed!";
          //  if(data && data.error && data.error.message){
          //    errorMessage = data.error.message;
          //  }
          throw new Error (errorMessage);
        });
      }
    }).then((data)=>{
      // console.log(data);
      authCtx.login(data.idToken)
    })
    .catch((error)=>{
      alert(error.message)
    })
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input ref={emailInputRef} type="email" id="email" required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            ref={passwordInputRef}
            type="password"
            id="password"
            required
          />
        </div>
        <div className={classes.actions}>
          {!isLoading &&    <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          {isLoading && <p>Sending request....</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
