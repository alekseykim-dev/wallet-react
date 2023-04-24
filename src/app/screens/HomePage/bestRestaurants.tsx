import React, { useRef } from "react";
import { Favorite, Visibility } from "@mui/icons-material";
import { AspectRatio,Card ,CardOverflow, CssVarsProvider, IconButton, Link } from "@mui/joy";
import { Box, Button, Container, Stack } from "@mui/material";
import Typography from "@mui/joy/Typography";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import CallIcon from "@mui/icons-material/Call";


// REDUX
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveBestRestaurants } from "../../screens/HomePage/selector";
import { Restaurant } from "../../../types/user";
import { serverApi } from "../../../lib/config";
import assert from "assert";
import { auth_err1, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";
import MemberApiService from "../../apiServices/memberApiService";
import { Definer } from "../../../lib/Definer";
import { useHistory } from "react-router-dom";
import { verifiedMemberData } from "../../apiServices/verify";

/** REDUX SELECTOR */
const bestRestaurantRetriever = createSelector(
  // will recompute the output if the input has changed
  retrieveBestRestaurants,
  (bestRestaurants) => ({
    bestRestaurants,
  })
);

export function BestRestaurants() {

  /** INITIALIZATION */
  const history = useHistory();
  const { bestRestaurants } = useSelector(bestRestaurantRetriever);
  // selector : takes data from store
  console.log("bestRestaurants:::", bestRestaurants);
  const refs: any = useRef([]);

  /** HANDLERS */
   const chosenRestaurantHandler = (id: string) => {
    history.push(`/restaurant/${id}`);
  };
  const goRestaurantHandler = () => history.push("/restaurant");
  
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
        e.target.style.fill = "white";
        refs.current[like_result.like_ref_id].innerHTML--;
      }
      await sweetTopSmallSuccessAlert("Success", 700, false);

    } catch (err: any) {
      console.log("targetLikeBest, ERROR:", err);
      auth_err1(err).then();
    }
  };

  return (
    <div className="best_restaurant_frame">
      <img
        src={"/icons/line.svg"}
        alt="line"
        style={{ position: "absolute", left: "6%", transform: " rotate(90%)" }}
      />
      <Container sx={{ paddingTop: "153px" }}>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Box className="category_title">Best Restaurants</Box>
          <Stack flexDirection={"row"} sx={{ mt: "43px" }}>
            {bestRestaurants.map((ele: Restaurant) => {
              const image_path = `${serverApi}/${ele.mb_image}`;
              return (
                <CssVarsProvider key={ele._id}>
                  <Card
                    onClick={() => chosenRestaurantHandler(ele._id)}
                    variant="outlined"
                    sx={{
                      minHeight: 483,
                      minWidth: 320,
                      mr: "15px",
                      ml: "15px",
                      background: "white",
                      borderRadius: "10px",
                      cursor: "pointer",
                    }}
                  >
                    <CardOverflow>
                      <AspectRatio ratio="1">
                        <img src={image_path} alt="best" />
                      </AspectRatio>
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        aria-labelledby="like minimal photography"
                        size="md"
                        variant="solid"
                        color="neutral"
                        sx={{
                          position: "absolute",
                          zIndex: 2,
                          borderRadius: "50%",
                          right: "1rem",
                          bottom: 0,
                          transform: "translateY(50%)",
                          color: "rgba(0,0,0,.4)",
                        }}
                      >
                        <Favorite
                          onClick={(e) => targetLikeBest(e, ele._id)}
                          style={{
                            fill:
                              ele?.me_liked && ele?.me_liked[0]?.my_favorite
                                ? "red"
                                : "white",
                          }}
                        />
                      </IconButton>
                    </CardOverflow>
                    <Typography
                      level="h2"
                      sx={{ fontSize: "md", mt: 2, ml: 2 }}
                    >
                      {ele.mb_nick}
                    </Typography>
                    <Typography level="body2" sx={{ mt: 0.5, mb: 2, ml: 2 }}>
                      <Link
                        href="#"
                        startDecorator={<LocationOnRoundedIcon />}
                        textColor="neutral.700"
                      >
                        {ele.mb_address}
                      </Link>
                    </Typography>
                    <Typography level="body2" sx={{ mt: 0.5, mb: 2, ml: 2 }}>
                      <Link
                        href="#"
                        startDecorator={<CallIcon />}
                        textColor="neutral.700"
                      >
                        {ele.mb_email}
                      </Link>
                    </Typography>

                    <CardOverflow
                      variant="soft"
                      sx={{
                        display: "flex",
                        gap: 1.5,
                        py: 1.5,
                        px: "var(--Card-padding)",
                        borderTop: "1px solid",
                        borderColor: "neutral.outlinedBorder",
                        bgcolor: "background.level1",
                      }}
                    >
                      <Typography
                        level="body3"
                        sx={{
                          fontWeight: "md",
                          color: "text.secondary",
                          alignItems: "center",
                          display: "flex",
                          marginLeft: "10px",
                        }}
                      >
                        {ele.mb_views}
                        <Visibility sx={{ fontSize: 20, marginLeft: "5px" }} />
                      </Typography>
                      <Box sx={{ width: 2, bgcolor: "divider" }} />
                      <Typography
                        level="body3"
                        sx={{
                          fontWeight: "md",
                          color: "text.secondary",
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        <div
                          ref={(element) => (refs.current[ele._id] = element)}
                        >
                          {ele.mb_likes}
                        </div>
                        <Favorite sx={{ fontSize: 20, marginLeft: "5px" }} />
                      </Typography>
                    </CardOverflow>
                  </Card>
                </CssVarsProvider>
              );
            })}
          </Stack>

          <Stack
            flexDirection={"row"}
            justifyContent={"flex-end"}
            sx={{ width: "100%", marginTop: "16px" }}
          >
            <Button
              style={{ background: "#1976d2", color: "#fff" }}
              onClick={goRestaurantHandler}
            >
              See All
            </Button>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
