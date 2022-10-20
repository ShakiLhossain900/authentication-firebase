import React, { useState } from "react";

const AuthContext = React.createContext({
    //store
  //here i wanna store token that initaially have empty string
  token: "",
  isLoginIn: false, // i wanna tell is login use true or false
  login: (token) => {},
  logout: () => {},
});

const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);

  const userIsLoggedIn = !!token; //truethy or falsy value token is not empty it will return  true if token is empty it will return false,

  const loginHandler = (tokeb) => {
    setToken(token);
  };

  const logOutHandler = () => {
    setToken(null);
  };
  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logOutHandler,
  };
//auth context provider components, which can be manages of auth related state
  return <AuthContext.Provider>{props.children}</AuthContext.Provider>;
};
