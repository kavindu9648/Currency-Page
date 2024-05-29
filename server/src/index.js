const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/getCurrencyNames", async (req, res) => {
  const nameURL =
    "https://openexchangerates.org/api/currencies.json?app-id=cbd99dbd9ea94d9c8da2fc04696e1f6e";

  const namesResponce = await axios.get(nameURL);
  const nameData = namesResponce.data;

  return res.json(nameData);

  try {
  } catch (err) {
    console.error(err);
  }
});

app.get("/convert", async (req, res) => {
  const { date, sourceCurrency, targetCurrency, amountInSourceCurrency } =
    req.query;
  try {
    const dataUrl =
      "https://openexchangerates.org/api/historical/${date}.json?app-id=cbd99dbd9ea94d9c8da2fc04696e1f6e";
    const dataResponce = await axios.get(dataUrl);
    const rates = dataResponce.data.rates;

    const sourceRate = rates[sourceCurrency];
    const targetRate = rates[targetCurrency];

    const targetAmount = (targetRate / sourceRate) * amountInSourceCurrency;

    return res.json(targetAmount.toFixed(2));
  } catch (err) {
    console.error(err);
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 5000");
});
