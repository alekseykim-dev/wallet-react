import React, { useEffect } from "react";
import { Avatar, Box, Container, Stack } from "@mui/material";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Dispatch } from "@reduxjs/toolkit";
import {
  setBestBoArticles,
  setTrendBoArticles,
  setNewsBoArticles,
} from "./slice";
import {
  retrieveBestBoArticles,
  retrieveTrendBoArticles,
  retrieveNewsBoArticles,
} from "./selector";
import { BoArticle } from "../../../types/boArticle";
import CommunityApiService from "../../apiServices/communityApiService";
import { serverApi } from "../../../lib/config";
import TViewer from "../../components/tuiEditor/TViewer";
import { useHistory } from "react-router-dom";
import moment from "moment";

/** REDUX SLICE */
const actionDispatch = (dispach: Dispatch) => ({
  setBestBoArticles: (data: BoArticle[]) => dispach(setBestBoArticles(data)),
  setTrendBoArticles: (data: BoArticle[]) => dispach(setTrendBoArticles(data)),
  setNewsBoArticles: (data: BoArticle[]) => dispach(setNewsBoArticles(data)),
});
/** REDUX SELECTOR */
const trendBoArticlesRetriever = createSelector(
  retrieveTrendBoArticles,
  (trendBoArticles) => ({
    trendBoArticles,
  })
);
const newsBoArticlesRetriever = createSelector(
  retrieveNewsBoArticles,
  (newsBoArticles) => ({
    newsBoArticles,
  })
);

export function Recommendations() {
  /** INITIALIZATIONS */
  const history = useHistory();
  const { setNewsBoArticles, setTrendBoArticles } = actionDispatch(
    useDispatch()
  );

  const { trendBoArticles } = useSelector(trendBoArticlesRetriever);
  const { newsBoArticles } = useSelector(newsBoArticlesRetriever);

  /** HANDLERS */
  const chosenArticleHandler = () => {
    history.push(`/community/`);
  };
  useEffect(() => {
    const communityService = new CommunityApiService();
    communityService
      .getTargetArticles({
        bo_id: "Security",
        page: 1,
        limit: 2,
        order: "art_likes",
      })
      .then((data) => setTrendBoArticles(data))
      .catch((err) => console.log(err));

    communityService
      .getTargetArticles({
        bo_id: "News",
        page: 1,
        limit: 2,
        order: "art_views",
      })
      .then((data) => setNewsBoArticles(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={"top_article_frame"}>
      <Container
        maxWidth="lg"
        sx={{ mb: "100px" }}
        style={{ position: "relative" }}
      >
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Box className={"category_title"}>Reading Hub</Box>
          <Stack className={"article_main"} flexDirection={"row"}>
            <Stack className={"article_container"}>
              <Box className={"article_category"}>Trending News</Box>
              {newsBoArticles?.map((article: BoArticle) => {
                const art_image_url = article?.art_image
                  ? `${serverApi}/${article?.art_image}`
                  : "/community/default_article.svg";
                return (
                  <Stack
                    className={"article_box"}
                    onClick={chosenArticleHandler}
                    key={article._id}
                  >
                    <Box
                      className={"article_img"}
                      sx={{
                        backgroundImage: `url(${art_image_url})`,
                      }}
                    ></Box>
                    <Box className={"article_info"}>
                      <Box className={"article_main_info"}>
                        <div className={"article_author"}>
                          <Avatar
                            alt="Author_photo"
                            src={
                              article?.member_data?.mb_image
                                ? `${serverApi}/${article?.member_data?.mb_image}`
                                : "/auth/user_art.svg"
                            }
                            sx={{ width: "35px", height: "35px" }}
                          />
                          <span className={"author_username"}>
                            {article?.member_data?.mb_nick}
                          </span>
                        </div>
                        <span className={"article_title"}>
                          {article?.art_subject}
                        </span>
                        <p className={"article_desc"}>
                          {moment(article?.createdAt).format("YY-MM-DD hh:mm")}
                        </p>
                      </Box>
                    </Box>
                  </Stack>
                );
              })}
            </Stack>

            <Stack className={"article_container"}>
              <Box className={"article_category"}>Crypto Security News</Box>

              {trendBoArticles?.map((article: BoArticle) => {
                const art_image_url = article?.art_image
                  ? `${serverApi}/${article?.art_image}`
                  : "/community/default_article.svg";
                return (
                  <Stack
                    className={"article_box"}
                    onClick={chosenArticleHandler}
                    key={article._id}
                  >
                    <Box
                      className={"article_img"}
                      sx={{
                        backgroundImage: `url(${art_image_url})`,
                      }}
                    ></Box>
                    <Box className={"article_info"}>
                      <Box className={"article_main_info"}>
                        <div className={"article_author"}>
                          <Avatar
                            alt="Author_photo"
                            src={
                              article?.member_data?.mb_image
                                ? `${serverApi}/${article?.member_data?.mb_image}`
                                : "/auth/user_art.svg"
                            }
                            sx={{ width: "35px", height: "35px" }}
                          />
                          <span className={"author_username"}>
                            {article?.member_data?.mb_nick}
                          </span>
                        </div>
                        <span className={"article_title"}>
                          {article?.art_subject}
                        </span>
                        <p className={"article_desc"}>   {moment(article?.createdAt).format("YY-MM-DD hh:mm")}</p>
                      </Box>
                    </Box>
                  </Stack>
                );
              })}
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
