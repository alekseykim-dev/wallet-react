import { Box, Container, Stack } from "@mui/material";
import React, { useEffect } from "react";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setTrendProducts } from "./slice";
import { Product } from "../../../types/product";
import ProductApiService from "../../apiServices/productApiService";
import { createSelector } from "reselect";
import { retrieveTrendProducts } from "./selector";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";

/** REDUX SLICE */
const actionDispatch = (dispatch: Dispatch) => ({
  // from reduxToolkit sends actions to redux store
  setTrendProducts: (data: Product[]) => dispatch(setTrendProducts(data)),
});

/* REDUX SELECTOR */
const trendProductsRetriever = createSelector(
  retrieveTrendProducts,
  (trendProducts) => ({
    trendProducts,
  })
);

export function BestProducts() {
  /** INITIALIZATION */
  const history = useHistory()
  const { setTrendProducts } = actionDispatch(useDispatch());
  const { trendProducts } = useSelector(trendProductsRetriever);
  useEffect(() => {
    const productService = new ProductApiService();
    productService
      .getTargetProducts({ order: "product_likes", page: 1, limit: 4 })
      .then((data) => {
        setTrendProducts(data);
      })
      .catch((err) => console.log(err));
  }, []);

  /** HANDLERS  */
  const chosenProductHandler = (id: string) => {
    history.push(`/shop/products/${id}`);
  }

  return (
    <div className="best_shops_frame">
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Box className="category_title">
            Best Value
            <img className="back4" src="/icons/bit_back3.svg" alt="" />
            <img className="back5" src="/icons/bit_back3.svg" alt="" />
          </Box>
          <Stack sx={{ mt: "23px", zIndex: "1"}} flexDirection={"row"}>
            {trendProducts.map((product: Product, index: number) => {
              const image_path = `${serverApi}/${product.product_images[0]}`;
              console.log("product", product);

              return (
                <Box key={index} className="product_box">
                  <Stack
                    className="products_img"
                    sx={{
                      backgroundImage: `url(${image_path})`,
                    }}
                  >
                    <div
                      className="view_btn"
                      onClick={() => chosenProductHandler(product._id)}
                    >
                      Take a look
                      <img
                        src="/icons/arrow.svg"
                        alt="arrow"
                        style={{ marginLeft: "9px" }}
                      />
                    </div>
                  </Stack>
                  <Stack className="products_desc">
                    <span className="products_title_text">
                      {product.product_name}
                    </span>
                    <span className="product_country_text">
                      Ships from {product.product_country}
                    </span>
                    <span className={"products_color_text"}>
                      Color: {product.product_color}
                    </span>
                    <span className="products_desc_text">
                      <span className="price"> ${product.product_price} </span>
                    </span>
                  </Stack>
                </Box>
              );
            })}
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
