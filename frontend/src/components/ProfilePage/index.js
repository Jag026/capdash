import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector, } from 'react-redux';
import { Redirect } from 'react-router-dom';


function ProfilePage() {  
  const sessionUser = useSelector(state => state.session.user);
  const sessionLogs = useSelector(state => state.session.logs);
  const user = sessionUser;
  const dispatch = useDispatch();

  const [logs, setLogs] = useState();
  const [userId, setuserId] = useState(user.id);

  if (!sessionLogs) {
    dispatch(sessionActions.getLogs({ userId }))
  }
  
  const showLogs = (e) => {
    e.preventDefault();
   setLogs(JSON.stringify(sessionLogs["logs"]))
  }  

  return (
    <div>
     <div>
      <p className="text-xl p-3 mt-2">user: {user.username}</p>
     </div>
     <div>
       <button onClick={showLogs} className="bg-neutral-800  hover:bg-neutral-500 text-white font-bold py-1 px-3 rounded text-sm mx-4 mb-3">Show Logs</button>
     </div>
     <div>
          {logs && 
          JSON.parse(logs).map((log => {
            const assetASymbol = JSON.stringify(log["asset_a"])
            const assetAPrice = JSON.stringify(log["asset_a_price"])
            const assetAMarketCap = JSON.stringify(log["asset_a_marketcap"])
            const assetBSymbol = JSON.stringify(log["asset_b"])
            const assetBPrice = JSON.stringify(log["asset_b_price"])
            const assetBMarketCap = JSON.stringify(log["asset_b_marketcap"])
            let circulatingSupply = Number(log["asset_a_marketcap"].split(",").join("")) / log["asset_a_price"]
            let newPrice = Number(log["asset_b_marketcap"].split(",").join("")) / circulatingSupply
            //let circulatingSupply = Number(assetAMarketCap.split(",").join("")) / Number(assetAPrice);
            log = JSON.stringify(log)
            return <div>
     <div className="flex items-center justify-center mt-10">
      <table class="table-auto w-auto text-center">
       <thead>
         <tr>
          <th class="px-4 py-2"></th>
           <th class="px-4 py-2">Asset A</th>
           <th class="px-4 py-2">Asset B</th>
         </tr>
       </thead>
       <tbody>
         <tr>
           <td className="border px-4 py-2 text-red">Symbol</td>
           <td className="border px-4 py-2 text-red">{assetASymbol}</td>
           <td className="border px-4 py-2 text-red">{assetBSymbol}</td>
         </tr>
         <tr>
           <td className="border px-4 py-2 text-red">Price</td>
           <td className="border px-4 py-2 text-red">{assetAPrice}</td>
           <td className="border px-4 py-2 text-red">{assetBPrice}</td>
         </tr>
         <tr>
           <td className="border px-4 py-2">Market Cap</td>
            <td className="border px-4 py-2 text-red">{assetAMarketCap}</td>
           <td className="border px-4 py-2 text-red">{assetBMarketCap}</td>
         </tr>
         <tr>
          <td className="border px-4 py-2 text-red">Potential Price</td>
          <td className="border px-4 py-2 text-red">{newPrice.toFixed(2)}</td>
         </tr>
       </tbody>
      </table>
     </div>
              </div>
                }))
          }
     </div>
   </div>
  );
}

export default ProfilePage;