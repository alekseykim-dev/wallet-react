import React, { useEffect, useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import FacebookIcon from "@mui/icons-material/Facebook";
import TelegramIcon from "@mui/icons-material/Telegram";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { TabContext } from "@mui/lab";
import TabPanel from "@mui/lab/TabPanel";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, Button, Container, Stack } from "@mui/material";
import { MemberPosts } from "./memberPosts";
import { MemberFollowers } from "./memberFollowers";
import { MemberFollowing } from "./memberFollowing";
import { MySettings } from "./mySettings";
import TViewer from "../../components/tuiEditor/TViewer";
import { TuiEditor } from "../../components/tuiEditor/TuiEditor";

import { Member } from "../../../types/user";
import { BoArticle, SearchMemberArticlesObj } from "../../../types/boArticle";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Dispatch } from "@reduxjs/toolkit";
import {
  setChosenMember,
  setChosenMemberBoArticles,
  setChosenSingleBoArticles,
} from "./slice";
import {
  retrieveChosenMember,
  retrieveChosenMemberBoArticles,
  retrieveChosenSingleBoArticles,
} from "./selector";
import { useHistory } from "react-router-dom";
import MemberApiService from "../../apiServices/memberApiService";
import CommunityApiService from "../../apiServices/communityApiService";
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";
import FollowApiService from "../../apiServices/followApiService";
import { Definer } from "../../../lib/Definer";
import assert from "assert";
import { verifiedMemberData } from "../../apiServices/verify";
import { serverApi } from "../../../lib/config";

/** REDUX SLICE */
const actionDispatch = (dispatch: Dispatch) => ({
  setChosenMember: (data: Member) => dispatch(setChosenMember(data)),
  setChosenMemberBoArticles: (data: BoArticle[]) =>
    dispatch(setChosenMemberBoArticles(data)),
  setChosenSingleBoArticles: (data: BoArticle) =>
    dispatch(setChosenSingleBoArticles(data)),
});
/* REDUX SELECTOR */
const chosenMemberRetriever = createSelector(
  retrieveChosenMember,
  (chosenMember) => ({
    chosenMember,
  })
);
const chosenMemberBoArticlesRetriever = createSelector(
  retrieveChosenMemberBoArticles,
  (chosenMemberBoArticles) => ({
    chosenMemberBoArticles,
  })
);
const chosenSingleBoArticlesRetriever = createSelector(
  retrieveChosenSingleBoArticles,
  (chosenSingleBoArticles) => ({
    chosenSingleBoArticles,
  })
);

export function VisitOtherPage(props: any) {
  /* INITIALIZATIONS */

  const history = useHistory();
  const {chosen_mb_id, chosen_art_id } = props;

  const {
    setChosenMember,
    setChosenMemberBoArticles,
    setChosenSingleBoArticles,
  } = actionDispatch(useDispatch());
  const { chosenMember } = useSelector(chosenMemberRetriever);
  const { chosenMemberBoArticles } = useSelector(
    chosenMemberBoArticlesRetriever
  );
  const { chosenSingleBoArticles } = useSelector(
    chosenSingleBoArticlesRetriever
  );

  const [value, setValue] = React.useState("1");
  const [memberArticlesSearchObj, setMemberArticlesSearchObj] =
    useState<SearchMemberArticlesObj>({
      mb_id: chosen_mb_id,
      page: 1,
      limit: 4,
    });
  const [articlesRebuild, setArticlesRebuild] = useState<Date>(new Date());
  const [followRebuild, setFollowRebuild] = useState<boolean>(false);

  useEffect(() => {
    if (chosen_mb_id === verifiedMemberData?._id) {
      history.push("/member-page");
    }

    const communityService = new CommunityApiService();
    if (chosen_art_id) {
      communityService
        .getChosenArticle(chosen_art_id)
        .then((data) => {
          setChosenSingleBoArticles(data);
          setValue("4");
        })
        .catch((err) => console.log(err));
    }
    communityService
      .getMemberCommunityArticles(memberArticlesSearchObj)
      .then((data) => setChosenMemberBoArticles(data))
      .catch((err) => console.log(err));
  }, [memberArticlesSearchObj, chosen_mb_id, articlesRebuild]);

  useEffect(() => {
    if (chosen_mb_id === verifiedMemberData?._id) {
      history.push("/member-page");
    }

    const memberService = new MemberApiService();
    memberService
      .getChosenMember(memberArticlesSearchObj.mb_id)
      .then((data) => setChosenMember(data))
      .catch((err) => console.log(err));
  }, [verifiedMemberData, chosen_mb_id, followRebuild]);
  /* HANDLES */
  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };

   const handlePaginationChange = (event: any, value: number) => {
     memberArticlesSearchObj.page = value;
     setMemberArticlesSearchObj({ ...memberArticlesSearchObj });
   };

   const renderChosenArticleHandler = async (art_id: string) => {
     try {
       const communityService = new CommunityApiService();
       communityService
         .getChosenArticle(art_id)
         .then((data) => {
           setChosenSingleBoArticles(data);
           setValue("4");
         })
         .catch((err) => console.log(err));
     } catch (err: any) {
       console.log(err);
       sweetErrorHandling(err).then();
     }
   };

   const subscriberHandler = async (e: any,) => {
     try {
       assert.ok(verifiedMemberData, Definer.auth_err1);

       const followService = new FollowApiService();
       await followService.subscribe(e.target.value);
       await sweetTopSmallSuccessAlert(
         "Subscribed successfully!",
         700,
         false
       );
       setFollowRebuild(!followRebuild);
     } catch (err: any) {
       console.log(err);
       sweetErrorHandling(err).then();
     }
   };

   const unsubscriberHandler = async (e: any,) => {
     try {
       assert.ok(verifiedMemberData, Definer.auth_err1);

       const followService = new FollowApiService();
       await followService.unsubscribe(e.target.value);
       await sweetTopSmallSuccessAlert(
         "Unsubscribed successfully!",
         700,
         false
       );
       setFollowRebuild(!followRebuild);
     } catch (err: any) {
       console.log(err);
       sweetErrorHandling(err).then();
     }
   };

  return (
    <div className="my_page">
      <Container maxWidth="lg" sx={{ mt: "50px", mb: "50px" }}>
        <Stack className="my_page_frame">
          <TabContext value={value}>
            <Stack className="my_page_left">
              <Box display={"flex"} flexDirection={"column"}>
                <TabPanel value="1">
                  <Box className="menu_name">Articles</Box>
                  <Box className="menu_content">
                    <MemberPosts
                      chosenMemberBoArticles={chosenMemberBoArticles}
                      renderChosenArticleHandler={renderChosenArticleHandler}
                      setArticlesRebuild={setArticlesRebuild}
                    />
                    <Stack
                      sx={{ my: "40px" }}
                      direction="row"
                      alignItems={"center"}
                      justifyContent="center"
                    >
                      <Box className="bottom_box">
                        <Pagination
                          count={
                            memberArticlesSearchObj.page >= 3
                              ? memberArticlesSearchObj.page + 1
                              : 3
                          }
                          page={memberArticlesSearchObj.page}
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
                  </Box>
                </TabPanel>

                <TabPanel value="2">
                  <Box className="menu_name">Followers</Box>
                  <Box className="menu_content">
                    <MemberFollowers
                      actions_enabled={false}
                      mb_id={chosen_mb_id}
                      followRebuild={followRebuild}
                      setFollowRebuild={setFollowRebuild}
                    />
                  </Box>
                </TabPanel>

                <TabPanel value="3">
                  <Box className="menu_name">Followings</Box>
                  <Box className="menu_content">
                    <MemberFollowing
                      actions_enabled={false}
                      mb_id={chosen_mb_id}
                      followRebuild={followRebuild}
                      setFollowRebuild={setFollowRebuild}
                    />
                  </Box>
                </TabPanel>

                <TabPanel value="4">
                  <Box className="menu_name">Picked Article</Box>
                  <Box className={"menu_content"}>
                    <TViewer chosenSingleBoArticles={chosenSingleBoArticles} />
                  </Box>
                </TabPanel>
              </Box>
            </Stack>

            <Stack className="my_page_right">
              <Box className="order_info_box">
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  alignItems="center"
                >
                  <div className="order_user_img">
                    <img
                      alt="profile img"
                      src={
                        chosenMember?.mb_image
                          ? `${serverApi}/${chosenMember?.mb_image}`
                          : "/auth/default_user.svg"
                      }
                      className="order_user_avatar"
                      style={{ borderRadius: "50%" }}
                    />
                  </div>
                  <span className="order_user_name">
                    {chosenMember?.mb_nick}
                  </span>
                  <span className="order_user_prof">
                    {chosenMember?.mb_type}
                  </span>
                </Box>

                <Box className="user_media_box">
                  <FacebookIcon />
                  <InstagramIcon />
                  <TelegramIcon />
                  <YouTubeIcon />
                </Box>
                <Box className="user_media_box">
                  <p className="follows">
                    Followers: {chosenMember?.mb_subscriber_cnt}
                  </p>
                  <p className="follows">
                    Following: {chosenMember?.mb_follow_cnt}
                  </p>
                </Box>
                <p className="user_desc">
                  Hey! I'm {chosenMember?.mb_nick}. Let's be friends!
                </p>

                <Box
                  display={"flex"}
                  justifyContent="flex-end"
                  sx={{ mt: "10px" }}
                >
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    {chosenMember?.me_followed &&
                    chosenMember.me_followed[0]?.my_following ? (
                      <Tab
                        style={{ flexDirection: "column" }}
                        value={"4"}
                        component={(e) => (
                          <Button
                            value={chosenMember?._id}
                            onClick={unsubscriberHandler}
                            variant="contained"
                            style={{ backgroundColor: "#f70909b8" }}
                          >
                            Unfollow
                          </Button>
                        )}
                      />
                    ) : (
                      <Tab
                        style={{ flexDirection: "column" }}
                        value={"4"}
                        component={(e) => (
                          <Button
                            value={chosenMember?._id}
                            variant="contained"
                            style={{ backgroundColor: "#30945e" }}
                            onClick={subscriberHandler}
                          >
                            Follow
                          </Button>
                        )}
                      />
                    )}
                  </TabList>
                </Box>
                <Box className="my_page_menu">
                  <TabList
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    sx={{
                      borderRight: 1,
                      borderColor: "divider",
                      cursor: "pointer",
                    }}
                  >
                    <Tab
                      style={{ flexDirection: "column" }}
                      value={"1"}
                      component={(e) => (
                        <div
                          className={`menu_box`}
                          onClick={() => setValue("1")}
                        >
                          <img src="/icons/post.svg" />
                          <span>All Articles</span>
                        </div>
                      )}
                    />
                    <Tab
                      style={{ flexDirection: "column" }}
                      value={"2"}
                      component={() => (
                        <div
                          className={`menu_box`}
                          onClick={() => setValue("2")}
                        >
                          <img src="/icons/followers.svg" />
                          <span>Followers</span>
                        </div>
                      )}
                    />
                    <Tab
                      style={{ flexDirection: "column" }}
                      value={"3"}
                      component={() => (
                        <div
                          className={`menu_box`}
                          onClick={() => setValue("3")}
                        >
                          <img src="/icons/following.svg" />
                          <span>Following</span>
                        </div>
                      )}
                    />
                  </TabList>
                </Box>
              </Box>
            </Stack>
          </TabContext>
        </Stack>
      </Container>
    </div>
  );
}
