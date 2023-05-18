import React, { useEffect, useRef, useState } from "react";
import { Box, Button, CardActions, Container, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { CssVarsProvider } from "@mui/joy/styles";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import AspectRatio from "@mui/joy/AspectRatio";
import Favorite from "@mui/icons-material/Favorite";
import Typography from "@mui/joy/Typography";
import Link from "@mui/joy/Link";
import AttachEmailRoundedIcon from "@mui/icons-material/AttachEmailRounded";
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import BrandingWatermarkRoundedIcon from "@mui/icons-material/BrandingWatermarkRounded";
import CurrencyRubleIcon from "@mui/icons-material/CurrencyRuble";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveTargetShops } from "./selector";
import { Shop } from "../../../types/user";
import { Dispatch } from "@reduxjs/toolkit";
import { setTargetShops } from "./slice";
import ShopApiService from "../../apiServices/shopApiService";
import { SearchObj } from "../../../types/others";
import { serverApi } from "../../../lib/config";
import { Visibility } from "@mui/icons-material";
import assert from "assert";
import MemberApiService from "../../apiServices/memberApiService";
import { Definer } from "../../../lib/Definer";
import { auth_err1, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";
import { useHistory } from "react-router-dom";
import { verifiedMemberData } from "../../apiServices/verify";

/** REDUX SLICE */
const actionDispatch = (dispatch: Dispatch) => ({
  setTargetShops: (data: Shop[]) =>
    dispatch(setTargetShops(data)),
});

// const order_list = Array.from(Array(8).keys());

/** REDUX SELECTOR */
const targetShopsRetriever = createSelector(
  retrieveTargetShops,
  (targetShops) => ({
    targetShops: targetShops,
  })
);

export function AllShops() {
  /* INITIALIZATIONS */
  const history = useHistory(); // react router-dom
  const { setTargetShops } = actionDispatch(useDispatch());
  const { targetShops } = useSelector(targetShopsRetriever);
  const [targetSearchObject, setTargetSearchObject] = useState<SearchObj>({
    page: 1,
    limit: 8,
    order: "mb_point",
  });
  const refs: any = useRef([]);


  // best => mb_point
  // popular => mb_view
  // trending => mb_likes
  // new => createdAt
  useEffect(() => {
    // TODO: Retrieve targetShopData  // set targetShops
    const shopService = new ShopApiService();
    shopService
      .getShops(targetSearchObject)
      .then((data) => setTargetShops(data))
      .catch((err) => console.log(err));
  }, [targetSearchObject]); // updates after data is changed

  /** HANDLERS */
  const chosenShopHandler = (id: string) => {
    history.push(`/shop/${id}`);
  };
  const searchHandler = (category: string) => {
    targetSearchObject.page = 1;
    targetSearchObject.order = category;
    setTargetSearchObject({ ...targetSearchObject }); // creates with new reference (spread operator) because useState is array // ref = accessing underlying component in DOM. // address in memory
  };

  /** Enabling search */
  const [query, setQuery] = useState("");

  const filteredShops = targetShops.filter(
    (product) =>
      product.mb_nick.toLowerCase().includes(query.toLowerCase()) ||
      product.mb_address.toLowerCase().includes(query.toLowerCase()) ||
      product.mb_email.toLowerCase().includes(query.toLowerCase())
  );

  /**  Enabling search */

  const handlePaginationChange = (event: any, value: number) => {
    targetSearchObject.page = value;
    setTargetSearchObject({ ...targetSearchObject }); // if value changes updates
  };

  const targetLikeHandler = async (e: any, id: string) => {
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
      await sweetTopSmallSuccessAlert("Success!", 900, false);
    } catch (err: any) {
      console.log("targetLikeTop, ERROR:", err);
      auth_err1(err).then();
    }
  };

  return (
    <div className="all_shops">
      <img className="back10" src="/icons/bit_back3.svg" alt="" />
      <img className="back11" src="/icons/bit_back4.svg" alt="" />
      <img className="back111" src="/icons/bit_back4.svg" alt="" />

      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <div className="brand_welcome">Welcome to the candy shop</div>
          <Box className="fill_search_box">
            <Box className="search_big_box">
              <form className="search_form" action="" method="">
                <input
                  type="text"
                  className="searchInput"
                  name="reSearch"
                  placeholder="Input brand name, country or email here"
                  onChange={(e) => setQuery(e.target.value)}
                />
              </form>
            </Box>
            <Box className="fill_box" style={{ cursor: "pointer" }}>
              <a onClick={() => searchHandler("mb_point")}>Top picks</a>
              <a onClick={() => searchHandler("mb_views")}>Bestsellers</a>
              <a onClick={() => searchHandler("mb_likes")}>Trending</a>
              <a onClick={() => searchHandler("createdAt")}>Newly added</a>
            </Box>
          </Box>

          <Stack className="all_res_box">
            {filteredShops.map((ele: Shop) => {
              const image_path = `${serverApi}/${ele.mb_image}`;
              // map 8
              return (
                <CssVarsProvider key={ele._id}>
                  <Card
                    className="customer_card1"
                    onClick={() => chosenShopHandler(ele._id)}
                    variant="outlined"
                    sx={{ paddingBottom: "5px" }}
                  >
                    <CardOverflow>
                      <AspectRatio ratio="1">
                        <img src={image_path} alt="best" />
                      </AspectRatio>
                    </CardOverflow>
                    <Typography
                      level="h2"
                      sx={{ fontSize: "15px", mt: "10px", ml: 1 }}
                      startDecorator={<BrandingWatermarkRoundedIcon />}
                    >
                      Brand: {ele.mb_nick}{" "}
                    </Typography>
                    <Typography
                      level="body2"
                      sx={{ fontSize: "15px", mt: "8px", mb: 0.2, ml: 1 }}
                    >
                      <Link
                        href="#"
                        startDecorator={<ApartmentRoundedIcon />}
                        textColor="neutral.700"
                      >
                        Manufactured in {ele.mb_address}
                      </Link>
                    </Typography>
                    <Typography
                      level="body2"
                      sx={{ fontSize: "15px", mt: "2px", ml: 1 }}
                    >
                      <Link
                        href="#"
                        startDecorator={<AttachEmailRoundedIcon />}
                        textColor="neutral.700"
                      >
                        {" "}
                        Email: {ele.mb_email}{" "}
                      </Link>
                    </Typography>

                    <CardActions
                      sx={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        padding: "4px 4px 0px 4px",
                        margin: "10px 0px",
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
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
                          {ele.mb_views}
                        </span>
                        <Visibility
                          sx={{ fontSize: "23px", marginLeft: "5px" }}
                        />
                      </Typography>
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
                          {ele.mb_point}
                        </span>
                        <CurrencyRubleIcon
                          sx={{ fontSize: "23px", marginLeft: "5px" }}
                        />
                      </Typography>
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
                            targetLikeHandler(e, ele._id);
                          }}
                          style={{
                            fontSize: "25px",
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
          <Stack className="bottom_box">
            <Pagination
              count={
                targetSearchObject.page >= 3 ? targetSearchObject.page + 1 : 3
              } // can do it manually through backend
              page={targetSearchObject.page}
              renderItem={(item) => (
                <PaginationItem
                  components={{
                    previous: ArrowBackIcon,
                    next: ArrowForwardIcon,
                  }}
                  {...item}
                  color="primary"
                />
              )}
              onChange={handlePaginationChange}
            />
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
