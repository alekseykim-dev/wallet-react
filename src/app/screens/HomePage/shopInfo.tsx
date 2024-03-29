import { Box, Container, Stack } from "@mui/material";
import React from "react";
import Marginer from "../../components/marginer";
import { useHistory } from "react-router-dom";
import useDeviceDetect from "../../../lib/responsiveDetector";



export function Statistics() {
  const { isMobile } = useDeviceDetect();

  if (isMobile()) {
    return null
  } else {
    return (
      <div className="static_frame">
        <Container className="static_width">
          <Stack className="static_frame_static_frame">
            <Stack className="static_box">
              <div className="character_img left"></div>
              <div className="character_text">
                <Box className="static_num">Free Shipping </Box>
                <Box className="static_text">When order over $200</Box>
              </div>
            </Stack>

            <Stack className="static_box">
              <div className="character_img middle"></div>
              <div className="character_text">
                <Box className="static_num">24/7 Support </Box>
                <Box className="static_text">Contact us any time</Box>
              </div>
            </Stack>

            <Stack className="static_box">
              <div className="character_img right"></div>
              <div className="character_text">
                <Box className="static_num">Refund</Box>
                <Box className="static_text">Get refund within 3 days</Box>
              </div>
            </Stack>
            {/* <div className="character_img right"></div> */}
          </Stack>
        </Container>
      </div>
    );
  }
}
