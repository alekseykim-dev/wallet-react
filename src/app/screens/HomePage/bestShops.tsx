import React, { useRef, useState } from "react";
import { Favorite, Visibility } from "@mui/icons-material";
import { AspectRatio,Card ,CardOverflow, CssVarsProvider, Link } from "@mui/joy";
import { Box, Button, CardActions, Container, Stack } from "@mui/material";
import Typography from "@mui/joy/Typography";
import AttachEmailRoundedIcon from "@mui/icons-material/AttachEmailRounded";
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import BrandingWatermarkRoundedIcon from "@mui/icons-material/BrandingWatermarkRounded";
// REDUX
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveBestShops } from "./selector";
import { Shop } from "../../../types/user";
import { serverApi } from "../../../lib/config";
import assert from "assert";
import { auth_err1, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";
import MemberApiService from "../../apiServices/memberApiService";
import { Definer } from "../../../lib/Definer";
import { useHistory } from "react-router-dom";
import { verifiedMemberData } from "../../apiServices/verify";

/** REDUX SELECTOR */
const bestShopRetriever = createSelector(
  // will recompute the output if the input has changed
  retrieveBestShops,
  (bestShops) => ({
    bestShops: bestShops,
  })
);

export function BestShops() {

  const [isHovered1, setIsHovered1] = useState(false);

  const handleMouseEnter1 = () => {
    setIsHovered1(true);
  };

  const handleMouseLeave1 = () => {
    setIsHovered1(false);
  };



  /** INITIALIZATION */
  const history = useHistory();
  const { bestShops } = useSelector(bestShopRetriever);
  // selector : takes data from store
  console.log("bestShops:::", bestShops);
  const refs: any = useRef([]);

  /** HANDLERS */
   const chosenShopHandler = (id: string) => {
    history.push(`/shop/${id}`);
  };
  const goShopHandler = () => history.push("/shop");
  
  const targetLikeBest = async (e: any, id: string) => {
    try {
      assert.ok(verifiedMemberData, Definer.auth_err1);

      const memberService = new MemberApiService(),
        like_result: any = await memberService.memberLikeTarget({
          like_ref_id: id,
          group_type: "member",
        });
      assert.ok(like_result, Definer.general_err1);

      if (like_result.like_status > 0) {
        e.target.style.fill = "red";
        refs.current[like_result.like_ref_id].innerHTML++;
      } else {
        e.target.style.fill = "#5a5a72";
        refs.current[like_result.like_ref_id].innerHTML--;
      }
      await sweetTopSmallSuccessAlert("Success", 700, false);

    } catch (err: any) {
      console.log("targetLikeBest, ERROR:", err);
      auth_err1(err).then();
    }
  };

  return (
    <div className="best_shop_frame">
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Box className="category_title_shop">
            Customer Favorites
            
          </Box>
          <Stack flexDirection={"row"} sx={{ mt: "10px" }}>
            {bestShops.map((ele: Shop) => {
              const image_path = `${serverApi}/${ele.mb_image}`;
              return (
                <CssVarsProvider key={ele._id}>
                  <Card
                    className="customer_card"
                    onClick={() => chosenShopHandler(ele._id)}
                    variant="outlined"
                    sx={{paddingBottom: "5px"}}
                  >
                    <CardOverflow>
                      <AspectRatio ratio="1">
                        <img src={image_path} alt="best" />
                      </AspectRatio>
                    </CardOverflow>
                    <Typography
                      level="h2"
                      sx={{ fontSize: "15px", mt: 1, ml: 1 }}
                      startDecorator={<BrandingWatermarkRoundedIcon />}
                    >
                      Brand: <i> {ele.mb_nick} </i>{" "}
                    </Typography>
                    <Typography
                      level="body2"
                      sx={{ fontSize: "15px", mt: 0.5, mb: 0.2, ml: 1 }}
                    >
                      <Link
                        href="#"
                        startDecorator={<ApartmentRoundedIcon />}
                        textColor="neutral.700"
                      >
                        Manufacturer: <i> {ele.mb_address}</i>
                      </Link>
                    </Typography>
                    <Typography
                      level="body2"
                      sx={{ fontSize: "15px", mt: 0.1, ml: 1 }}
                    >
                      <Link
                        href="#"
                        startDecorator={<AttachEmailRoundedIcon />}
                        textColor="neutral.700"
                      >
                        Email: <i> {ele.mb_email} </i>
                      </Link>
                    </Typography>

                    <CardActions
                      sx={{
                        display: "flex",
                        justifyContent: "space-evenly", paddingLeft: "80px",
                        paddingRight: "80px"
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Typography
                        level="body3"
                        sx={{
                          fontWeight: "md",
                          color: "text.secondary",
                          alignItems: "center",
                          display: "flex",
                          fontSize: "15px"
                        }}
                      >
                        {ele.mb_views}
                        <Visibility
                          sx={{ fontSize: "25px", marginLeft: "5px" }}
                        />
                      </Typography>
                      <Box sx={{ width: 2, bgcolor: "divider" }} />
                      <Typography
                        level="body3"
                        sx={{
                          fontWeight: "md",
                          color: "#5a5a72",
                          alignItems: "center",
                          display: "flex",
                          justifyContent: "center",
                          width: "30px",
                          height: "auto",
                        }}
                      >
                        <span
                          ref={(element) => (refs.current[ele._id] = element)}
                          style={{ fontSize: "15px" }}
                        >
                          {ele.mb_likes}
                        </span>
                        <Favorite
                          onClick={(e) => {
                            targetLikeBest(e, ele._id);
                          }}
                          style={{
                            fontSize: "25px",
                            marginRight: "10px",
                            fill:
                              ele?.me_liked && ele?.me_liked[0]?.my_favorite
                                ? "red"
                                : "#5a5a72",
                          }}
                        />
                      </Typography>
                    </CardActions>
                  </Card>
                </CssVarsProvider>
              );
            })}
          </Stack>

          <Stack
            flexDirection={"row"}
            justifyContent={"center"}
            sx={{ width: "100%", marginTop: "20px" }}
          >
            <Button
              className="nav_button"
              variant="contained"
              style={{
                color: isHovered1 ? "#fff" : "#000",
                opacity: isHovered1 ? 0.7 : 1,
                backgroundColor: isHovered1 ? "#000000d0" : "#d7b686",
              }}
              onMouseEnter={handleMouseEnter1}
              onMouseLeave={handleMouseLeave1}
              onClick={goShopHandler}
            >
              See All Shops
            </Button>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
