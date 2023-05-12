import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { Logout } from "@mui/icons-material";
import Basket from "./basket";
import { verifiedMemberData } from "../../apiServices/verify";

export function NavbarShop(props: any) {

  const [isHovered1, setIsHovered1] = useState(false);

  const handleMouseEnter1 = () => {
    setIsHovered1(true);
  };

  const handleMouseLeave1 = () => {
    setIsHovered1(false);
  };

  const [isHovered2, setIsHovered2] = useState(false);

  const handleMouseEnter2 = () => {
    setIsHovered2(true);
  };

  const handleMouseLeave2 = () => {
    setIsHovered2(false);
  };

   const handleClickShop = () => {
     const element = document.getElementById("shop");
     if (element) {
       element.scrollIntoView({ behavior: "smooth" });
     }
   };
  
  const styles = `
  .color {
    color: #fff;
  }
  
  .scroll-button {
    position: fixed;
    bottom: 30px;
    left: 30px;
    z-index: 999;
    background-color: transparent;
    backdrop-filter: blur(10px);
    padding: 1px 3px;
    border: 1px solid #000;
    border-radius: 4px;
    font-size: 12px;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;
  }
  
  .scroll-button:hover {
background-color: rgba(0, 0, 0, 0.1); 
  }
`;
  return (
    <div className="format_shop home_navbar" id="shop">
      <div className="navbar_block">
        <Stack className="navbar_config">
          <Box onClick={props.setPath}>
            <NavLink to="/">
              <img src="/icons/Logo_b.svg" alt="logo" />
            </NavLink>
          </Box>
          <Stack className="navbar_links">
            <Box className="hover-line" onClick={props.setPath}>
              <NavLink to="/shop" activeClassName="underline">
                Shops
              </NavLink>
            </Box>

            <Box className="hover-line" onClick={props.setPath}>
              <NavLink to={"/orders"} activeClassName="underline">
                My Orders
              </NavLink>
            </Box>

            <Box className="hover-line" onClick={props.setPath}>
              <NavLink to="/community" activeClassName="underline">
                Community
              </NavLink>
            </Box>

            <Box className="hover-line" onClick={props.setPath}>
              <NavLink to="/member-page" activeClassName="underline">
                My Page
              </NavLink>
            </Box>

            <Box className="hover-line" onClick={props.setPath}>
              <NavLink to="/help" activeClassName="underline">
                Help
              </NavLink>
            </Box>
          </Stack>
          <Stack className="navbar_icons">
            <Basket
              cartItems={props.cartItems}
              onAdd={props.onAdd}
              onRemove={props.onRemove}
              onDelete={props.onDelete}
              onDeleteAll={props.onDeleteAll}
              setOrderRebuild={props.setOrderRebuild}
            />

            {!verifiedMemberData ? (
              <Box>
                <Button
                  className="nav_button"
                  variant="contained"
                  style={{
                    color: isHovered1 ? "#fff" : "#FFFFFF",
                    opacity: isHovered1 ? 0.7 : 1,
                    backgroundColor: isHovered1 ? "#0056b3" : "#007BFF",
                  }}
                  onMouseEnter={handleMouseEnter1}
                  onMouseLeave={handleMouseLeave1}
                  onClick={props.handleSignUpOpen}
                >
                  Sign up
                </Button>
              </Box>
            ) : null}

            {!verifiedMemberData ? (
              <Box>
                <Button
                  variant="contained"
                  style={{
                    color: isHovered2 ? "#fff" : "#FFFFFF",
                    opacity: isHovered2 ? 0.7 : 1,
                    backgroundColor: isHovered2 ? "#0056b3" : "#007BFF",
                  }}
                  onMouseEnter={handleMouseEnter2}
                  onMouseLeave={handleMouseLeave2}
                  onClick={props.handleLoginOpen}
                >
                  Log in
                </Button>
              </Box>
            ) : (
              <img
                style={{ width: "48px", height: "48px", borderRadius: "24px" }}
                src={verifiedMemberData.mb_image}
                alt=""
                onClick={props.handleLogOutClick}
              />
            )}

            <Menu
              anchorEl={props.anchorEl}
              open={props.open}
              onClose={props.handleCloseLogOut}
              onClick={props.handleCloseLogOut}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
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
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem
                onClick={props.handleLogOutRequest}
                style={{ color: "#1f1f1f" }}
              >
                <ListItemIcon>
                  <Logout fontSize="small" style={{ color: "#d7b686" }} />
                </ListItemIcon>
                Log out
              </MenuItem>
            </Menu>
          </Stack>
        </Stack>
      </div>
      <style>{styles}</style>

      <div className="scroll-button">
        <Button style={{ color: "black" }} onClick={handleClickShop}>
          Back to Top
        </Button>
      </div>
    </div>
  );
}
