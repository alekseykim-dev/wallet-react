import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, Container, Stack } from "@mui/material";

const Coins = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [showAllCoins, setShowAllCoins] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      );
      setCryptoData(result.data);
    };
    fetchData();
  }, []);

  const coinsToRender = showAllCoins ? cryptoData : cryptoData.slice(0, 10);

  const handleShowAllCoins = () => {
    setShowAllCoins(!showAllCoins);
  };


  const [isHovered1, setIsHovered1] = useState(false);

  const handleMouseEnter1 = () => {
    setIsHovered1(true);
  };

  const handleMouseLeave1 = () => {
    setIsHovered1(false);
  };
  return (
    <div className="coin_frame">
      
      <Stack flexDirection={"column"} alignItems={"center"}>
        <Box className="category_title_coin">Real-time Crypto Updates</Box>

        <Container
          style={{
            maxWidth: "1250px",
            marginTop: "40px",
            zIndex: "1",
            marginBottom: "20px"
          }}
        >
          <div className="coin-wrapper">
            <div className="coin-container">
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
                    <th className="coins-right">ATH Change</th>
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
                      <td className="coins-right">
                        {coin.symbol.toUpperCase()}
                      </td>
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
                            coin.price_change_percentage_24h >= 0
                              ? "green"
                              : "red",
                        }}
                      >
                        {coin.price_change_percentage_24h.toFixed(2)}%
                      </td>
                      <td className="coins-right">
                        ${coin.high_24h.toLocaleString()}
                      </td>
                      <td className="coins-right">
                        ${coin.low_24h.toLocaleString()}
                      </td>
                      <td className="coins-right">
                        ${coin.ath.toLocaleString()}
                      </td>
                      <td
                        className="coins-right"
                        style={{
                          color:
                            coin.ath_change_percentage >= 0 ? "green" : "red",
                        }}
                      >
                        {coin.ath_change_percentage.toFixed(2)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {cryptoData.length > 10 && (
                <Box style={{ textAlign: "center", marginBottom: "30px" }}>
                  <Button
                    className="nav_button"
                    variant="contained"
                    style={{
                      color: isHovered1 ? "#fff" : "#000",
                      opacity: isHovered1 ? 0.7 : 1,
                      backgroundColor: isHovered1 ? "#000000d0" : "#d7b686",
                    }}
                    onClick={handleShowAllCoins}
                    onMouseEnter={handleMouseEnter1}
                    onMouseLeave={handleMouseLeave1}
                  >
                    {showAllCoins ? "Show Top 10" : "Show Top 100"}
                  </Button>
                </Box>
              )}
            </div>
          </div>
        </Container>
      </Stack>
    </div>
  );
};

export default Coins;
