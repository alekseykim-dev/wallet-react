import React, { useEffect, useState } from "react";
import { Box, Button, Checkbox, Container, Stack } from "@mui/material";
import Rating from "@mui/material/Rating";
import { Swiper, SwiperSlide } from "swiper/react";
import CheckBox from "@mui/material/Checkbox";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Marginer from "../../components/marginer";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { useParams } from "react-router-dom";
import { Product } from "../../../types/product";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import {
  retrieveChosenProduct,
  retrieveChosenShop,
} from "./selector";
import { Dispatch } from "@reduxjs/toolkit";
import {
  setChosenProduct,
  setChosenShop,
} from "./slice";
import { Shop } from "../../../types/user";
import ProductApiService from "../../apiServices/productApiService";
import ShopApiService from "../../apiServices/shopApiService";
import { serverApi } from "../../../lib/config";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import MemberApiService from "../../apiServices/memberApiService";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import { verifiedMemberData } from "../../apiServices/verify";
import { Star } from "@mui/icons-material";
import StarIcon from "@mui/icons-material/Star";


interface Comment {
  id: number;
  name: string;
  comment: string;
  rating: number;
}

/** REDUX SLICE */
const actionDispatch = (dispatch: Dispatch) => ({
  setChosenProduct: (data: Product) => dispatch(setChosenProduct(data)),  // 1st useDispatch. 2nd slice.ts payload 'data'
  setChosenShop: (data: Shop) =>
    dispatch(setChosenShop(data)),
});
/* REDUX SELECTOR */
const chosenProductRetriever = createSelector(
  retrieveChosenProduct,
  (chosenProduct) => ({
    chosenProduct,
  })
);
const chosenShopRetriever = createSelector(
  retrieveChosenShop,
  (chosenShop) => ({
    chosenShop: chosenShop,
  })
);

export function ChosenProduct(props: any) {

   const [isHovered1, setIsHovered1] = useState(false);

  const handleMouseEnter1 = () => {
    setIsHovered1(true);
  };

  const handleMouseLeave1 = () => {
    setIsHovered1(false);
  };

  
  
  /** INITIALIZATIONS */
  let { product_id: product_id } = useParams<{ product_id: string }>();
  const { setChosenProduct, setChosenShop: setChosenShop } = actionDispatch(
    useDispatch() // needs to update the state after user interaction
  ); // useState ids functional component. useDispatch is a global component for store from redux. // reducer takes initial state and action.
  const { chosenProduct } = useSelector(chosenProductRetriever);
  const { chosenShop: chosenShop } = useSelector(chosenShopRetriever);

  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [productRebuild, setProductRebuild] = useState<Date>(new Date());
  // Date force re-rendering of the state and updates the app

  // ProductRelatedProcess updates the chosenProduct and chosenShop in the Redux store
  const productRelatedProcess = async () => {
    try {
      const productService = new ProductApiService();
      const product: Product = await productService.getChosenProduct(product_id);
      setChosenProduct(product);

      const shopService = new ShopApiService();
      const shop: Shop =
        await shopService.getChosenShop(product.shop_mb_id);
      setChosenShop(shop);
    } catch (err) {
      console.log(`ProductRelatedProcess, ERROR:`, err);
    }
  };

  // retrieve da ta from backend
  useEffect(() => {
    productRelatedProcess().then(); //  prevents a warning from React about an unhandled promise rejection
  }, [productRebuild]);

  // calls the ProductRelatedProcess function whenever the productRebuild state is updated.

  /*** HANDLERS*/
  const targetLikeProduct = async (e: any) => {
    try {
      assert.ok(verifiedMemberData, Definer.auth_err1); // whether or not the user authenticated

      const memberService = new MemberApiService(),
        like_result = await memberService.memberLikeTarget({
          like_ref_id: e.target.id, //onClick in checkbox
          group_type: "product",
        });
      assert.ok(like_result, Definer.general_err1);

      await sweetTopSmallSuccessAlert("Success!", 700, false);
      setProductRebuild(new Date());
    } catch (err: any) {
      console.log("targetLikeProduct, ERROR:", err);
      sweetErrorHandling(err).then();
    }
  };

  const [rating, setRating] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [lastCommentId, setLastCommentId] = useState(0);
  const [ratingError, setRatingError] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!rating) {
      setRatingError("Rating is required."); // Display an error message
      return;
    }
    const newComment: Comment = {
      id: lastCommentId + 1,
      name,
      comment,
      rating: rating || 0,
    };

    // TODO: Implement logic to submit the comment
    submitCommentToServer(newComment);
  };
  const submitCommentToServer = (comment: Comment) => {
    setTimeout(() => {
      setComments([...comments, comment]);
      setName("");
      setComment("");
      setRating(null);
      setLastCommentId(comment.id);
      sweetTopSmallSuccessAlert("Comment submitted!", 700, false);

    }, 1000);
  };
  
  return (
    <div className="chosen_product_page">
      <img className="back_product" src="/icons/bit_back4.svg" alt="" />
      <img className="back_product1" src="/icons/bit_back3.svg" alt="" />
      <div className="details">Product details:</div>
      <Container className="product_container">
        <Stack className="chosen_product_slider">
          <Swiper
            className="product_swiper"
            loop={true}
            mousewheel={true}
            direction="horizontal"
            spaceBetween={10}
            navigation={true}
            // thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            pagination={{
              clickable: true,
              type: "bullets",
              el: ".swiper-pagination",
            }}
          >
            {chosenProduct?.product_images?.map((ele: string) => {
              const image_path = `${serverApi}/${ele}`;
              return (
                <SwiperSlide>
                  <img
                    src={image_path}
                    alt="food"
                    style={{
                      width: "100%",
                      height: "500px",
                      borderRadius: "10px",
                    }}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Stack>

        <Stack className="chosen_product_info_container">
          <Box className="chosen_product_info_box">
            <strong className="product_txt">
              {chosenProduct?.product_name}
            </strong>
            <span className="shop_name">{chosenShop?.mb_nick}</span>
            <Box className="rating_box">
              <p>
                <StarIcon style={{ color: "#F2BD57" }} />
                <StarIcon style={{ color: "#F2BD57" }} />
                <StarIcon style={{ color: "#F2BD57" }} />
                <StarIcon style={{ color: "#F2BD57" }} />
                <StarIcon style={{ color: "#F2BD57" }} />
              </p>
              <div className="evaluation_box">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: "20px",
                  }}
                  onClick={(e) => {
                    props.onAddFav(chosenProduct);
                    e.stopPropagation();
                  }}
                >
                  <Checkbox
                    {...label} // inputProps={label.inputProps}
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite style={{ color: "red" }} />}
                    id={chosenProduct?._id}
                    onClick={targetLikeProduct}
                    /* @ts-ignore */
                    checked={
                      chosenProduct?.me_liked &&
                      !!chosenProduct?.me_liked[0]?.my_favorite
                    }
                    // checked={
                    //   chosenProduct?.me_liked &&
                    //   chosenPRoduct?.me_liked[0]?.my_favorite
                    //     ? true
                    //     : false
                    // }
                  />

                  <span>{chosenProduct?.product_likes}</span>
                </div>

                <div style={{ display: "flex", alignItems: "center" }}>
                  <RemoveRedEyeIcon sx={{ mr: "10px" }} />
                  <span>{chosenProduct?.product_views}</span>
                </div>
              </div>
            </Box>
            <p className="dish_desc_info">
              {chosenProduct?.product_description
                ? chosenProduct?.product_description
                : "No description"}
            </p>
            <Marginer
              direction="horizontal"
              height="1"
              width="100%"
              bg="#000000"
            />
            <div className="dish_price_box">
              <span>Price:</span>
              <span>${chosenProduct?.product_price}</span>
            </div>
            <div className="button_box">
              <Button
                variant="contained"
                onClick={() => {
                  props.onAdd(chosenProduct);
                }}
                style={{
                  color: isHovered1 ? "#ffffff" : "#ffffff",
                  opacity: isHovered1 ? 0.6 : 1,
                  backgroundColor: isHovered1 ? "#4d94ff" : "#007bff",
                }}
                onMouseEnter={handleMouseEnter1}
                onMouseLeave={handleMouseLeave1}
              >
                Add to cart
              </Button>
            </div>
          </Box>
        </Stack>
      </Container>
      <div className="details_comments">Write a comment</div>
      <div className="comment_cont">
        <form onSubmit={handleSubmit} className="comment_cont_form">
          <div>
            <label htmlFor="name" className="comment_cont_label">
              Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              className="comment_cont_input"
              placeholder="Type your name"
            />
          </div>
          <div>
            <label
              htmlFor="comment"
              className="comment_cont_label_comment"
            ></label>
            <textarea
              id="comment"
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              required
              className="comment_cont_input"
              style={{ width: "1000px", height: "200px" }}
              placeholder="Type your comment here"
            ></textarea>
          </div>
          <div>
            <label htmlFor="rating" className="comment_cont_label"></label>
            <Rating
              name="rating"
              value={rating || 0}
              onChange={(event, value) => setRating(value)}
              className="comment_cont_rating"
            />
            {ratingError && <p>{ratingError}</p>} {/* Display error message */}
          </div>
          <Button
            type="submit"
            className="comment_cont_button"
            style={{
              color: isHovered1 ? "#ffffff" : "#ffffff",
              opacity: isHovered1 ? 0.6 : 1,
              backgroundColor: isHovered1 ? "#4d94ff" : "#007bff",
            }}
            onMouseEnter={handleMouseEnter1}
            onMouseLeave={handleMouseLeave1}
          >
            Publish
          </Button>
        </form>

        {comments.length > 0 && (
          <div style={{ width: "1000px" }}>
            <h2>Comments:</h2>
            {comments.map((comment) => (
              <div key={comment.id} className="submitted_comment">
                <p className="comment_cont_name">{comment.name}</p>
                {comment.rating && (
                  <p className="comment_cont_rating">
                    {Array(comment.rating)
                      .fill("")
                      .map((_, index) => (
                        <Star key={index} className="star" />
                      ))}
                  </p>
                )}
                <p className="comment_cont_comment">{comment.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

