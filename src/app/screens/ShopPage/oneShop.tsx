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

  const filteredProducts = targetProducts.filter(
    (product) =>
      product.product_name.toLowerCase().includes(query.toLowerCase()) ||
      product.product_country.toLowerCase().includes(query.toLowerCase()) ||
      product.product_color.toLowerCase().includes(query.toLowerCase()) ||
      product.product_description.toLowerCase().includes(query.toLowerCase()) ||
      product.product_collection.toLowerCase().includes(query.toLowerCase())
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

  
const handleSingleSelection = (groupName: string, selectedValue: string) => {
  const checkboxes = document.querySelectorAll(
    `input[name=${groupName}]`
  ) as NodeListOf<HTMLInputElement>;
  checkboxes.forEach((checkbox: HTMLInputElement) => {
    checkbox.checked = checkbox.value === selectedValue;
  });

  // Call the appropriate handler function based on the selected value
  if (groupName === "filter") {
    searchCollectionHandler(selectedValue);
  } else if (groupName === "sort") {
    searchOrderHandler(selectedValue);
  }
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
                    placeholder="Input product name, country, color or description here"
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </form>

                <Box className={"drop_down"}>
                  <div>
                    <label className="checkbox_list">
                      <input
                        className="checkbox_list_input"
                        type="radio"
                        name="filter"
                        value="wallet"
                        defaultChecked
                        onChange={() =>
                          handleSingleSelection("filter", "wallet")
                        }
                      />
                      Wallets
                    </label>
                    <label className="checkbox_list">
                      <input
                        className="checkbox_list_input"
                        type="radio"
                        name="filter"
                        value="accessory"
                        onChange={() =>
                          handleSingleSelection("filter", "accessory")
                        }
                      />
                      Accessories
                    </label>
                    <label className="checkbox_list">
                      <input
                        className="checkbox_list_input"
                        type="radio"
                        name="filter"
                        value="bundle"
                        onChange={() =>
                          handleSingleSelection("filter", "bundle")
                        }
                      />
                      Bundles
                    </label>
                  </div>
                </Box>

                <Box className={"drop_down_right"}>
                  <div className="checkbox_list">
                    <label className="checkbox_list">
                      <input
                        className="checkbox_list_input"
                        type="radio"
                        name="sort"
                        value="createdAt"
                        defaultChecked
                        onChange={() =>
                          handleSingleSelection("sort", "createdAt")
                        }
                      />
                      Newly Added
                    </label>
                    <label className="checkbox_list">
                      <input
                        className="checkbox_list_input"
                        type="radio"
                        name="sort"
                        value="product_price"
                        onChange={() =>
                          handleSingleSelection("sort", "product_price")
                        }
                      />
                      Price: Ascending
                    </label>
                    <label className="checkbox_list">
                      <input
                        className="checkbox_list_input"
                        type="radio"
                        name="sort"
                        value="product_likes"
                        onChange={() =>
                          handleSingleSelection("sort", "product_likes")
                        }
                      />
                      Most Liked
                    </label>
                    <label className="checkbox_list">
                      <input
                        className="checkbox_list_input"
                        type="radio"
                        name="sort"
                        value="product_views"
                        onChange={() =>
                          handleSingleSelection("sort", "product_views")
                        }
                      />
                      Most Viewed
                    </label>
                  </div>
                </Box>
              </Box>
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
                            props.onAddFav(product);
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
            style={{ width: "100%", display: "flex", height: "300px" }}
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
    </div>
  );
}
