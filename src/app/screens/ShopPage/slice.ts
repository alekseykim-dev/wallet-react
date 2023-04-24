import { createSlice } from "@reduxjs/toolkit";
import { ShopPageState as ShopPageState } from "../../../types/screen";

// sets initial set to the STORE
const initialState: ShopPageState = {
  targetShops: [],
  randomShops: [],
  chosenShop: null,
  targetProducts: [],
  chosenProduct: null,
};

const shopPageSlice = createSlice({
  name: "shopPage",
  initialState,
    reducers: { 
      // SETTERS
    setTargetShops: (state, action) => {
      state.targetShops = action.payload;
    },
    setRandomShops: (state, action) => {
      state.randomShops = action.payload;
    },
    setChosenShop: (state, action) => {
      state.chosenShop = action.payload;
    },
    setTargetProducts: (state, action) => {
      state.targetProducts = action.payload;
    },
    setChosenProduct: (state, action) => {
      state.chosenProduct = action.payload;
    },
  },
});

export const {
  setTargetShops: setTargetShops,
  setRandomShops: setRandomShops,
  setChosenShop: setChosenShop,
  setTargetProducts,
  setChosenProduct,
} = shopPageSlice.actions; // gets from rest page actions

const ShopPageReducer = shopPageSlice.reducer;  // creates with the help of reducer.. SETS VALUES again and again

// SLICE sends data to the redux store
export default ShopPageReducer;
 

