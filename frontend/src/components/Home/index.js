import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector, } from 'react-redux';
import { Redirect } from 'react-router-dom';
import cryptoFormatter from './CryptoFormatter.js'
import stockFormatter from './StockFormatter.js'
//import './style.css'

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
  const [newPrice, setNewPrice] = useState(0);
  const [cryptoNameArr, setCryptoNameArr] = useState([]);
  const [stockNameArr, setStockNameArr] = useState([]);

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
    if (assetA) {
      setAssetBState(asset[0].symbol);
    } else {
      setAssetAState(asset[0].symbol);
    }
  }  
    
  //fetches marketcap and price from crypto data
  const fetchCryptoMcAndPrice = (data, symbol) => {
    let arr = [];
    let asset = data.filter(asset => asset.symbol === symbol)
    arr[0] = asset[0]["quote"]["USD"].market_cap
    arr[1] = asset[0]["quote"]["USD"].price
    return arr;
  }

  const fetchStockMcAndPrice = (data, symbol) => {
    let arr = [];
    let asset = data.filter(asset => asset.symbol === symbol)[0]
    arr[0] = asset.marketcap
    arr[1] = asset.price
    return arr;
  }

  //sets data points for bottom text. Takes in an integer array [marketcap, price]
  const setCryptoDataPoints = (dataArr) => {
    setNewPrice(0);
    const market_cap = dataArr[0];
    const price = dataArr[1];
    if (assetA) {
      (async () => {
        await setmarketCapBState(cryptoFormatter(market_cap));
        await setPriceBState(cryptoFormatter(price))

        let circulatingSupply = Number(marketCapA.split(",").join("")) / Number(priceA);
        let newPrice = market_cap / circulatingSupply
        setNewPrice(cryptoFormatter(newPrice));
      })();  
    } else {
      setmarketCapAState(cryptoFormatter(market_cap))
      setPriceAState(cryptoFormatter(price))
      return;
    }

  }

  const setStockDataPoints = (dataArr) => {
    setNewPrice(0);
    const market_cap = dataArr[0];
    const price = dataArr[1];
    if (assetA) {
      (async () => {
        await  setmarketCapBState(stockFormatter(market_cap))
        await setPriceBState(stockFormatter(price))
      
        let circulatingSupply = Number(marketCapA.split(",").join("")) / Number(priceA);
        let newPrice = stockFormatter(market_cap).split(",").join("") / circulatingSupply;
        setNewPrice(cryptoFormatter(newPrice));
      })();
      } else {
      setmarketCapAState(stockFormatter(market_cap))
      setPriceAState(stockFormatter(price))
      return
    }
  }
  
  //Resets all displayed data points 
  const ResetDataPoints = () => {
      setmarketCapBState("")
      setPriceBState("")
      setmarketCapAState("")
      setPriceAState("")
      setAssetBState("");
      setAssetAState("");
      setNewPrice("0");
  }
    
  const LogData = () => {
    const asset_a = assetA;
    const asset_b = assetB;
    const asset_a_price = priceA;
    const asset_b_price = priceB;
    const asset_a_marketcap= marketCapA;
    const asset_b_marketcap = marketCapB;

    dispatch(sessionActions.addLog({ asset_a, asset_b, asset_a_price, asset_b_price, asset_a_marketcap, asset_b_marketcap }))
    }
  
  return (
    <div className="w-screen">
      <div className="flex items-center justify-center">
        <h1 className="font-serif italic text-7xl mt-1 mb-5 font-bold mid:text-7xl">Cap-Dash</h1>
      </div>

      <div className="flex items-center justify-center my-10">
        <div>
          <button onClick={ResetDataPoints} className="bg-neutral-800  hover:bg-neutral-500 text-white font-bold py-2 px-4 rounded text-sm m-1">Reset</button>
          <button onClick={LogData} className="bg-neutral-800  hover:bg-neutral-500 text-white font-bold py-2 px-4 rounded text-sm m-1">Log Data</button>
        </div>
      </div>

           <p className="text-neutral-100 text-xl flex justify-center mt-3">{assetA} currently has a price of: ${priceA}</p>
           <p className="text-neutral-100 text-xl flex justify-center mt-3">And a market capitalization of: ${marketCapA}</p>
           <p className="text-neutral-100 text-xl flex justify-center mt-3">{assetB} has a market capitalization of: ${marketCapB}</p>
           <p className="text-neutral-100 text-xl flex justify-center mt-3">If {assetA} had {assetB}'s market capitalization, it's price would be:${newPrice}</p>
     
      <div className="flex items-center justify-center">
        <h4 className="font-sans text-neutral-100  text-5xl mt-6 m-10 font-bold sm:text-3xl">Select An Asset Class</h4>
      </div>

      <div className="flex items-center justify-center">
      <div>
        <button onClick={setStocks} className="bg-blue-7  hover:bg-indigo-500 text-white font-bold py-4 px-5 rounded text-5xl m-1 mid:py-1 mid:px-2 mid:text-2xl">Stocks</button>
        <button onClick={SetCryptos} className="bg-blue-7  hover:bg-indigo-500 text-white font-bold py-4 px-5 rounded text-5xl m-1 mid:py-1 mid:px-2 mid:text-2xl">Cryptos</button>
      </div>
      </div>

      <div>
        <br></br>amber
      <div className="mx-6 sm:mb-12">
          {cryptoNameArr && 
              cryptoNameArr.map((name => {
                return <button onClick={e => { e.preventDefault(); setNewPrice("0"); setAsset(cryptoData, name); setCryptoDataPoints(fetchCryptoMcAndPrice(cryptoData, name))}} className="bg-blue-7 hover:bg-emerald-900 text-white font-bold py-3 px-4 rounded m-1 text-3xl m-1 sm:py-1 sm:px-2 mid:text-base">{name}</button> 
                }))
          }
          {stockNameArr && 
              stockNameArr.map((name => {
                return <button onClick={e => { e.preventDefault(); setAsset(stockData.stockData, name); setStockDataPoints(fetchStockMcAndPrice(stockData.stockData, name))}} className="bg-blue-7  hover:bg-emerald-900 text-white font-bold py-3 px-4 rounded text-3xl m-1 sm:py-1 sm:px-2 mid:text-base">{name}</button>  
                }))
        }
        </div>
      </div>
    </div>
  );
}

export default Home;