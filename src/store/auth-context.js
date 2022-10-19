import React from 'react';

const AuthContext = React.createContext({
//here i wanna store token that initaially have empty string
   token: '', 
   isLoginIn: false , // i wanna tell is login use true or false
});