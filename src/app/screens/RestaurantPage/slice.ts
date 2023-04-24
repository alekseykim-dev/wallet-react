import { createSlice } from "@reduxjs/toolkit";
import { RestaurantPageState } from "../../../types/screen";

// sets initial set to the STORE
const initialState: RestaurantPageState = {
  targetRestaurants: [],
  randomRestaurants: [],
  chosenRestaurant: null,
  targetProducts: [],
  chosenProduct: null,
};

const restaurantPageSlice = createSlice({
  name: "restaurantPage",
  initialState,
    reducers: { 
      // SETTERS
    setTargetRestaurants: (state, action) => {
      state.targetRestaurants = action.payload;
    },
    setRandomRestaurants: (state, action) => {
      state.randomRestaurants = action.payload;
    },
    setChosenRestaurant: (state, action) => {
      state.chosenRestaurant = action.payload;
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
  setTargetRestaurants,
  setRandomRestaurants,
  setChosenRestaurant,
  setTargetProducts,
  setChosenProduct,
} = restaurantPageSlice.actions; // gets from rest page actions

const RestaurantPageReducer = restaurantPageSlice.reducer;  // creates with the help of reducer.. SETS VALUES again and again

// SLICE sends data to the redux store
export default RestaurantPageReducer;
 

