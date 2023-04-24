import { createSelector } from "@reduxjs/toolkit";
import { AppRootState } from "../../../types/screen";

const selectMemberPage = (state: AppRootState) => state.memberPage;

export const retrieveChosenMember = createSelector(
  selectMemberPage,
  (MemberPage) => MemberPage.chosenMember
);
export const retrieveChosenMemberBoArticles = createSelector(
  selectMemberPage,
  (MemberPage) => MemberPage.chosenMemberBoArticles
);
export const retrieveChosenSingleBoArticles = createSelector(
  selectMemberPage,
  (MemberPage) => MemberPage.chosenSingleBoArticles
);
export const retrieveMemberFollowers = createSelector(
  selectMemberPage,
  (MemberPage) => MemberPage.memberFollowers
);
export const retrieveMemberFollowings = createSelector(
  selectMemberPage,
  (MemberPage) => MemberPage.memberFollowings
);
