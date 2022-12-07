const { polygonApiKey, cmcApiKey } = require('../config');
const fetch = require('node-fetch');
const cheerio = require('cheerio');

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

const getStockData = async () => {
  // get html text from reddit
  const response = await fetch('https://companiesmarketcap.com/');
  // using await to ensure that the promise resolves
  const body = await response.text();

  // parse the html text and extract titles
  const $ = cheerio.load(body);
  const titleList = [];
    
  // using CSS selector  
    $('tbody').each((i, title) => {
    const titleNode = $(title);
    const titleText = titleNode.text();
    // console.log(titleText);
    titleList.push(titleText)
  });

    let newArr = JSON.stringify(titleList).split("\\n").filter(ele => ele !== '').filter(ele => ele !== ' ').filter(ele => ele !== '["').filter(ele => ele !== '  ');
    let objArr = []
    let i = 0;

    while (i < newArr.length) {
        objArr.push({
            'name': newArr[i + 1],
            'symbol': newArr[i + 2],
            'marketcap': newArr[i + 3],
            'price': newArr[i + 4],
            'today': newArr[i + 5],
            'country': newArr[i + 6]
        })
        i += 7;
    }
return objArr
};

module.exports = { getAllCryptoAssetNames, getCryptoData, getStockPrice, getStockMarketCap, getStockAssetNames, getAllCryptoData, getStockData };