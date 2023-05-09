import React, { useEffect, useRef, useState } from "react";
import { Container, Box, Button, Stack, Popover, List, ListItem, ListItemText, ListItemButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import StarIcon from "@mui/icons-material/Star";
import { Swiper, SwiperSlide } from "swiper/react";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import { useHistory, useParams } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
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


  /** Enabling search */
  const [query, setQuery] = useState("");

  const filteredProducts = targetProducts.filter((product) =>
    product.product_name.toLowerCase().includes(query.toLowerCase())
  );

  /**  Enabling search */
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
      <img className="back12" src="/icons/bit_back4.svg" alt="" />
      <img className="back13" src="/icons/bit_back3.svg" alt="" />
      <img className="back14" src="/icons/bit_back4.svg" alt="" />
      <img className="back15" src="/icons/bit_back3.svg" alt="" />
      <img className="back16" src="/icons/bit_back4.svg" alt="" />
      <img className="back17" src="/icons/bit_back4.svg" alt="" />
      <img className="back18" src="/icons/bit_back3.svg" alt="" />
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Stack className="avatar_big_box">
            <Box className="top_text">
              <p>{chosenShop?.mb_nick}</p>
              <Box className="Single_search_big_box">
                <form className="Single_search_form" action="" method="">
                  <input
                    type="search"
                    className="Single_searchInput"
                    name="Single_resSearch"
                    placeholder="What are you searching for today?"
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  {/* <Button
                    className="Single_button_search"
                    variant="contained"
                    endIcon={<SearchIcon />}
                  >
                    Search
                  </Button> */}
                </form>
              </Box>
            </Box>
          </Stack>

          <Stack className="filter_cont" flexDirection={"row"}>
            <Box className={"drop_down"}>
              <button className="dropbtn">Filter</button>
              <div className="drop_down_content">
                <a onClick={() => searchCollectionHandler("wallet")}>Wallets</a>
                <a onClick={() => searchCollectionHandler("accessory")}>
                  Accessories
                </a>
                <a onClick={() => searchCollectionHandler("bundle")}>Bundles</a>
              </div>
            </Box>

            <Box className={"drop_down_right"}>
              <button className="dropbtn_right">Sort by</button>
              <div className="drop_down_cont_right">
                <a onClick={() => searchOrderHandler("createdAt")}>
                  Newly Added
                </a>
                <a onClick={() => searchOrderHandler("product_price")}>
                  Price: Ascending
                </a>
                <a onClick={() => searchOrderHandler("product_likes")}>
                  Most Liked
                </a>
                <a onClick={() => searchOrderHandler("product_views")}>
                  Most Viewed
                </a>
              </div>
            </Box>
          </Stack>

          <Stack
            style={{ width: "100%", display: "flex" }}
            flexDirection={"row"}
          >
            <Stack className={"product_wrapper"}>
              {filteredProducts.map((product: Product) => {
                const image_path = `${serverApi}/${product.product_images[0]}`;

                return (
                  <Box
                    className={"product_box"}
                    key={`${product._id}`}
                    onClick={() => chosenProductHandler(product._id)}
                  >
                    <Box
                      className="product_img"
                      sx={{
                        backgroundImage: `url(${image_path})`,
                      }}
                      key={product._id}
                    >
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

                    <Box className={"product_desc"}>
                      <span className={"product_title_text"}>
                        {product.product_name}
                      </span>
                      <span className={"product_country_text"}>
                        Ships from {product.product_country}
                      </span>
                      <span className={"product_color_text"}>
                        Color: {product.product_color}
                      </span>
                      <span className={"product_price_text"}>
                        $ {product.product_price}
                      </span>
                    </Box>
                  </Box>
                );
              })}
            </Stack>
          </Stack>
          <div className="other_shop_see">See also</div>

          <Stack
            style={{ width: "100%", display: "flex" }}
            flexDirection={"row"}
            sx={{ mt: "35px" }}
          >
            <Box className="prev_btn shop-prev">
              <ArrowBackIosNewIcon
                sx={{ fontSize: 40, color: "#575656", cursor: "pointer" }}
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
              <ArrowForwardIosIcon
                sx={{ fontSize: 40, color: "#575656", cursor: "pointer" }}
              />
            </Box>
          </Stack>
        </Stack>
      </Container>

      <div className="review_for_shop">
        <Container className="review_container">
          <Box className={"category_title_review"}>Experts' opinion</Box>
          <Stack className="review_wrapper">
            <Box className="review_left">
              <Box className="img_wrapper">
                <img src="/community/michael.jpg" className="review_img" />
              </Box>
            </Box>
            <Stack className="review_right">
              <Box>
                <p className="review_title">Michael Saylor</p>
                <p className="review_title_p">CEO of Microstrategy</p>
              </Box>
              <Box className="review_text">
                "The most secure way to store your bitcoin is in a cold storage
                wallet. A cold storage wallet is a device that is not connected
                to the internet, which means it's not vulnerable to online
                hacks."
              </Box>
              <Box className="review_text_auth">
                -Michael Saylor in an interview with CNBC on February 24, 2021.
              </Box>
              <Box
                display={"flex"}
                flexDirection={"row"}
                sx={{ mb: "20px" }}
                justifyContent={"flex-end"}
              >
                <FavoriteIcon className="review_icons" /> 999+
                <ChatBubbleIcon className="review_icons" /> 999+
              </Box>
            </Stack>
          </Stack>

          <Stack className="review_wrapper">
            <Box className="review_left">
              <Box className="img_wrapper">
                <img src="/community/buterin.jpg" className="review_img" />
              </Box>
            </Box>
            <Stack className="review_right">
              <Box>
                <p className="review_title">Vitalik Buterin</p>
                <p className="review_title_p">Co-founder of Ethereum</p>
              </Box>
              <Box className="review_text">
                "The main advantage of cold storage is that it makes it much
                harder for hackers to steal your assets. With a cold wallet,
                your private keys are stored offline, making them much less
                vulnerable to attacks"
              </Box>
              <Box className="review_text_auth">
                - Vitalik Buterin, in an interview with Decrypt in 2021.
              </Box>
              <Box
                display={"flex"}
                flexDirection={"row"}
                sx={{ mb: "20px" }}
                justifyContent={"flex-end"}
              >
                <FavoriteIcon className="review_icons" /> 999+
                <ChatBubbleIcon className="review_icons" /> 999+
              </Box>
            </Stack>
          </Stack>

          <Stack className="review_wrapper">
            <Box className="review_left">
              <Box className="img_wrapper">
                <img src="/community/planb.jpg" className="review_img" />
              </Box>
            </Box>
            <Stack className="review_right">
              <Box>
                <p className="review_title">Plan B</p>
                <p className="review_title_p">
                  Crypto analyst, creator of stock-to-flow (S2F) model
                </p>
              </Box>
              <Box className="review_text">
                "Investors are finally recognizing that bitcoin is not just a
                high-risk, speculative asset, but an investable, safe-haven
                asset that belongs in any diversified portfolio. However, you
                need to take your own responsibility and custody your bitcoin,
                preferably in a cold wallet."
              </Box>
              <Box className="review_text_auth">
                - Plan B in an interview with Kitco News on December 17, 2020.
              </Box>
              <Box
                display={"flex"}
                flexDirection={"row"}
                sx={{ mb: "20px" }}
                justifyContent={"flex-end"}
              >
                <FavoriteIcon className="review_icons" /> 999+
                <ChatBubbleIcon className="review_icons" /> 999+
              </Box>
            </Stack>
          </Stack>
        </Container>
      </div>
    </div>
  );
}
