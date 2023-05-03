import { Box, Container, Stack } from "@mui/material";
import React from "react";
import Marginer from "../../components/marginer";

export function Statistics() {
  return (
    <div className="static_frame">
      <Container>
        <Stack className="static_frame_static_frame">
          <Stack className="static_box">
            <div className="character_img left"></div>
            <Box className="static_num">Free Shipping </Box>
            <Box className="static_text">When order over $100</Box>
          </Stack>

          <Stack className="static_box">
            <div className="character_img middle"></div>

            <Box className="static_num">24/7 Support </Box>
            <Box className="static_text">Get support all day</Box>
          </Stack>

          <Stack className="static_box">
            <div className="character_img right"></div>

            <Box className="static_num">Refund</Box>
            <Box className="static_text">Get refund within 3 days</Box>
          </Stack>
          {/* <div className="character_img right"></div> */}
        </Stack>
      </Container>
    </div>
  );
}
