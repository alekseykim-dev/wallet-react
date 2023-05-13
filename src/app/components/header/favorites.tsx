import { Box, Button, Stack } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import CancelIcon from "@mui/icons-material/Cancel";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import React from "react";
import { FavItem, CartItem } from "../../../types/others";
import { serverApi } from "../../../lib/config";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import OrderApiService from "../../apiServices/orderApiService";
import { useHistory } from "react-router-dom";
import { verifiedMemberData } from "../../apiServices/verify";

export default function Favorites(props: any) {
  /** INITIALIZATIONS **/
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { favItems, onDeleteFav} = props;


  /** HANDLERS **/
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

    

  return (
    <Box className={"hover-line"}>
      <IconButton
        aria-label="cart"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Badge badgeContent={favItems.length} color="secondary">
          <img
            src={"/icons/heart.svg"}
            alt="cart"
            style={{ width: "23px", height: "23px" }}
          />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        // onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "hidden",
            backdropFilter: "blur(10px)", // Apply blur effect to the background
            backgroundColor: "transparent", // Set the background color to transparent
            mt: "20px",
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "center", vertical: "top" }}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      >
        <Stack className={"basket_frame"}>
          <Box className={"all_check_box"}>
            {false ? <div>No favorites</div> : <div>My Favorites:</div>}
          </Box>

          <Box className={"orders_main_wrapper"}>
            <Box className={"orders_wrapper"}>
              {favItems.map((item: FavItem) => {
                const image_path = `${serverApi}/${item.image}`;
                return (
                  <Box className={"basket_info_box"}>
                    <div className={"cancel_btn"}>
                      <CancelIcon
                        style={{ color: "#f5f5f5" }}
                        onClick={() => onDeleteFav(item)}
                      />
                    </div>
                    <img
                      src={image_path}
                      className={"product_img"}
                      alt="product image"
                    />
                    <span className={"product_name"}>{item.name}</span>
                    <p className={"product_price"}>${item.price}</p>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Stack>
      </Menu>
    </Box>
  );
}
