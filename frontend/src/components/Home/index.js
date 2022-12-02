import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

function Home() {
  const dispatch = useDispatch();
  let nameArr =[];
  const cryptos = useSelector(state => state.session.cryptos);
  
    if (cryptos === null) {
      dispatch(sessionActions.getCryptoNames())
      //return <Redirect to="/" />
  } else {
    nameArr = cryptos.assets
  }
  return (
    <div>
        <p>Hello</p>
          {nameArr && 
              nameArr.map((name => {
                name = name.split('USD')[0]
                return <button>{name}</button> 
                }))
          }
    </div>
  );
}

export default Home;