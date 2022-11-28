const { polygonApiKey } = require('../config');
const fetch = require('node-fetch');

const getAllCryptoAssetNames = (date) => {
    const url = 'https://api.polygon.io/v2/aggs/grouped/locale/global/market/crypto/' + date + '?adjusted=true&apiKey=wAWqnRBqf9R7cVMwZaZb_r5kt4psQU6c'
    
    const arr =fetch(
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

module.exports = { getAllCryptoAssetNames };