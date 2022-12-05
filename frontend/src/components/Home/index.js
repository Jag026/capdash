import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

function Home() {
  const dispatch = useDispatch();

  let cryptos = useSelector(state => state.session.cryptos);
  let stocks = useSelector(state => state.session.stocks);
  
  let cryptoNameArr = []
  let stockNameArr = []

  if (cryptos) {
      cryptoNameArr = cryptos.assets;
  }
    
  if (stocks) {
      stockNameArr = stocks.stockSymbols;
  }  
  
  const setCryptos = (e) => {
    e.preventDefault();
      dispatch(sessionActions.getCryptoNames()); 
      stocks.stockSymbols = [];
  }
    
  const setStocks = (e) => {
    e.preventDefault();
      dispatch(sessionActions.getStockNames()); 
      cryptos.assets = [];
  }  
    
  return (
    <div>
      <div>
        <p>Select An Asset Class</p>
        <button onClick={setStocks}>Stocks</button>
        <button onClick={setCryptos}>Cryptos</button>
        <br></br>
        <br></br>
          {cryptoNameArr && 
              cryptoNameArr.map((name => {
                name = name.split('USD')[0]
                return <button>{name}</button> 
                }))
          }
        <br></br>
        <br></br>
          {stockNameArr && 
              stockNameArr.map((name => {
                return <button>{name}</button> 
                }))
          }
      </div>
    </div>
  );
}

export default Home;