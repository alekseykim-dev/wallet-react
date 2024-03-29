import React from "react";
import { Box, Link, Stack } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Checkbox from "@mui/material/Checkbox";
import moment from "moment";
import { BoArticle } from "../../../types/boArticle";
import { serverApi } from "../../../lib/config";
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";
import { Definer } from "../../../lib/Definer";
import MemberApiService from "../../apiServices/memberApiService";
import assert from "assert";
import { verifiedMemberData } from "../../apiServices/verify";

export function TargetArticles(props: any) {
  const { setArticlesRebuild } = props;
  /** HANDLER */

    const targetLikeHandler = async (e: any) => {
      try {
        assert.ok(verifiedMemberData, Definer.auth_err1);

        const memberService = new MemberApiService(),
          like_result = await memberService.memberLikeTarget({
            like_ref_id: e.target.id,
            group_type: "community",
          });
        assert.ok(like_result, Definer.general_err1);
        await sweetTopSmallSuccessAlert("Success!", 700, false);
        setArticlesRebuild(new Date());
      } catch (err: any) {
        console.log("targetLikeHandler, ERROR:", err);
        sweetErrorHandling(err).then();
      }
    };
  return (
    <Stack>
      {props.targetBoArticles?.map((article: BoArticle) => {
        const art_image_url = article?.art_image
          ? `${serverApi}/${article.art_image}`
          : "/community/default_article.svg";
        return (
          <Link
            className={"all_article_box"}
            key={article._id}
            sx={{ textDecoration: "none" }}
            href={`/member-page/other?mb_id=${article.mb_id}&art_id=${article._id}`}
          >
            <Box
              className={"all_article_img"}
              sx={{ backgroundImage: `url(${art_image_url})` }}
            ></Box>
            <Box className={"all_article_container"}>
              <Box alignItems={"center"} display={"flex"}>
                <img
                  src={
                    article?.member_data?.mb_image
                      ? `${serverApi}/${article?.member_data?.mb_image}`
                      : "/auth/user_art.svg"
                  }
                  width={"35px"}
                  style={{ borderRadius: "50%", backgroundSize: "cover" }}
                />
                <span className="all_article_author_user">
                  {article?.member_data.mb_nick}
                </span>
              </Box>
              <Box
                display={"flex"}
                flexDirection={"column"}
                sx={{ mt: "15px" }}
              >
                <span className="all_article_title">{article?.bo_id}</span>
                <p className="all_article_desc">{article?.art_subject}</p>
              </Box>
              <Box>
                <Box
                  className={"article_share"}
                  style={{ width: "100%", height: "auto" }}
                >
                  <Box
                    className={"article_share_main"}
                    style={{
                      color: "#1f1f1f",
                      marginLeft: "65%",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <span>
                      {moment(article?.createdAt).format("YYYY.MM.DD")}
                    </span>
                    <Checkbox
                      sx={{ ml: "40px", padding: "0px" }}
                      icon={<FavoriteBorder />}
                      checkedIcon={<Favorite style={{ color: "red" }} />}
                      id={article?._id}
                      onClick={targetLikeHandler}
                      checked={
                        article?.me_liked && article.me_liked[0]?.my_favorite
                          ? true
                          : false
                      }
                    />
                    <span className="article_time_desc">
                      {article?.art_likes}{" "}
                    </span>
                    <RemoveRedEyeIcon style={{ color: "5a5a72" }} />
                    <span className="article_time_desc">
                      {article?.art_views}
                    </span>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Link>
        );
      })}
    </Stack>
  );
}
