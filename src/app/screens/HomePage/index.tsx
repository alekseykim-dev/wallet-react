import React, { useEffect } from "react";
import { Statistics } from "./statistics";
import { TopShops } from "./topShops";
import { BestShops } from "./bestShops";
import { BestDishes } from "./bestProducts";
import { Advertisements } from "./advertisements";
import { Events } from "./events";
import { Recommendations } from "./recommendations";
import "../../../css/home.css";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { setBestShops, setTopShops } from "../../screens/HomePage/slice";
import {
  retrieveBestShops,
  retrieveTopShops,
} from "../../screens/HomePage/selector";
import { Shop } from "../../../types/user";
import ShopApiService from "../../apiServices/shopApiService";

/** REDUX SLICE */
const actionDispatch = (dispatch: Dispatch) => ({
  // from reduxToolkit sends actions to redux store
  setTopShops: (data: Shop[]) => dispatch(setTopShops(data)),
  setBestShops: (data: Shop[]) => dispatch(setBestShops(data)),
});

export function HomePage() {
  /** INITIALIZATION */
  const { setTopShops: setTopShops, setBestShops: setBestShops } = actionDispatch(
    useDispatch()
  );

  useEffect(() => {
    // must be sync
    // console.log("componentDidMount => Data fetch");   // fetch data form backend

    const shopService = new ShopApiService();
    shopService
      .getTopShops()
      .then((data) => {
        setTopShops(data);
      })
      .catch((err) => console.log(err));

    shopService
      .getShops({ page: 1, limit: 4, order: "mb_point" })
      .then((data) => {
        setBestShops(data)
      })
      .catch((err) => console.log(err));
  }, []);

  // useEffect(() => {
  //   return () => {
  //     effect
  //   };
  // }, [input])

  return (
    <div className="homepage">
      <Statistics />
      <TopShops />
      <BestShops />
      <BestDishes />
      <Advertisements />
      <Events />
      <Recommendations />
    </div>
  );
}
