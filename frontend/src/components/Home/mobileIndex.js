import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector, } from 'react-redux';
import { Redirect } from 'react-router-dom';
import cryptoFormatter from './CryptoFormatter.js'
import stockFormatter from './StockFormatter.js'
import CookiesBanner from './CookiesBanner'

//import './style.css'

function MobileHome() {
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
        <img src={require("./Screenshot_2022-12-22_at_11.07.22_PM-removebg-preview.png")} className="w-10/12 mt-20"/>
      </div>

      <div className="flex items-center justify-center my-10">
        <div>
          <button onClick={ResetDataPoints} className="bg-lime-300 hover:bg-neutral-500 text-blue-7 font-bold mx-10 w-64 h-24 text-5xl mb-10">Reset</button>
          <button onClick={LogData} className="bg-lime-300 hover:bg-neutral-500 text-blue-7 font-bold mx-10 w-64 h-24 text-5xl mb-10">Log Data</button>
        </div>
      </div>

           <p className="text-neutral-100 flex justify-center mt-3 text-5xl mt-10"><span className="bg-lime-300 mr-2 text-blue-7 px-3 font-bold">{assetA}</span> currently has a price of: <span className="bg-lime-300 mr-2 text-blue-7 px-3 font-bold h-14">${priceA}</span></p>
           <p className="text-neutral-100 flex flex-wrap justify-center mt-3 text-5xl mt-10 px-28">And a market capitalization of: <span className="bg-lime-300 mr-2 text-blue-7 px-3 font-bold h-14">${marketCapA}</span></p>
           <p className="text-neutral-100 flex justify-center mt-3 text-5xl mt-10 px-28"><span className="bg-lime-300 mr-2 text-blue-7 px-3 font-bold h-14">{assetB}</span> has a market capitalization of: ${marketCapB}</p>
           <p className="text-neutral-100 flex flex-wrap justify-center mt-3 text-5xl mt-10 px-28">If <span className="bg-lime-300 mr-2 text-blue-7 px-3 font-bold h-14">{assetA}</span> had <span className="bg-lime-300 mr-2 text-blue-7 px-3 font-bold h-14">{assetB}'s</span> market capitalization, it's price would be:<span className="bg-lime-300 mr-2 text-blue-7 px-3 font-bold h-14">${newPrice}</span></p>
     
      <div className="flex items-center justify-center mt-14">
        <h4 className="font-sans text-neutral-100 text-5xl">Select An Asset Class</h4>
      </div>

      <div className="flex items-center justify-center">
      <div className="mt-10">
        <button onClick={setStocks} className="bg-blue-7  hover:bg-indigo-500 text-white font-bold w-64 h-24 text-5xl mx-10">Stocks</button>
        <button onClick={SetCryptos} className="bg-blue-7  hover:bg-indigo-500 text-white font-bold w-64 h-24 text-5xl mx-10">Cryptos</button>
      </div>
      </div>

      <div>
        <br></br>amber
      <div className="mx-6 sm:mb-12">
          {cryptoNameArr && 
              cryptoNameArr.map((name => {
                return <button onClick={e => { e.preventDefault(); setNewPrice("0"); setAsset(cryptoData, name); setCryptoDataPoints(fetchCryptoMcAndPrice(cryptoData, name))}} className="bg-blue-7 hover:bg-emerald-900 text-white text-5xl font-bold py-3 px-4 m-3 rounded">{name}</button> 
                }))
          }
          {stockNameArr && 
              stockNameArr.map((name => {
                return <button onClick={e => { e.preventDefault(); setAsset(stockData.stockData, name); setStockDataPoints(fetchStockMcAndPrice(stockData.stockData, name))}} className="bg-blue-7  hover:bg-emerald-900 text-white text-5xl font-bold py-3 px-4 m-3 rounded">{name}</button>  
                }))
        }
        </div>
      </div>
      <CookiesBanner />
    </div>
  );
}


export default MobileHome;