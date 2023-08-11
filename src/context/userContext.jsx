import React, { useState } from "react";
import { useCookies } from 'react-cookie'

//named export for this context (to be used via useContext elsewhere)
export const UserContext = React.createContext();

//the provider component wrapper for this context. uses its own state to keep track of the current username
//use it in a top level component such as App.jsx like <UserProvider>...</UserProvider>
//all child components in the ... above will receive the data values from line 13
export const UserProvider = (props) => {
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const [currentUser, setCurrentUser] = useState(cookies.userObject ? cookies.userObject : {}); //default user object, read from cookies if possible

    //sets user in context on login, but also stores token in a cookie
    const handleUpdateUser = (user) => {
        // console.log(JSON.stringify(user))
        if (user.token) {
            setCookie('token', user.token, { path: '/', maxAge: 60 * 60 * 24 }) // cookie will expire in 24 hours
            setCookie('userObject', JSON.stringify(user), { path: '/', maxAge: 60 * 60 * 24 }) // cookie will expire in 24 hours
        } else {
            removeCookie('token');
            removeCookie('userObject')
        }
        setCurrentUser(user) // store in context as well for easy access
    }

    return (
        <UserContext.Provider value={{ currentUser, handleUpdateUser }}>
            {props.children}
        </UserContext.Provider>
    );
}