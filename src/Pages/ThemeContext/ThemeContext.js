import React from 'react';
import { createContext, useContext, useState } from 'react'
import { createTheme } from '@material-ui/core/styles/';
import { red } from 'material-ui-colors';

const Theme = createContext();


const ThemeContext = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);

    const darkTheme = createTheme({
        palette: {
            type: "dark"  
        },
        typography: {
            color: "white"
        }
    });
    const lightTheme = createTheme({
        palette: {
        //   type: "light",
        primary: red,
        secondary: red,

        },
        typography: {
            color: "secondary" 
        }
    });


    return (
        <Theme.Provider value={{ darkMode, setDarkMode , darkTheme, lightTheme}}>
            {children}
        </Theme.Provider>
    )

}



export default ThemeContext;


export const DarkTheme = () => {
    return useContext(Theme);
};