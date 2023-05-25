import React, { useRef } from "react";
import { Box, Container, Stack } from "@mui/material";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { Swiper, SwiperSlide } from "swiper/react";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";


import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";

import { CssVarsProvider } from "@mui/joy/styles";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveTopShops } from "./selector";
import { Shop } from "../../../types/user";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";
import { color } from "framer-motion";
import useDeviceDetect from "../../../lib/responsiveDetector";

/** REDUX SELECTOR */

const topShopRetriever = createSelector(
  // will recompute the output if the input has changed
  retrieveTopShops, // improves the performance since re-renders less
  (topShops) => ({
    topShops: topShops,
  })
);

SwiperCore.use([Autoplay, Navigation, Pagination]);

export function TopShops() {
  /** INITIALIZATIONS */
  const history = useHistory();
  const { topShops: topShops } = useSelector(topShopRetriever);
  // selector : takes data from store
  console.log("topShops:::", topShops);

  const refs: any = useRef([]);

  /** HANDLERS */
  const chosenShopHandler = (id: string) => {
    history.push(`/shop/${id}`);
  };
const { isMobile } = useDeviceDetect();
 const handleClickOpenAlert = () => {
   history.push("/construction");
 };
  if (isMobile()) {
    return (
      <div className="top_shop_frame">
        <Container>
          <Stack
            flexDirection={"column"}
            alignItems={"center"}
            sx={{ mt: "45px" }}
          >
            <Box className="category_title">
              Find your perfect wallet
            </Box>
            <Box className={"prev_next_frame1"}>
              <img
                src={"/icons/left_arrow.svg"}
                className={"swiper-button-prev"}
                style={{ cursor: "pointer", color: "black" }}
                alt="arrow"
              />
              <div className={"dot_frame_pagination swiper-pagination"}></div>
              <img
                src={"/icons/left_arrow.svg"}
                className={"swiper-button-next"}
                style={{
                  transform: "rotate(-180deg)",
                  cursor: "pointer",
                  color: "black",
                }}
                alt="arrow"
              />
            </Box>
            <Swiper
              className={"swiper-wrapper"}
              slidesPerView={1}
              spaceBetween={20} // space between sliders
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              pagination={{
                el: ".swiper-pagination",
                clickable: true,
              }}
              autoplay={{
                delay: 2000,
                disableOnInteraction: true, //slider stops when touch it
              }}
            >
              {topShops.map((ele: Shop, index: number) => {
                const image_path = `${serverApi}/${ele.mb_image}`;
                return (
                  <SwiperSlide
                    key={ele._id}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                    className="card"
                  >
                    <CssVarsProvider>
                      <Card
                        className={"swiper-width"}
                        style={{ borderRadius: "10px" }}
                        onClick={() => chosenShopHandler(ele._id)}
                        ref={(ref) => (refs.current[index] = ref)}
                      >
                        <CardCover
                          style={{ borderRadius: "10px" }}
                        >
                          <img
                            style={{
                              borderRadius: "10px",
                            }}
                            src={image_path}
                            loading="lazy"
                            alt="store"
                          />
                        </CardCover>
                        <CardCover
                          className="card_swiper"
                          sx={{
                            borderRadius: "10px",
                            background:
                              "linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px)",
                          }}
                        />
                        <CardContent className="card_style">
                          <Typography
                            level="h2"
                            fontSize="lg"
                            textColor="#fff"
                            mb={1}
                          >
                            {ele.mb_nick}
                          </Typography>
                          <Typography></Typography>
                        </CardContent>
                      </Card>
                    </CssVarsProvider>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </Stack>
        </Container>
      </div>
    );
  } else {
    return (
      <div className="top_shop_frame">
        <Container>
          <Stack
            flexDirection={"column"}
            alignItems={"center"}
            sx={{ mt: "45px" }}
          >
            <Box className="category_title">
              Find your perfect wallet
              <img className="back" src="/icons/bit_back3.svg" alt="" />
              <img className="back1" src="/icons/bit_back4.svg" alt="" />
              <img className="back2" src="/icons/bit_back3.svg" alt="" />
              <img className="back3" src="/icons/bit_back4.svg" alt="" />
              <img className="back6" src="/icons/bit_back4.svg" alt="" />
              <img className="back7" src="/icons/bit_back4.svg" alt="" />
            </Box>
            <Box className={"prev_next_frame1"}>
              <img
                src={"/icons/left_arrow.svg"}
                className={"swiper-button-prev"}
                style={{ cursor: "pointer", color: "black" }}
                alt="arrow"
              />
              <div className={"dot_frame_pagination swiper-pagination"}></div>
              <img
                src={"/icons/left_arrow.svg"}
                className={"swiper-button-next"}
                style={{
                  transform: "rotate(-180deg)",
                  cursor: "pointer",
                  color: "black",
                }}
                alt="arrow"
              />
            </Box>
            <Swiper
              className={"swiper-wrapper"}
              slidesPerView={2}
              spaceBetween={20} // space between sliders
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              pagination={{
                el: ".swiper-pagination",
                clickable: true,
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: true, //slider stops when touch it
              }}
            >
              {topShops.map((ele: Shop, index: number) => {
                const image_path = `${serverApi}/${ele.mb_image}`;
                return (
                  <SwiperSlide
                    key={ele._id}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                    className="card"
                  >
                    <CssVarsProvider>
                      <Card
                        className={"swiper-width"}
                        style={{ borderRadius: "10px 0px 0px 10px" }}
                        onClick={() => chosenShopHandler(ele._id)}
                        ref={(ref) => (refs.current[index] = ref)}
                      >
                        <CardCover style={{ borderRadius: "10px 0px 0px 10px" }}>
                          <img
                            style={{
                              borderRadius: "10px 0px 0px 10px",
                            }}
                            src={image_path}
                            loading="lazy"
                            alt="store"
                          />
                        </CardCover>
                        <CardCover
                          className="card_swiper"
                          sx={{
                            borderRadius: "10px 0px 0px 10px",
                            background:
                              "linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px)",
                          }}
                        />
                        <CardContent className="card_style">
                          <Typography
                            level="h2"
                            fontSize="lg"
                            textColor="#fff"
                            mb={1}
                          >
                            {ele.mb_nick}
                          </Typography>
                          <Typography></Typography>
                        </CardContent>
                      </Card>
                      <Card
                        className="card_desc"
                        style={{
                          width: "270px",
                          background: "#000000d0",
                          color: "white",
                          borderRadius: "0px 10px 10px 0px",
                          cursor: "pointer",
                        }}
                        onClick={() => chosenShopHandler(ele._id)}
                        ref={(ref) => (refs.current[index] = ref)}
                      >
                        <h2 style={{ marginTop: "3px" }}>Brand info:</h2>
                        {ele.mb_description}
                        <p>
                          <StarIcon style={{ color: "#F2BD57" }} />
                          <StarIcon style={{ color: "#F2BD57" }} />
                          <StarIcon style={{ color: "#F2BD57" }} />
                          <StarIcon style={{ color: "#F2BD57" }} />
                          <StarIcon style={{ color: "#F2BD57" }} />
                        </p>
                        <p style={{ padding: "0px", margin: "0px" }}>
                          Production of {ele.mb_address}
                        </p>
                      </Card>
                    </CssVarsProvider>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </Stack>
        </Container>
      </div>
    );
  }
}
