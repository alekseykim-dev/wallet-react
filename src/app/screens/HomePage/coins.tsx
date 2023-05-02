import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button } from "@mui/material";

const Coins = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [showAllCoins, setShowAllCoins] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false"
      );
      setCryptoData(result.data);
    };
    fetchData();
  }, []);

  const coinsToRender = showAllCoins ? cryptoData : cryptoData.slice(0, 10);

  const handleShowAllCoins = () => {
    setShowAllCoins(!showAllCoins);
  };

  return (
    <div className="coin-wrapper">
      <table className="coins-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Coin</th>
            <th className="coins-right">Symbol</th>
            <th className="coins-right">Price</th>
            <th className="coins-right">Market Cap</th>
            <th className="coins-right">24h Change</th>
            <th className="coins-right">24h High</th>
            <th className="coins-right">24h Low</th>
            <th className="coins-right">All-time High</th>
          </tr>
        </thead>
        <tbody>
          {coinsToRender.map((coin: any) => (
            <tr key={coin.id}>
              <td>{coin.market_cap_rank}</td>
              <td className="coin-img-wrapper">
                <img
                  className="coin-img"
                  src={coin.image}
                  alt={`${coin.image}`}
                  width="24"
                  height="24"
                />{" "}
                {coin.name}
              </td>
              <td className="coins-right">{coin.symbol.toUpperCase()}</td>
              <td className="coins-right">
                ${coin.current_price.toLocaleString()}
              </td>
              <td className="coins-right">
                ${coin.market_cap.toLocaleString()}
              </td>
              <td
                className="coins-right"
                style={{
                  color:
                    coin.price_change_percentage_24h >= 0 ? "green" : "red",
                }}
              >
                {coin.price_change_percentage_24h.toFixed(2)}%
              </td>
              <td className="coins-right">${coin.high_24h.toLocaleString()}</td>
              <td className="coins-right">${coin.low_24h.toLocaleString()}</td>
              <td className="coins-right">${coin.ath.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {cryptoData.length > 10 && (
        <Box textAlign="center" py={2}>
          <Button onClick={handleShowAllCoins}>
            {showAllCoins ? "Show less" : "Show all"}
          </Button>
        </Box>
      )}
    </div>
  );
};

export default Coins;
