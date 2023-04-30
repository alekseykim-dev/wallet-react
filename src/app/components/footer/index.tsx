import { Box, Container, Stack } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";


export function Footer() {
  return (
    <div className="footer_config">
      <Container>
        <Stack flexDirection={"column"} className="main_footer_container">
          <Stack flexDirection={"row"} style={{ height: "242px" }}>
            <Stack className="info" flexDirection={"column"}>
              <Box>
                <img src="/icons/Logo.svg" alt="logo"></img>
              </Box>
              <Box className="main_text">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Et,
                corrupti quis. Quidem voluptatum temporibus.
              </Box>
              <Stack className="contact_links">
                <Box>
                  <a href="https://youtu.be/EOK6_cX35QM">
                    <img src="/icons/facebook.svg" alt="facebook" />
                  </a>
                </Box>
                <Box>
                  <a href="https://youtu.be/EOK6_cX35QM">
                    <img src="/icons/twitter.svg" alt="twitter" />
                  </a>
                </Box>
                <Box>
                  <a href="https://youtu.be/cU0Wz1ez3J0">
                    <img src="/icons/instagram.svg" alt="instagram" />
                  </a>
                </Box>
                <Box>
                  <a href="https://youtu.be/cU0Wz1ez3J0">
                    <img src="/icons/youtube.svg" alt="youtube" />
                  </a>
                </Box>
              </Stack>
            </Stack>
            <Stack className="parts">
              <Box className="part_subject">Content</Box>
              <Box className="divider"></Box>
              <Box className="targets target" sx={{ mt: "5px" }}>
                <NavLink to="/">Home</NavLink>
              </Box>
              <Box className="targets">
                <NavLink to="/shop">Stores</NavLink>
              </Box>
              <Box className="targets">
                <NavLink to="/community">Community</NavLink>
              </Box>
              <Box className="targets">
                <NavLink to="/help">Help</NavLink>
              </Box>
            </Stack>
            <Stack className="find_us">
              <Box className="find">Contact us</Box>
              <Box className="divider"></Box>
              <Stack className="details" sx={{ mt: "19px" }}>
                <Box className="detail_first">L.</Box>
                <Box className="detail_second">Uzbekistan</Box>
              </Stack>
              <Stack className="details" sx={{ mt: "42px" }}>
                <Box className="detail_first">P.</Box>
                <Box className="detail_second">+998 - 99 266 25 62</Box>
              </Stack>
              <Stack className="details" sx={{ mt: "9px" }}>
                <Box className="detail_first">E.</Box>
                <Box className="detail_second">Bit.Safe@gmail.com</Box>
              </Stack>
            </Stack>
          </Stack>
          <Box className="liner" sx={{ mt: "86px" }}></Box>
          <Box className="copyrights" sx={{ mt: "15px" }}>
            {" "}
            Copyrights BitSafe 2023. All rights reserved
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
