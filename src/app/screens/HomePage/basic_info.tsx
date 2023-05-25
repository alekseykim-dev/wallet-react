import { Box, Container, Stack } from "@mui/material";
import React from "react";
import Marginer from "../../components/marginer";
import { useHistory } from "react-router-dom";
import useDeviceDetect from "../../../lib/responsiveDetector";


export function Introduction() {

   const history = useHistory();

   const handleContainerClick = () => {
     history.push("/help");
   };
  const { isMobile } = useDeviceDetect();
 
  if (isMobile()) {
    return null
  } else {
    
    return (
      <Container className="static_frame_att">
        <Container>
          <div onClick={handleContainerClick}>
            <Box className="category_title_sec">Reduce your risk
              <Stack className="basic_frame">
                <Stack className="static_box_att_left">
                  <div className="attention_img left"></div>
                  <Box className="static_info_left">
                    Don't let hackers steal your money{" "}
                  </Box>
                  <Box className="static_text_left">
                    Online wallets and exchanges are vulnerable to attacks and data leaks. Storing cryptocurrency data online increases the risk of financial theft, coin fraud, and permanent loss of crypto assets.
                  </Box>
                </Stack>

                <Stack className="static_box_att_right">
                  <div className="lock_img right"></div>

                  <Box className="static_info_right">
                    Go offline. Store coins with our products
                  </Box>
                  <Box className="static_text_right">
                    Our hardware wallets are the safest and most resilient way to secure Bitcoin and crypto assets offline. Cold wallets never expose your digital asset information to anywhere.
                  </Box>
                </Stack>
                      
              </Stack>
            </Box>
          </div>
        </Container>
      </Container>
    );
  }
}
