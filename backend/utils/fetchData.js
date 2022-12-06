const { polygonApiKey, cmcApiKey } = require('../config');
const fetch = require('node-fetch');

const getAllCryptoAssetNames = (date) => {
    const url = 'https://api.polygon.io/v2/aggs/grouped/locale/global/market/crypto/' + date + '?adjusted=true'
    
    const arr = fetch(
  url,
  {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + polygonApiKey,
      "Content-Type": "application/json",
    },
  }
)
  .then((response) => response.json())
  .then(async(data) => {
      const nameArr = [];
      await data['results'].forEach((result) => {
          const nameStr = result["T"];
          const splitStr = nameStr.split("X:")
          nameArr.push(splitStr[1]);
      })
      return nameArr;
  })

    return arr
}

// Returns an array that contains the price and marketcap of a specific asset, [price, marketcap]
const getCryptoData = (symbol) => {
    const url = 'https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=' + symbol;
                
    const assetData = fetch(
  url,
  {
    method: "GET",
    headers: {
      "X-CMC_PRO_API_KEY": cmcApiKey,
      "Content-Type": "application/json",
    },
  }
)
  .then((response) => response.json())
  .then((data) => {
      console.log(JSON.stringify(data));
      const newData = data;
      const dataArr = []
      dataArr[0] = Object.values(newData)[1][symbol][0]['quote']['USD'].price
      dataArr[1] = Object.values(newData)[1][symbol][0]['quote']['USD'].market_cap
      return dataArr
  });
    return assetData;
}

const getAllCryptoData = () => {
    const url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest';
                
    const assetData = fetch(
  url,
  {
    method: "GET",
    headers: {
      "X-CMC_PRO_API_KEY": cmcApiKey,
      "Content-Type": "application/json",
    },
  }
)
  .then((response) => response.json())
  .then((data) => {
    console.log(JSON.stringify(data));
    return data;
  });
    return assetData;
}

// fetches the LAST CLOSE price of the stock
const getStockPrice = (symbol) => {
    const url = 'https://api.polygon.io/v2/aggs/ticker/' + symbol + '/prev?adjusted=true'
    const price = fetch(
  url,
  {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + polygonApiKey,
      "Content-Type": "application/json",
    },
  }
)
  .then((response) => response.json())
  .then((data) => {
      return data['results'][0]['c']
  });

  return price
}

const getStockMarketCap = (symbol) => {
  const url = 'https://api.polygon.io/v3/reference/tickers/' + symbol;
                
  const price = fetch(
    url,
    {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + polygonApiKey,
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      return data.results.market_cap
    });
  return price;
}

const getStockAssetNames = (date) => {
  const url = 'https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/' + date;
                
  const arr = fetch(
  url,
  {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + polygonApiKey,
      "Content-Type": "application/json",
    },
  }
)
  .then((response) => response.json())
  .then((data) => {
      let count = 0;
      const nameArr = [];
       data['results'].forEach((result) => {
        if (count < 150 ) {
          const nameStr = result["T"];
          nameArr.push(nameStr);
         count++
       }
       })
      return nameArr
  });
  return arr;
}

module.exports = { getAllCryptoAssetNames, getCryptoData, getStockPrice, getStockMarketCap, getStockAssetNames, getAllCryptoData };