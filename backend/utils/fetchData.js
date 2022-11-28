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

const getCryptoPrice = (symbol) => {
    const url = 'https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=' + symbol;
                
    const price = fetch(
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
      const newData = data;
      return Object.values(newData)[1][symbol][0]['quote']['USD'].price
  });
    return price;
}

const getCryptoMarketCap = (symbol) => {
    const url = 'https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=' + symbol;
                
    const price = fetch(
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
      const newData = data;
      return Object.values(newData)[1][symbol][0]['quote']['USD'].market_cap
  });
    return price;
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
      console.log(nameArr);
      return nameArr
  });
  return arr;
}

module.exports = { getAllCryptoAssetNames, getCryptoPrice, getCryptoMarketCap, getStockPrice, getStockMarketCap, getStockAssetNames };