import React from "react";
import { Box, Container, Stack } from "@mui/material";

import { Swiper, SwiperSlide } from "swiper/react";

import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
SwiperCore.use([Autoplay, Navigation, Pagination]);

export function Events() {
  const events_list = [
    {
      title: "The best restaurant",
      desc: "Get a piece of unforgettable experience",
      author: "Alex",
      date: "2023/02/01",
      location: "Busan, Haeundae",
      img: "/restaurant/boyinfood.png",
    },
    {
      title: "Apple Restaurant",
      desc: "Come and win an iPad!",
      author: "Steve Jobs",
      date: "2023/07/25",
      location: "California",
      img: "/restaurant/boyinfood.png",
    },
    {
      title: "dare to try the most delicious food",
      desc: "Grand open 50% discount",
      author: "Chicken House",
      date: "2022/12/10",
      location: "Seoul, Gangnam",
      img: "/restaurant/boyinfood.png",
    },
    {
      title: "Sushi Japan",
      desc: "The most authentic sushi you will ever taste",
      author: "Takashi Kitano",
      date: "2022/11/11",
      location: "Tokyo, Shibuya",
      img: "/restaurant/boyinfood.png",
    },
  ];

  return (
    <div className={"events_frame"}>
      <Container sx={{ overflow: "hidden" }}>
        <Stack className={"events_main"}>
          <Box className={"events_text"}>
            <span className={"category_title"}>Events</span>
          </Box>
          <Box className={"prev_next_frame"}>
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
            slidesPerView={"auto"}
            centeredSlides={true}
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
            {events_list.map((value, number) => {
              return (
                <SwiperSlide className={"events_info_frame"} key={number}>
                  <div className={"events_img"}>
                    <img
                      src={value.img}
                      className={"events_img"}
                      alt="events"
                    />
                  </div>
                  <Box className={"events_desc"}>
                    <Box className={"events_bott"}>
                      <Box className={"bott_left"}>
                        <div className={"event_title_speaker"}>
                          <strong>{value.title}</strong>
                          <div className={"event_organizator"}>
                            <img
                              src={"/icons/speaker.svg"}
                              style={{ width: "20px", marginRight: "10px" }}
                              alt="icon"
                            />
                            <p className={"spec_text_author"}>{value.author}</p>
                          </div>
                        </div>

                        <p
                          className={"text_desc"}
                          style={{ marginTop: "10px" }}
                        >
                          {value.desc}
                        </p>

                        <div
                          className={"bott_info"}
                          style={{ marginTop: "10px" }}
                        >
                          <div className={"bott_info_main"}>
                            <img
                              src={"/icons/calendar.svg"}
                              style={{ marginRight: "10px" }}
                              alt="icon"
                            />
                            {value.date}
                          </div>
                          <div className={"bott_info_main"}>
                            <img
                              src={"/icons/location.svg"}
                              style={{ marginRight: "10px" }}
                              alt="icon"
                            />
                            {value.location}
                          </div>
                        </div>
                      </Box>
                    </Box>
                  </Box>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Stack>
      </Container>
    </div>
  );
}
