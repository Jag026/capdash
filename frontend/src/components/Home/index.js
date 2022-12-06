import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
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
  
  let cryptoNameArr = cryptoData.map(crypto => {
    return crypto.symbol
  })
  let stockNameArr = []
  let assetB = "";
  let newPrice = 0;

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

  const setAssetA = (symbol) => {
    let asset = cryptoData.filter(crypto => crypto.symbol === symbol)
    setAssetAState(asset[0].symbol);
    
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