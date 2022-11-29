import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import './Home.css';

function HomePage() {
  const dispatch = useDispatch();
  const sessionStocks = useSelector(state => state.session.stockNames)
  const sessionCryptos = useSelector(state => state.session.cryptoNames)
  let stocks = sessionStocks;
  let cryptos = sessionCryptos;
  return (
    <div>
      <div className="first-container">
           {stocks.map((name => {
              return <button>{name}</button>
           }))}
      </div>
      <div>
          <h2>Capdash</h2>
      </div>
      <div className="second-container">
           {cryptos.assets.map((name => {
              return <button>{name}</button>
           }))}
        </div>
    </div>
  );
}

export default HomePage;