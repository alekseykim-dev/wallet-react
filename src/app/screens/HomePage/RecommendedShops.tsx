import React, { useRef } from "react";
import { Box, Container, Stack } from "@mui/material";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import { CssVarsProvider } from "@mui/joy/styles";
import { CardOverflow } from "@mui/joy";
import IconButton from "@mui/joy/IconButton";
import { Favorite } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";

// REDUX
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveTopShops } from "./selector";
import { Shop } from "../../../types/user";
import { serverApi } from "../../../lib/config";
import { auth_err1, sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import MemberApiService from "../../apiServices/memberApiService";
import { MemberLiken } from "../../../types/others";
import { useHistory } from "react-router-dom";
import { verifiedMemberData } from "../../apiServices/verify";



/** REDUX SELECTOR */

const topShopRetriever = createSelector(
  // will recompute the output if the input has changed
  retrieveTopShops, // improves the performance since re-renders less
  (topShops) => ({
    topShops: topShops,
  })
);

export function TopShops() {

  /** INITIALIZATIONS */
  const history = useHistory();
  const { topShops: topShops } = useSelector(topShopRetriever);
  // selector : takes data from store
  console.log("topShops:::", topShops);

  const refs: any = useRef([]);


  /** HANDLERS */
    const chosenShopHandler = (id: string) => {
    history.push(`/shop/${id}`);
  };

  const targetLikeTop = async (e: any, id: string) => {
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
        e.target.style.fill = "white";
        refs.current[like_result.like_ref_id].innerHTML--;
      }
      await sweetTopSmallSuccessAlert("Success", 900, false);

    } catch (err: any) {
      console.log("targetLikeTop, ERROR:", err);
      auth_err1(err).then();
    }
  };
  return (
    <div className="top_shop_frame">
      <Container>
        <Stack
          flexDirection={"column"}
          alignItems={"center"}
          sx={{ mt: "45px" }}
        >
          <Box className="category_title">
            Recommended Shops
            <img className="back" src="/icons/bit_back1.svg" alt="" />
            <img className="back1" src="/icons/bit_back2.svg" alt="" />
          </Box>
          <Stack sx={{ mt: "43" }} flexDirection={"row"} m={"16px"}>
            {topShops.map((ele: Shop) => {
              const image_path = `${serverApi}/${ele.mb_image}`;
              return (
                <CssVarsProvider key={ele._id}>
                  <Card
                    onClick={() => chosenShopHandler(ele._id)}
                    sx={{
                      minHeight: "350px",
                      minWidth: 325,
                      mr: "15px",
                      ml: "15px",
                      cursor: "pointer",
                    }}
                  >
                    
                    <CardCover>
                      <img src={image_path} loading="lazy" alt="store" />
                    </CardCover>
                    <CardCover
                      sx={{
                        background:
                          "linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px)",
                      }}
                    />
                    <CardContent className="card_style">
                      <Typography
                        level="h2"
                        fontSize="lg"
                        textColor="#fff"
                        mb={1}
                      >
                        {ele.mb_nick}
                      </Typography>
                      <Typography textColor="neutral.300">
                        {ele.mb_address}
                      </Typography>
                    </CardContent>
                  </Card>
                </CssVarsProvider>
              );
            })}
            
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
