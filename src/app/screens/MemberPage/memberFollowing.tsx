import React, { useEffect, useState } from "react";
import { Avatar, Box, Button, Stack } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Dispatch } from "@reduxjs/toolkit";
import { setMemberFollowings } from "./slice";
import { retrieveMemberFollowings } from "./selector";
import { FollowSearchObj, Following } from "../../../types/follow";
import FollowApiService from "../../apiServices/followApiService";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";
import { verifiedMemberData } from "../../apiServices/verify";

/** REDUX SLICE */
const actionDispatch = (dispatch: Dispatch) => ({
  setMemberFollowings: (data: Following[]) =>
    dispatch(setMemberFollowings(data)),
});
/* REDUX SELECTOR */
const memberFollowingsRetriever = createSelector(
  retrieveMemberFollowings,
  (memberFollowings) => ({
    memberFollowings,
  })
);


export function MemberFollowing(props: any) {
  /* INITIALIZATIONS */
  const history = useHistory();
  const { followRebuild, setFollowRebuild, mb_id } = props;
  const { setMemberFollowings } = actionDispatch(useDispatch());
  const { memberFollowings } = useSelector(memberFollowingsRetriever);

  const [followingsSearchObj, setFollowingsSearchObj] =
    useState<FollowSearchObj>({
      page: 1,
      limit: 5,
      mb_id: mb_id,
    });

  useEffect(() => {
    const followService = new FollowApiService();
    followService
      .getMemberFollowings(followingsSearchObj)
      .then((data) => setMemberFollowings(data))
      .catch((err) => console.log(err));
  }, [followingsSearchObj, followRebuild]);

  /* HANDLERS */

  const unsubscriberHandler = async (e: any, id: string) => {
    try {
      e.stopPropagation();
      assert.ok(verifiedMemberData, Definer.auth_err1);

      const followService = new FollowApiService();
      followService.unsubscribe(id);

      await sweetTopSmallSuccessAlert("Unsubscribed!", 700, false);
      setFollowRebuild(!followRebuild);
    } catch (err: any) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  const handlePaginationChange = (event: any, value: number) => {
    followingsSearchObj.page = value;
    setFollowingsSearchObj({ ...followingsSearchObj });
  };

    const visitMemberHandler = (mb_id: string) => {
      history.push(`/member-page/other?mb_id=${mb_id}`);
      document.location.reload();
    };
  
  
  return (
    <Stack>
      <img className="back_mb" src="/icons/bit_back3.svg" alt="" />
      <img className="back_mb1" src="/icons/bit_back4.svg" alt="" />
      <img className="back_mb2" src="/icons/bit_back4.svg" alt="" />
      {memberFollowings.map((following: Following) => {
        const image_url = following?.follow_member_data?.mb_image
          ? `${serverApi}/${following.follow_member_data.mb_image}`
          : "/auth/user_art.svg";
        return (
          <Box className="follow_box">
            <Avatar
              alt={"avatar"}
              src={image_url}
              sx={{ width: 89, height: 89 }}
              style={{ cursor: "pointer" }}
              onClick={() => visitMemberHandler(following?.follow_id)}
            />
            <div
              style={{
                width: "400px",
                display: "flex",
                flexDirection: "column",
                marginLeft: "25px",
                height: "85%",
              }}
            >
              <span className="username_text">
                {" "}
                {following?.follow_member_data?.mb_type}
              </span>
              <span
                className="name_text"
                style={{ cursor: "pointer" }}
                onClick={() => visitMemberHandler(following?.follow_id)}
              >
                {following?.follow_member_data?.mb_nick}
              </span>
            </div>

            {props.actions_enabled && (
              <Button
                variant="contained"
                className="follow_cancel_btn"
                onClick={(e) => unsubscriberHandler(e, following?.follow_id)}
              >
                Unfollow
              </Button>
            )}
          </Box>
        );
      })}
      <Stack
        sx={{ my: "40px" }}
        direction="row"
        alignItems={"center"}
        justifyContent="center"
      >
        <Box className="bottom_box">
          <Pagination
            count={
              followingsSearchObj.page >= 3 ? followingsSearchObj.page + 1 : 3
            }
            page={followingsSearchObj.page}
            renderItem={(item) => (
              <PaginationItem
                components={{
                  previous: ArrowBackIcon,
                  next: ArrowForwardIcon,
                }}
                {...item}
                color={"secondary"}
              />
            )}
            onChange={handlePaginationChange}
          />
        </Box>
      </Stack>
    </Stack>
  );
}
