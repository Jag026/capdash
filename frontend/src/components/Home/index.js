import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector, } from 'react-redux';
import { Redirect } from 'react-router-dom';

function Home() {
  const dispatch = useDispatch();

  let cryptoData = useSelector(state => state.session.cryptoData);
    if (!cryptoData) {
      dispatch(sessionActions.getAllCryptoData())
    }
    let stockData = useSelector(state => state.session.stockData);
    if (!stockData) {
      dispatch(sessionActions.getStockData())
    }
  
  const [assetA, setAssetAState] = useState('');
  const [marketCapA, setmarketCapAState] = useState('');
  const [cryptoNameArr, setCryptoNameArr] = useState([]);
  const [stockNameArr, setStockNameArr] = useState([]);

  let assetB = "";
  let newPrice = 0;

  const SetCryptos = (e) => {
    e.preventDefault();
    setCryptoNameArr(cryptoData.map(crypto => { return crypto.symbol}))
    setStockNameArr([])
  }
    
  const setStocks = (e) => {
    e.preventDefault();
    setStockNameArr(stockData.stockData.map(crypto => { return crypto.symbol}))
    setCryptoNameArr([])
  }  

  const setAsset = (data, symbol) => {
    let asset = data.filter(asset => asset.symbol === symbol)
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
                return <button onClick={e => { e.preventDefault(); setAsset(cryptoData, name) } }>{name}</button> 
                }))
          }
        <br></br>
        <br></br>
          {stockNameArr && 
              stockNameArr.map((name => {
                return <button onClick={e => { e.preventDefault(); setAsset(stockData.stockData, name) } }>{name}</button>  
                }))
          }
      </div>

      <p>If asset {assetA} has a marketcap of: {marketCapA} {assetB} marketcap, it's price would be: {newPrice}: </p>
    </div>
  );
}

export default Home;