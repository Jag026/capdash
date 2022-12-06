import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector, } from 'react-redux';
import { Redirect } from 'react-router-dom';

function Home() {
  const dispatch = useDispatch();

  let cryptos = useSelector(state => state.session.cryptos);
  let stocks = useSelector(state => state.session.stocks);
  let cryptoData = useSelector(state => state.session.cryptoData);
    if (!cryptoData) {
      dispatch(sessionActions.getAllCryptoData())
    }
  
  const [assetA, setAssetAState] = useState('');
  const [marketCapA, setmarketCapAState] = useState('');
  const [cryptoNameArr, setCryptoNameArr] = useState([]);


  let stockNameArr = []
  let assetB = "";
  let newPrice = 0;
    
  if (stocks) {
      stockNameArr = stocks.stockSymbols;
  } 

  const SetCryptos = (e) => {
    e.preventDefault();
    setCryptoNameArr(cryptoData.map(crypto => { return crypto.symbol}))
    stocks.stockSymbols = [];
  }
    
  const setStocks = (e) => {
    e.preventDefault();
      dispatch(sessionActions.getStockNames()); 
      setCryptoNameArr([])
  }  

  const setAssetA = (symbol) => {
    let asset = cryptoData.filter(crypto => crypto.symbol === symbol)
    setAssetAState(asset[0].symbol);
    
  }  
    

  return (
    <div>
      <div>
        <p>Select An Asset Class</p>
        <button onClick={setStocks}>Stocks</button>
        <button onClick={SetCryptos}>Cryptos</button>
        <br></br>
        <br></br>
          {cryptoNameArr && 
              cryptoNameArr.map((name => {
                return <button onClick={e => { e.preventDefault(); setAssetA(name) } }>{name}</button> 
                }))
          }
        <br></br>
        <br></br>
          {stockNameArr && 
              stockNameArr.map((name => {
                return <button onClick={e => { e.preventDefault(); setAssetA(name) } }>{name}</button>  
                }))
          }
      </div>

      <p>If asset {assetA} has a marketcap of: {marketCapA} {assetB} marketcap, it's price would be: {newPrice}: </p>
    </div>
  );
}

export default Home;