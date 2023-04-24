import { createSlice } from "@reduxjs/toolkit";
import { MemberPageState } from "../../../types/screen";

const initialState: MemberPageState = {
  chosenMember: null,
  chosenMemberBoArticles: [],
  chosenSingleBoArticles: null,
  memberFollowers: [],
  memberFollowings: [],
};

const memberPageSlice = createSlice({
  name: "memberPage",
  initialState,
  reducers: {
    setChosenMember: (state, action) => {
      state.chosenMember = action.payload;
    },
    setChosenMemberBoArticles: (state, action) => {
      state.chosenMemberBoArticles = action.payload;
    },
    setChosenSingleBoArticles: (state, action) => {
      state.chosenSingleBoArticles = action.payload;
    },
    setMemberFollowers: (state, action) => {
      state.memberFollowers = action.payload;
    },
    setMemberFollowings: (state, action) => {
      state.memberFollowings = action.payload;
    },
  },
});

export const {
  setChosenMember,
  setChosenMemberBoArticles,
  setChosenSingleBoArticles,
  setMemberFollowers,
  setMemberFollowings,
} = memberPageSlice.actions;

const MemberPageReducer = memberPageSlice.reducer;
export default MemberPageReducer;
