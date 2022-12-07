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
  const [assetB, setAssetBState] = useState('');
  const [marketCapA, setmarketCapAState] = useState('');
  const [marketCapB, setmarketCapBState] = useState('');
  const [priceA, setPriceAState] = useState('');
  const [priceB, setPriceBState] = useState('');
  const [cryptoNameArr, setCryptoNameArr] = useState([]);
  const [stockNameArr, setStockNameArr] = useState([]);

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
    
  const fetchCryptoMcAndPrice = (data, symbol) => {
    let arr = [];
    let asset = data.filter(asset => asset.symbol === symbol)
    arr[0] = asset[0]["quote"]["USD"].market_cap
    arr[1] = asset[0]["quote"]["USD"].price
    return arr;
  }

  const setDataPoints = (dataArr) => {
    const market_cap = dataArr[0];
    const price = dataArr[1];
    if (assetA) {
      setmarketCapBState(market_cap)
      setPriceBState(price)
    } else {
      setmarketCapAState(market_cap)
      setPriceAState(price)
    }
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
                return <button onClick={e => { e.preventDefault(); setAsset(cryptoData, name); setDataPoints(fetchCryptoMcAndPrice(cryptoData, name))} }>{name}</button> 
                }))
          }
        <br></br>
        <br></br>
          {stockNameArr && 
              stockNameArr.map((name => {
                return <button onClick={e => { e.preventDefault(); setAsset(stockData.stockData, name); } }>{name}</button>  
                }))
          }
      </div>

      <p>If asset {assetA} has a marketcap of: {marketCapA} and a price of {priceA} ------ {assetB} marketcap, it's price would be: {newPrice}: </p>
    </div>
  );
}

export default Home;