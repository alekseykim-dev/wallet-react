import { Box, Stack } from "@mui/material";
import moment from "moment";
import CheckBox from "@mui/material/Checkbox";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { BoArticle } from "../../../types/boArticle";
import { serverApi } from "../../../lib/config";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import MemberApiService from "../../apiServices/memberApiService";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import { verifiedMemberData } from "../../apiServices/verify";

export function MemberPosts(props: any) {
  /* INITIALIZATIONS */
  const {
    chosenMemberBoArticles,
    renderChosenArticleHandler,
    setArticlesRebuild,
  } = props;  // memberPosts props

  /* HANDLERS */
  const targetLikeHandler = async (e: any) => {
    try {
      e.stopPropagation();
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
  // targetLikeHandler
  // chosenArticle starting point
  return (
    <Box className="post_content">
      <img className="back_mb" src="/icons/bit_back3.svg" alt="" />
      <img className="back_mb1" src="/icons/bit_back4.svg" alt="" />
      <img className="back_mb2" src="/icons/bit_back4.svg" alt="" />
      {chosenMemberBoArticles.map((article: BoArticle) => {
        const image_path = article.art_image
          ? `${serverApi}/${article.art_image}`
          : "/auth/default_article.svg";
        return (
          <Stack
            className="all_article_box"
            sx={{ cursor: "pointer" }}
            onClick={() => renderChosenArticleHandler(article?._id)}
          >
            <Box
              className="all_article_img"
              sx={{ backgroundImage: `url(${image_path})` }}
            ></Box>
            <Box className="all_article_container">
              <Box style={{ width: "50%" }}>
                <Box alignItems={"center"} display="flex">
                  <img
                    src={
                      article?.member_data?.mb_image
                        ? `${serverApi}/${article?.member_data?.mb_image}`
                        : "/auth/default_user.svg"
                    }
                    alt="profile pic"
                    width={"35px"}
                    height={"35px"}
                    style={{ borderRadius: "10%", backgroundSize: "cover" }}
                  />
                  <span className="all_article_author_user">
                    {article?.member_data?.mb_nick}
                  </span>
                </Box>

                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  sx={{ mt: "10px" }}
                >
                  <span className="all_article_title">{article?.bo_id}</span>
                  <p className="all_article_desc">{article?.art_subject}</p>
                </Box>
              </Box>

              <Box
                sx={{ display: "flex", height: "30px" }}
                flexDirection={"column"}
                justifyContent={"center"}
              >
                <Box
                  sx={{ display: "flex" }}
                  flexDirection={"row"}
                  alignItems={"center"}
                >
                  <p className="article_time_desc">
                    {moment(article?.createdAt).format("YY-MM-DD hh:mm")}
                  </p>

                  <div style={{ display: "flex", marginLeft: "42px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginRight: "20px",
                      }}
                    >
                      <CheckBox
                        icon={<FavoriteBorder style={{ color: "#5a5a72" }} />}
                        checkedIcon={<Favorite style={{ color: "red" }} />}
                        id={article?._id}
                        checked={
                          article?.me_liked && article.me_liked[0]?.my_favorite
                            ? true
                            : false
                        }
                        onClick={targetLikeHandler}
                      />

                      <span className="article_time_desc">
                        {" "}
                        {article?.art_likes}{" "}
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <RemoveRedEyeIcon
                        style={{ color: "#5a5a72" }}
                        sx={{ mr: "10px" }}
                      />
                      <span className="article_time_desc">
                        {article?.art_views}
                      </span>
                    </div>
                  </div>
                </Box>
              </Box>
            </Box>
          </Stack>
        );
      })}
    </Box>
  );
}
