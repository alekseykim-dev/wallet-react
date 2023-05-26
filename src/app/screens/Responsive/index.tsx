import React, { useEffect } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import useDeviceDetect from "../../../lib/responsiveDetector";
import { NavLink } from "react-router-dom";

export function Responsive(props: any) {
  const { isMobile } = useDeviceDetect();


  if (isMobile()) {
    return (
      <div className="under-construction">
        <img className="back00" src="/icons/bit_back4.svg" alt="" />
        <img className="back01" src="/icons/bit_back4.svg" alt="" />

        <h1 style={{ zIndex: "1" }} >
          Mobile version is on its way
        </h1>
        <h1 style={{ zIndex: "1" }} className="construction">
          Have the best experience using our desktop version👨‍💻⚡️
        </h1>

        {/* <h1 className="jump-animation">Mobile version is on its way</h1> */}
        <div className="crypto-logo"></div>
      </div>
    );
  } else {
    return null;
  }
}
