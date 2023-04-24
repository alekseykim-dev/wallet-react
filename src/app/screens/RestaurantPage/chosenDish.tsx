import React, { useEffect, useState } from "react";
import { Box, Button, Checkbox, Container, Stack } from "@mui/material";
import Rating from "@mui/material/Rating";
import { Swiper, SwiperSlide } from "swiper/react";
import CheckBox from "@mui/material/Checkbox";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Marginer from "../../components/marginer";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { useParams } from "react-router-dom";
import { Product } from "../../../types/product";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import {
  retrieveChosenProduct,
  retrieveChosenRestaurant,
} from "../../screens/RestaurantPage/selector";
import { Dispatch } from "@reduxjs/toolkit";
import {
  setChosenProduct,
  setChosenRestaurant,
} from "../../screens/RestaurantPage/slice";
import { Restaurant } from "../../../types/user";
import ProductApiService from "../../apiServices/productApiService";
import RestaurantApiService from "../../apiServices/restaurantApiService";
import { serverApi } from "../../../lib/config";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import MemberApiService from "../../apiServices/memberApiService";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import { verifiedMemberData } from "../../apiServices/verify";

/** REDUX SLICE */
const actionDispatch = (dispatch: Dispatch) => ({
  setChosenProduct: (data: Product) => dispatch(setChosenProduct(data)),  // 1st useDispatch. 2nd slice.ts payload 'data'
  setChosenRestaurant: (data: Restaurant) =>
    dispatch(setChosenRestaurant(data)),
});
/* REDUX SELECTOR */
const chosenProductRetriever = createSelector(
  retrieveChosenProduct,
  (chosenProduct) => ({
    chosenProduct,
  })
);
const chosenRestaurantRetriever = createSelector(
  retrieveChosenRestaurant,
  (chosenRestaurant) => ({
    chosenRestaurant,
  })
);

export function ChosenDish(props: any) {
  /** INITIALIZATIONS */
  let { dish_id } = useParams<{ dish_id: string }>();
  const { setChosenProduct, setChosenRestaurant } = actionDispatch(
    useDispatch() // needs to update the state after user interaction
  ); // useState ids functional component. useDispatch is a global component for store from redux. // reducer takes initial state and action.
  const { chosenProduct } = useSelector(chosenProductRetriever);
  const { chosenRestaurant } = useSelector(chosenRestaurantRetriever);

  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [productRebuild, setProductRebuild] = useState<Date>(new Date());
  // Date force re-rendering of the state and updates the app

  // dishRelatedProcess updates the chosenProduct and chosenRestaurant in the Redux store
  const dishRelatedProcess = async () => {
    try {
      const productService = new ProductApiService();
      const product: Product = await productService.getChosenDish(dish_id);
      setChosenProduct(product);

      const restaurantService = new RestaurantApiService();
      const restaurant: Restaurant =
        await restaurantService.getChosenRestaurant(product.restaurant_mb_id);
      setChosenRestaurant(restaurant);
    } catch (err) {
      console.log(`dishRelatedProcess, ERROR:`, err);
    }
  };

  // retrieve da ta from backend
  useEffect(() => {
    dishRelatedProcess().then(); //  prevents a warning from React about an unhandled promise rejection
  }, [productRebuild]);

  // calls the dishRelatedProcess function whenever the productRebuild state is updated.

  /*** HANDLERS*/
  const targetLikeProduct = async (e: any) => {
    try {
      assert.ok(verifiedMemberData, Definer.auth_err1); // whether or not the user authenticated

      const memberService = new MemberApiService(),
        like_result = await memberService.memberLikeTarget({
          like_ref_id: e.target.id, //onClick in checkbox
          group_type: "product",
        });
      assert.ok(like_result, Definer.general_err1);

      await sweetTopSmallSuccessAlert("Success!", 700, false);
      setProductRebuild(new Date());
    } catch (err: any) {
      console.log("targetLikeProduct, ERROR:", err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <div className="chosen_dish_page">
      <Container className="dish_container">
        <Stack className="chosen_dish_slider">
          <Swiper
            className="dish_swiper"
            loop={true}
            mousewheel={true}
            direction="vertical"
            spaceBetween={10}
            navigation={true}
            // thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
          >
            {chosenProduct?.product_images?.map((ele: string) => {
              const image_path = `${serverApi}/${ele}`;
              return (
                <SwiperSlide>
                  <img
                    src={image_path}
                    alt="food"
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "10px",
                    }}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>

          <Stack>
            <Swiper
              className={"dish_swiper_mini"}
              loop={true}
              // thumbs={{ swiper: thumbsSwiper }}
              spaceBetween={20}
              slidesPerView={3}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              navigation={true}
              style={{
                width: "350px",
                height: "100px",
                marginTop: "20px",
              }}
            >
              {chosenProduct?.product_images?.map((ele: string) => {
                const image_path = `${serverApi}/${ele}`;
                return (
                  <SwiperSlide>
                    <img
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "15px",
                      }}
                      src={image_path}
                      alt="food"
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </Stack>
        </Stack>

        <Stack className="chosen_dish_info_container">
          <Box className="chosen_dish_info_box">
            <strong className="dish_txt">{chosenProduct?.product_name}</strong>
            <span className="resto_name">{chosenRestaurant?.mb_nick}</span>
            <Box className="rating_box">
              <Rating
                name="half-rating"
                defaultValue={4.5}
                precision={0.5}
              ></Rating>
              <div className="evaluation_box">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "20px",
                  }}
                >
                  <Checkbox
                    {...label} // inputProps={label.inputProps}
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite style={{ color: "red" }} />}
                    id={chosenProduct?._id}
                    onClick={targetLikeProduct}
                    /* @ts-ignore */
                    checked={
                      chosenProduct?.me_liked &&
                      !!chosenProduct?.me_liked[0]?.my_favorite
                    }
                    // checked={
                    //   chosenProduct?.me_liked &&
                    //   chosenPRoduct?.me_liked[0]?.my_favorite
                    //     ? true
                    //     : false
                    // }
                  />

                  <span>{chosenProduct?.product_likes}</span>
                </div>

                <div style={{ display: "flex", alignItems: "center" }}>
                  <RemoveRedEyeIcon sx={{ mr: "10px" }} />
                  <span>{chosenProduct?.product_views}</span>
                </div>
              </div>
            </Box>
            <p className="dish_desc_info">
              {chosenProduct?.product_description
                ? chosenProduct?.product_description
                : "No description"}
            </p>
            <Marginer
              direction="horizontal"
              height="1"
              width="100%"
              bg="#000000"
            />
            <div className="dish_price_box">
              <span>Price:</span>
              <span>${chosenProduct?.product_price}</span>
            </div>
            <div className="button_box">
              <Button
                variant="contained"
                onClick={() => {
                  props.onAdd(chosenProduct);
                }}
              >
                Add to cart
              </Button>
            </div>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
function setProductRebuild(arg0: Date) {
  throw new Error("Function not implemented.");
}
