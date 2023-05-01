import { Box, Container, Stack } from "@mui/material";
import React, { useEffect } from "react";

// REDUX
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
    <div className="best_dishes_frame">
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Box className="category_title">Recommended Products</Box>
          <Stack sx={{ mt: "43px" }} flexDirection={"row"}>
            {trendProducts.map((product: Product, index: number) => {
            const image_path = `${serverApi}/${product.product_images}`;
              console.log('product', product)
              const size_volume =
                product.product_collection === "beverage"
                  ? product.product_volume + "L"
                  : "Size: " + product.product_size;

              return (
                <Box key={index} className="dish_box">
                  <Stack
                    className="dish_img"
                    sx={{
                      backgroundImage: `url(${image_path})`,
                    }}
                  >
                    <div className="dish_sale">{size_volume}</div>
                    <div className="view_btn" onClick={() => chosenProductHandler(product._id)}>
                      See More
                      <img
                        src="/icons/arrow.svg"
                        alt="arrow"
                        style={{ marginLeft: "9px" }}
                      />
                    </div>
                  </Stack>
                  <Stack className="dish_desc">
                    <span className="dish_title_text">
                      {product.product_name}
                    </span>
                    <span className="dish_desc_text">
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
