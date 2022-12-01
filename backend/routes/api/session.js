const express = require('express');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { CMC_API_KEY, polygonApiKey } = require('../../config');
const { getAllCryptoAssetNames, getCryptoData, getStockPrice, getStockMarketCap, getStockAssetNames } = require('../../utils/fetchData')
const router = express.Router();


const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors
];

// Log in
router.post(
    '/',
    validateLogin,
  async (req, res, next) => {
    const { credential, password } = req.body;

    const user = await User.login({ credential, password });

    if (!user) {
      const err = new Error('Login failed');
      err.status = 401;
      err.title = 'Login failed';
      err.errors = ['The provided credentials were invalid.'];
      return next(err);
    }

    await setTokenCookie(res, user);

    return res.json({
      user
    });
  }
);

// Log out
router.delete(
  '/',
  (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
  }
);

// Restore session user
router.get(
  '/',
  restoreUser,
  (req, res) => {
    const { user } = req;
    if (user) {
      return res.json({
        user: user.toSafeObject()
      });
    } else return res.json({});
  }
);

router.get(
  '/fetch-crypto-asset-names',
  async (req, res) => {
    const todaysDate = new Date()
    const yesterday = todaysDate;
    yesterday.setDate(yesterday.getDate() - 1)
    const formattedDate = yesterday.toISOString().slice(0, -14)
    const assets = await getAllCryptoAssetNames(formattedDate)
    return res.json({assets});
  }
);

// Get market cap of crypto asset
router.post(
    '/fetch-crypto-data',
  async (req, res, next) => {
    const { symbol } = req.body;
    const marketcap = await getCryptoData(symbol)
    return res.json({
      marketcap
    });
  }
);

// Get price of stock asset
router.post(
    '/fetch-stock-price',
  async (req, res, next) => {
    const { symbol } = req.body;
    const price = await getStockPrice(symbol)
    return res.json({
      price
    });
  }
);

// Get the market cap of stock asset
router.post(
    '/fetch-stock-marketcap',
  async (req, res, next) => {
    const { symbol } = req.body;
    const marketcap = await getStockMarketCap(symbol)
    return res.json({
      marketcap
    });
  }
);

router.post(
  '/fetch-stock-asset-names',
  async (req, res, next) => {
    const { date } = req.body;
    const stockSymbols = await getStockAssetNames(date)
    return res.json({
      stockSymbols
    });
  }
);

module.exports = router;