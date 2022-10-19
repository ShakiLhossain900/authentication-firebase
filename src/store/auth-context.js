import React,{useState} from 'react';

const AuthContext = React.createContext({
//here i wanna store token that initaially have empty string
   token: '', 
   isLoginIn: false , // i wanna tell is login use true or false
   login:(token) => {},
   logout:() => {}
});

const AuthContextProvider = (props) => {

 const [token , setToken] = useState(null)

 const userIsLoggedIn = !!token; //truethy or falsy value token is not empty it will return  true if token is empty it will return false,

 const loginHandler = (tokeb) => {
    setToken(token);
 };

 const logOutHandler =()=>{
    setToken(null);
 };

    return <AuthContext.Provider>{props.children}</AuthContext.Provider>
};