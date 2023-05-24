import React from "react";
import { Box, Container, Button, Stack } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import { useHistory } from "react-router-dom";

SwiperCore.use([Autoplay, Navigation, Pagination]);


export function Experts() {
  const events_list = [
    {
      job: "Co-founder of Ethereum",
      desc: ` "The main advantage of cold storage is that it makes it much harder for hackers to steal your assets. With a cold wallet, your private keys are stored offline, making them much less vulnerable to attacks"`,
      author: "Vitalik Buterin",
      article: " - Vitalik Buterin, in an interview with Decrypt in 2021.",
      img: "/community/buterin.jpg",
    },
    {
      job: "CEO of Tesla, SpaceX, Neuralink, and Twitter",
      desc: `"It's very important to have a crypto wallet that you own and control, ideally with your own node."`,
      author: "Elon Musk",
      date: "2021/02/01",
      article: " - Elon Musk replying to a tweet on Twitter in February 2021.",
      img: "/community/elon.jpeg",
    },
    {
      job: "CEO of Microstrategy",
      desc: `"The most secure way to store your bitcoin is in a cold storage wallet. A cold storage wallet is a device that is not connected to the internet, which means it's not vulnerable to online hacks."`,
      author: "Michael Saylor",
      article:
        " -Michael Saylor in an interview with CNBC on February 24, 2021.",
      img: "/community/michael.jpg",
    },
    {
      job: "Crypto analyst, creator of stock-to-flow (S2F) model",
      desc: `"Investors are finally recognizing that bitcoin is not just a high-risk, speculative asset, but an investable, safe-haven asset that belongs in any diversified portfolio. 
        However, you need to take your own responsibility and custody your bitcoin, preferably in a cold wallet."`,
      author: "Plan B",
      date: "2021/02/01",
      article: " - Plan B in an interview with Kitco News on December 17 2020.",
      img: "/community/planb.jpg",
    },
  ];
  

  const history = useHistory();

  const handleContainerClick = () => {
    history.push("/community");
  };
  

  return (
    <div className="review_for_shop">
      <div className="review_container" style={{display: "flex", width: "100%"}}>
        <Box className={"category_title_review"}>Food For Thought</Box>
        
        <Swiper
          className={"swiper-wrapper"}
          slidesPerView={1}
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
            delay: 6000,
            disableOnInteraction: true, //slider stops when touch it
          }}
        >
          {events_list.map((value, number) => {
            return (
              <SwiperSlide key={number}>
                <div onClick={handleContainerClick}>
                  <Stack className="review_wrapper">
                    <Box className="review_left">
                      <Box className="img_wrapper">
                        <img src={value.img} className="review_img" />
                      </Box>
                    </Box>
                    <Stack className="review_right">
                      <Box>
                        <p className="review_title">{value.author}</p>
                        <p className="review_title_p">{value.job}</p>
                      </Box>
                      <Box className="review_text">{value.desc}</Box>
                      <Box className="review_text_auth">{value.article}</Box>
                    </Stack>
                  </Stack>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
