import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import './Home.css';

function HomePage() {
  const dispatch = useDispatch();
  const sessionStocks = useSelector(state => state.session.stockNames)
    
    if (sessionStocks === null) {
       dispatch(sessionActions.setNamesStocks())
  }
  
    const stocks = sessionStocks;
  return (
    <div>
       <h2>Capdash</h2>
       <div className="first-container">
           {stocks.map((name => {
              return <button>{name}</button>
           }))}
        </div>
    </div>
  );
}

export default HomePage;