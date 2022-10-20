import React, { useState } from "react";

const AuthContext = React.createContext({
  //store
  //here i wanna store token that initaially have empty string
  token: "", //if no token user is no login if token user is login
  isLoginIn: false, // i wanna tell is login use true or false
  login: (token) => {},
  logout: () => {},
});


//adding auto logout
const calculateRemainingTime = (expirationTime) => {
   const currentTime = new Date().getTime();
   const adjExpirationTime = new Date(expirationTime).getTime();

   const remainingDuration = adjExpirationTime - currentTime;

   return remainingDuration;
};

export const AuthContextProvider = (props) => {

  const initailToken = localStorage.getItem('token');
  const [token, setToken] = useState(initailToken);

  const userIsLoggedIn = !!token; //not not token ,,,,,truethy or falsy value token is not empty it will return  true if token is empty it will return false,

  const loginHandler = (token, expirationTime) => {
    setToken(token);
    localStorage.setItem('token', token);   //api buding the browser just like fetch function
     const remainingTime = calculateRemainingTime(expirationTime);
  };

  const logOutHandler = () => {
    setToken(null); //setToken null means i clear my token
    localStorage.removeItem('token')
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