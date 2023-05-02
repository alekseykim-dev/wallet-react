import React, { useRef } from "react";
import { Box, Container, Stack } from "@mui/material";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { Swiper, SwiperSlide } from "swiper/react";


import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";

import { CssVarsProvider } from "@mui/joy/styles";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveTopShops } from "./selector";
import { Shop } from "../../../types/user";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";

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


  return (
    <div className="top_shop_frame">
      <Container>
        <Stack
          flexDirection={"column"}
          alignItems={"center"}
          sx={{ mt: "45px" }}
        >
          <Box className="category_title">
            Recommended Shops
            <img className="back" src="/icons/bit_back1.svg" alt="" />
            <img className="back1" src="/icons/bit_back2.svg" alt="" />
          </Box>
          <Box className={"prev_next_frame1"}>
            <img
              src={"/icons/arrow-left.svg"}
              className={"swiper-button-prev"}
              style={{ cursor: "pointer" }}
              alt="arrow"
            />
            <div className={"dot_frame_pagination swiper-pagination"}></div>
            <img
              src={"/icons/arrow-left.svg"}
              className={"swiper-button-next"}
              style={{ transform: "rotate(-180deg)", cursor: "pointer" }}
              alt="arrow"
            />
          </Box>
          <Swiper
            className={"events_info swiper-wrapper"}
            slidesPerView={3}
            spaceBetween={30} // space between sliders
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
                <SwiperSlide key={ele._id}>
                  <CssVarsProvider>
                    <Card
                      onClick={() => chosenShopHandler(ele._id)}
                      sx={{
                        minHeight: "340px",
                        minWidth: 315,
                        cursor: "pointer",
                      }}
                      ref={(ref) => (refs.current[index] = ref)}
                    >
                      <CardCover>
                        <img src={image_path} loading="lazy" alt="store" />
                      </CardCover>
                      <CardCover
                        sx={{
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
                        <Typography textColor="neutral.300">
                          {ele.mb_address}
                        </Typography>
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
}
