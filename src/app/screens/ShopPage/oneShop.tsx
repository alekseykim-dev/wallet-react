import React, { useEffect, useRef, useState } from "react";
import { Container, Box, Button, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import StarIcon from "@mui/icons-material/Star";
import { Swiper, SwiperSlide } from "swiper/react";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import { useHistory, useParams } from "react-router-dom";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import {
  retrieveRandomShops,
  retrieveChosenShop,
  retrieveTargetProducts,
} from "./selector";
import { Shop } from "../../../types/user";
import { Dispatch } from "@reduxjs/toolkit";
import {
  setRandomShops,
  setChosenShop,
  setTargetProducts,
} from "./slice";
import { Product } from "../../../types/product";
import { ProductSearchObj } from "../../../types/others";
import ProductApiService from "../../apiServices/productApiService";
import { serverApi } from "../../../lib/config";
import ShopApiService from "../../apiServices/shopApiService";
import { Definer } from "../../../lib/Definer";
import assert from "assert";
import MemberApiService from "../../apiServices/memberApiService";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import { verifiedMemberData } from "../../apiServices/verify";


/** REDUX SLICE */
const actionDispatch = (dispatch: Dispatch) => ({
  setRandomShops: (data: Shop[]) =>
    dispatch(setRandomShops(data)),
  setChosenShop: (data: Shop) =>
    dispatch(setChosenShop(data)),
  setTargetProducts: (data: Product[]) => dispatch(setTargetProducts(data)),
});

/** REDUX SELECTOR */
const randomShopRetriever = createSelector(
  retrieveRandomShops,
  (randomShops) => ({
    randomShops: randomShops,
  })
);
const chosenShopRetriever = createSelector(
  retrieveChosenShop,
  (chosenShop) => ({
    chosenShop: chosenShop,
  })
);
const targetProductsRetriever = createSelector(
  retrieveTargetProducts,
  (targetProducts) => ({
    targetProducts,
  })
);

export function OneShop(props: any) {
  /* INITIALIZATIONS */
  // const refs: any = useRef([]);
  const history = useHistory(); // navigates to different pages within your application.
  let { shop_id: shop_id } = useParams<{ shop_id: string }>(); //  accesses the parameters in the URL of the current route.
  const { setRandomShops: setRandomShops, setChosenShop: setChosenShop, setTargetProducts } =
    actionDispatch(useDispatch());
  const { randomShops: randomShops } = useSelector(randomShopRetriever);
  const { chosenShop: chosenShop } = useSelector(chosenShopRetriever);
  const { targetProducts } = useSelector(targetProductsRetriever);
  const [chosenShopId, setChosenShopId] =
    useState<string>(shop_id);

  const [targetProductSearchObj, setTargetProductSearchObj] =
    useState<ProductSearchObj>({
      page: 1,
      limit: 8,
      order: "createdAt",
      shop_mb_id: shop_id,
      product_collection: "wallet",
    });

  const [productRebuild, setProductRebuild] = useState<Date>(new Date());

  useEffect(() => {
    // RandomShops
    const shopService = new ShopApiService();
    shopService
      .getShops({ page: 1, limit: 10, order: "random" })
      .then((data) => setRandomShops(data))
      .catch((err) => console.log(err));

    shopService
      .getChosenShop(chosenShopId)
      .then((data) => setChosenShop(data))
      .catch((err) => console.log(err));

    // ChosenProduct
    const productService = new ProductApiService();
    productService
      .getTargetProducts(targetProductSearchObj)
      .then((data) => setTargetProducts(data))
      .catch((err) => console.log(err));
  }, [chosenShopId, targetProductSearchObj, productRebuild]);

  /* HANDLERS */
  const chosenShopHandler = (id: string) => {
    setChosenShopId(id);
    targetProductSearchObj.shop_mb_id = id;
    setTargetProductSearchObj({ ...targetProductSearchObj });
    history.push(`/shop/${id}`);
  };

  const searchCollectionHandler = (collection: string) => {
    targetProductSearchObj.page = 1;
    targetProductSearchObj.product_collection = collection;
    setTargetProductSearchObj({ ...targetProductSearchObj });
  };
  const searchOrderHandler = (order: string) => {
    targetProductSearchObj.page = 1;
    targetProductSearchObj.order = order;
    setTargetProductSearchObj({ ...targetProductSearchObj });
  };
  const chosenProductHandler = (id: string) => {
    history.push(`/shop/products/${id}`);
  };

  // Like handle
  const targetLikeProduct = async (e: any) => {
    try {
      assert.ok(verifiedMemberData, Definer.auth_err1);

      const memberService = new MemberApiService(),
        like_result: any = await memberService.memberLikeTarget({
          like_ref_id: e.target.id,
          group_type: "product",
        });
      assert.ok(like_result, Definer.general_err1);

      await sweetTopSmallSuccessAlert("Success!", 900, false);
      setProductRebuild(new Date());
    } catch (err: any) {
      console.log("targetLikeProduct, ERROR:", err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <div className="single_shop">
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Stack className="avatar_big_box">
            <Box className="top_text">
              <p>Texas De Brazil Shop</p>
              <Box className="Single_search_big_box">
                <form className="Single_search_form" action="" method="">
                  <input
                    type="search"
                    className="Single_searchInput"
                    name="Single_resSearch"
                    placeholder="Search"
                  />
                  <Button
                    className="Single_button_search"
                    variant="contained"
                    endIcon={<SearchIcon />}
                  >
                    Search
                  </Button>
                </form>
              </Box>
            </Box>
          </Stack>

          <Stack
            style={{ width: "100%", display: "flex" }}
            flexDirection={"row"}
            sx={{ mt: "35px" }}
          >
            <Box className="prev_btn shop-prev">
              <ArrowBackIosNewIcon
                sx={{ fontSize: 40 }}
                style={{ color: "#fff" }}
              />
            </Box>
            <Swiper
              className={"shop_avatars_wrapper"}
              slidesPerView={7}
              centeredSlides={false}
              spaceBetween={30}
              // style={{ cursor: "pointer" }}
              navigation={{
                nextEl: ".shop-next",
                prevEl: ".shop-prev",
              }}
            >
              {randomShops.map((ele: Shop) => {
                const image_path = `${serverApi}/${ele.mb_image}`;
                return (
                  <SwiperSlide
                    onClick={() => chosenShopHandler(ele._id)}
                    style={{ cursor: "pointer" }}
                    key={ele._id}
                    className="shop_avatars"
                  >
                    <img src={image_path} alt="" />
                    <span>{ele.mb_nick}</span>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <Box className="next_btn shop-next" style={{ color: "#fff" }}>
              <ArrowForwardIosIcon sx={{ fontSize: 40 }} />
            </Box>
          </Stack>

          <Stack
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"flex-end"}
            width={"90%"}
            sx={{ mt: "65px" }}
          >
            <Box className="dishes_filter_box">
              <Button
                variant="contained"
                color="secondary"
                onClick={() => searchOrderHandler("createdAt")}
              >
                Newly Added
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => searchOrderHandler("product_price")}
              >
                Price
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => searchOrderHandler("product_likes")}
              >
                Likes
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => searchOrderHandler("product_views")}
              >
                Views
              </Button>
            </Box>
          </Stack>

          <Stack
            style={{ width: "100%", display: "flex", minHeight: "600px" }}
            flexDirection={"row"}
          >
            <Stack className="dish_category_box">
              <div className="dish_category_main">
                
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => searchCollectionHandler("bundle")}
                >
                  Bundles
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => searchCollectionHandler("accessory")}
                >
                  Accessories
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => searchCollectionHandler("wallet")}
                >
                  Wallets
                </Button>
               
              </div>
            </Stack>

            <Stack className={"dish_wrapper"}>
              {targetProducts.map((product: Product) => {
                const image_path = `${serverApi}/${product.product_images[0]}`;
                const size_volume =
                  product.product_collection === "beverage"
                    ? product.product_volume + "l"
                    : "size: " + product.product_size;

                return (
                  <Box
                    className={"dish_box"}
                    key={`${product._id}`}
                    onClick={() => chosenProductHandler(product._id)}
                  >
                    <Box
                      className="dish_img"
                      sx={{
                        backgroundImage: `url(${image_path})`,
                      }}
                      key={product._id}
                    >
                      <div className={"dish_sale"}>{size_volume}</div>
                      <Button
                        className={"like_view_btn"}
                        style={{ left: "36px" }}
                      >
                        {/* hover -> */}
                        <Badge
                          badgeContent={product.product_likes}
                          color={"primary"}
                          onClick={(e) => {
                            props.onAdd(product);
                            e.stopPropagation();
                          }}
                        >
                          <Checkbox
                            icon={<FavoriteBorder style={{ color: "white" }} />}
                            id={product._id}
                            checkedIcon={<Favorite style={{ color: "red" }} />}
                            onClick={targetLikeProduct}
                            /* @ts-ignore */
                            checked={
                              product?.me_liked &&
                              product?.me_liked[0]?.my_favorite
                                ? true
                                : false
                            }
                          />
                        </Badge>
                      </Button>
                      <Button
                        className={"view_btn"}
                        onClick={(e) => {
                          props.onAdd(product);
                          e.stopPropagation();
                        }}
                      >
                        <img
                          src="/icons/shopping_cart.svg"
                          style={{ display: "flex" }}
                          alt=""
                        />
                      </Button>
                      <Button
                        className={"like_view_btn"}
                        style={{ right: "36px" }}
                      >
                        <Badge
                          badgeContent={product.product_views}
                          color="primary"
                        >
                          <Checkbox
                            icon={
                              <RemoveRedEyeIcon style={{ color: "white" }} />
                            }
                          />
                        </Badge>
                      </Button>
                    </Box>

                    <Box className={"dish_desc"}>
                      <span className={"dish_title_text"}>
                        {product.product_name}
                      </span>
                      <span className={"dish_desc_text"}>
                        <MonetizationOnIcon />
                        {product.product_price}
                      </span>
                    </Box>
                  </Box>
                );
              })}
            </Stack>
          </Stack>
        </Stack>
      </Container>

      <div className="review_for_shop">
        <Container
          sx={{ mt: "100px" }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box className={"category_title"}>Shop reviews</Box>
          <Stack
            flexDirection={"row"}
            display={"flex"}
            justifyContent={"space-between"}
            width={"100%"}
          >
            {Array.from(Array(4).keys()).map((ele, index) => {
              return (
                <Box className={"review_box"} key={index}>
                  <Box display={"flex"} justifyContent={"center"}>
                    <img
                      src={"/community/cute_girl.jpg"}
                      className={"review_img"}
                      alt=""
                    />
                  </Box>
                  <span className={"review_name"}>Dakota Johnson</span>
                  <span className={"review_prof"}>User</span>
                  <p className={"review_desc"}>
                    I love the shop atmosphere and the service!
                  </p>
                  <div className={"review_stars"}>
                    <StarIcon style={{ color: "#F2BD57" }} />
                    <StarIcon style={{ color: "#F2BD57" }} />
                    <StarIcon style={{ color: "#F2BD57" }} />
                    <StarIcon style={{ color: "#F2BD57" }} />
                    <StarIcon style={{ color: "whitesmoke" }} />
                  </div>
                </Box>
              );
            })}
          </Stack>
        </Container>
      </div>

      <Container className="member_reviews">
        <Box className={"category_title"}>About the shop</Box>
        <Stack
          display={"flex"}
          flexDirection={"row"}
          width={"90%"}
          sx={{ mt: "70px" }}
        >
          <Box
            className={"about_left"}
            sx={{
              backgroundImage: `url(${serverApi}/${chosenShop?.mb_image})`,
            }}
          >
            <div className={"about_left_desc"}>
              <span>{chosenShop?.mb_nick}</span>
              <p>{chosenShop?.mb_description}</p>
            </div>
          </Box>
          <Box className={"about_right"}>
            {Array.from(Array(3).keys()).map((ele, index) => {
              return (
                <Box display={"flex"} flexDirection={"row"} key={index}>
                  <div className={"about_right_img"}></div>
                  <div className={"about_right_desc"}>
                    <span>Our Chefs</span>
                    <p>We invite the best chefs to cook for our customers!</p>
                  </div>
                </Box>
              );
            })}
          </Box>
        </Stack>

        <Stack
          sx={{ mt: "60px" }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box className={"category_title"}>Our Address</Box>
          <iframe
            style={{ marginTop: "60px" }}
            src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=%20%20Busan%20Citizens%20Park+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            width="1320"
            height="500"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </Stack>
      </Container>
    </div>
  );
}
