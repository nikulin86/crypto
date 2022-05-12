import {  Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header/Header';
import Homepage from './Pages/Home/Homepage';
import CoinPage from './Pages/Coin/CoinPage';
import { makeStyles } from '@mui/styles';
import { createTheme, ThemeProvider } from '@material-ui/core/styles/';
import { Paper, Switch } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { DarkTheme } from './Pages/ThemeContext/ThemeContext.js'

function App() {

  const { darkTheme, lightTheme, darkMode } = DarkTheme();




  // const classes = useStyles();




  return (

    <div >
    
  
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <Paper style={{ height: "100%" }}>
          <Header />
          <Routes>
            <Route exact path="/" element={<Homepage />} />
            <Route path="/coins" element={<CoinPage />} >
              <Route path=':id' element={<CoinPage />} />
            </Route>
          </Routes>
        </Paper>
      </ThemeProvider>
    </div>

  );
}

export default App;
