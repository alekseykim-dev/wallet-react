import { Box, Container, Stack } from "@mui/material";
import moment from "moment";
import React from "react";
import { NavLink } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneCallbackIcon from "@mui/icons-material/PhoneCallback";
import EmailIcon from "@mui/icons-material/Email";
 const handleClickHome = () => {
   const element = document.getElementById("home");
   if (element) {
     element.scrollIntoView({ behavior: "smooth" });
   }
 };

  const handleClickOther = () => {
    const element = document.getElementById("other");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  const handleClickShop = () => {
    const element = document.getElementById("shop");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
export function Footer() {
  return (
    <div className="footer_config">
      <Container className="footer_cont">
        <Stack flexDirection={"column"} className="main_footer_container">
          <Stack
            justifyContent={"space-between"}
            flexDirection={"row"}
            style={{ height: "242px" }}
          >
            <Stack className="info" flexDirection={"column"}>
              <Box>
                <img src="/icons/logo1.svg" alt="logo"></img>
              </Box>
              <Box className="main_text">
                Experience peace of mind knowing that your digital assets are
                always secure with our reliable and easy-to-use cold wallets.
              </Box>
              <Stack className="contact_links">
                <Box>
                  <a href="https://github.com/alekseykim-dev">
                    <img src="/icons/facebook1.svg" alt="facebook" />
                  </a>
                </Box>
                <Box>
                  <a href="https://www.linkedin.com/in/aleksey-kim-61a916195/">
                    <img src="/icons/twitter1.svg" alt="twitter" />
                  </a>
                </Box>
                <Box>
                  <a href="https://github.com/alekseykim-dev">
                    <img src="/icons/instagram1.svg" alt="instagram" />
                  </a>
                </Box>
                <Box>
                  <a href="https://www.linkedin.com/in/aleksey-kim-61a916195/">
                    <img src="/icons/youtube1.svg" alt="youtube" />
                  </a>
                </Box>
              </Stack>
            </Stack>
            <Stack className="parts">
              <Box className="part_subject">Content</Box>
              <Box className="divider"></Box>
              <Box className="targets target" sx={{ mt: "5px" }}>
                <NavLink to="/" onClick={handleClickHome}>
                  Home
                </NavLink>
              </Box>
              <Box className="targets">
                <NavLink to="/shop" onClick={handleClickShop}>
                  Brands
                </NavLink>
              </Box>
              <Box className="targets">
                <NavLink to="/community" onClick={handleClickOther}>
                  Articles
                </NavLink>
              </Box>
              <Box className="targets">
                <NavLink to="/help" onClick={handleClickOther}>
                  Send us an email
                </NavLink>
              </Box>
            </Stack>
            <Stack className="find_us">
              <Box className="find">Contact us</Box>
              <Box className="divider"></Box>
              <Stack className="details" sx={{ mt: "19px" }}>
                <Box className="detail_first">
                  <LocationOnIcon />
                </Box>
                <Box className="detail_second">South Korea</Box>
              </Stack>
              <Stack className="details" sx={{ mt: "10px" }}>
                <Box className="detail_first">
                  <PhoneCallbackIcon />{" "}
                </Box>
                <Box className="detail_second">+82 10 5851 5310</Box>
              </Stack>
              <Stack className="details" sx={{ mt: "9px" }}>
                <Box className="detail_first">
                  <EmailIcon />
                </Box>
                <Box className="detail_second">Bitsafe@gmail.com</Box>
              </Stack>
            </Stack>
          </Stack>
          <Box className="liner"></Box>
          <Box className="copyrights" sx={{ mt: "15px" }}>
            {" "}
            Copyrights BitSafe 2022 - {moment().format("YYYY")}. All rights
            reserved
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
