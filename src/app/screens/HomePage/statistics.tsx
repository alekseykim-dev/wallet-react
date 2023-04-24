import { Box, Container, Stack } from "@mui/material";
import React from "react";
import Marginer from "../../components/marginer";

export function Statistics() {
  return (
    <div className="static_frame">
      <Container>
        <Stack
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          style={{ height: "236px" }}
        >
          <div className="character_img left"></div>
          <Stack className="static_box">
            <Box className="static_num">12</Box>
            <Box className="static_text">Restaurants</Box>
          </Stack>
          <Marginer direction="vertical" height="64" width="2" bg="#E3C08D" />
          <Stack className="static_box">
            <Box className="static_num">8</Box>
            <Box className="static_text">Years of experience</Box>
          </Stack>
          <Marginer direction="vertical" height="64" width="2" bg="#E3C08D" />
          <Stack className="static_box">
            <Box className="static_num">50+</Box>
            <Box className="static_text">Menu dishes</Box>
          </Stack>
          <Marginer direction="vertical" height="64" width="2" bg="#E3C08D" />
          <Stack className="static_box">
            <Box className="static_num">200+</Box>
            <Box className="static_text">Users</Box>
          </Stack>
            <div className="character_img right"></div>
        </Stack>
      </Container>
    </div>
  );
}
