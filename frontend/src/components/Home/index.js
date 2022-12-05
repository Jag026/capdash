import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

function Home() {
  const dispatch = useDispatch();
  //top buttons
  let cryptos = useSelector(state => state.session.cryptos);
  let stocks = useSelector(state => state.session.stocks);

  //bottom buttons
  let cryptosBottom = useSelector(state => state.session.cryptos);
  let stocksBottom = useSelector(state => state.session.stocks);
  
  let cryptoNameArr = []
  let stockNameArr = []
  let cryptoNameArrBottom = []
  let stockNameArrBottom = []

  if (cryptos) {
      cryptoNameArr = cryptos.assets;
  }
    
  if (stocks) {
      stockNameArr = stocks.stockSymbols;
  }  
  
  if (cryptosBottom) {
      cryptoNameArrBottom = cryptosBottom.assets;
  }
    
  if (stocksBottom) {
      stockNameArrBottom = stocksBottom.stockSymbols;
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
  const setCryptosBottom = (e) => {
    e.preventDefault();
      dispatch(sessionActions.getCryptoNames()); 
      stocksBottom.stockSymbols = [];
  }
    
  const setStocksBottom = (e) => {
    e.preventDefault();
      dispatch(sessionActions.getStockNames()); 
      cryptosBottom.assets = [];
  }  
    /*
    if (cryptos === null) {
      dispatch(sessionActions.getCryptoNames())
      //return <Redirect to="/" />
  } else {
    nameArr = cryptos.assets
  }
  */
    
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
      <div>
        Middle section
      </div>
           <div>
        <p>Select An Asset Class</p>
        <button onClick={setStocksBottom}>Stocks</button>
        <button onClick={setCryptosBottom}>Cryptos</button>
        <br></br>
        <br></br>
          {cryptoNameArrBottom && 
              cryptoNameArrBottom.map((name => {
                name = name.split('USD')[0]
                return <button>{name}</button> 
                }))
          }
        <br></br>
        <br></br>
          {stockNameArrBottom && 
              stockNameArrBottom.map((name => {
                return <button>{name}</button> 
                }))
          }
      </div>
    </div>
  );
}

export default Home;