import React, { useState } from "react";

const AuthContext = React.createContext({
  //store
  //here i wanna store token that initaially have empty string
  token: "", //if no token user is no login if token user is login
  isLoginIn: false, // i wanna tell is login use true or false
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);

  const userIsLoggedIn = !!token; //not not token ,,,,,truethy or falsy value token is not empty it will return  true if token is empty it will return false,

  const loginHandler = (token) => {
    setToken(token);
  };

  const logOutHandler = () => {
    setToken(null); //setToken null means i clear my token
  };
  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logOutHandler,
  };
  //auth context provider components, which can be manages of auth related state
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;