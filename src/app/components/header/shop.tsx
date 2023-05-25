import React, { useEffect, useState } from "react";
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
import Favorites from "./favorites";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import useDeviceDetect from "../../../lib/responsiveDetector";

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
    bottom: 80px;
    left: 20px;
    z-index: 999;
    background-color: transparent;
    backdrop-filter: blur(20px);
    border: 1px solid #ccc;
    border-radius: 3px;
    font-size: 12px;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;
    border-radius: 33%;
    width: 55px;
    height: 50px;
    display: flex;
    justify-content: center;
  }
  
  .scroll-button:hover {
 background-color: rgba(0, 0, 0, 0.1);
    color: #000;
  }
`;
  
    useEffect(() => {
      const handleScroll = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const navbar = document.getElementById("navbar");

        if (scrollTop > lastScrollTop) {
          navbar!.style.top = "-80px";
        } else {
          navbar!.style.top = "0";
        }

        lastScrollTop = scrollTop;
      };

      let lastScrollTop = 0;
      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);
     const { isMobile } = useDeviceDetect();
  
  if (isMobile()) {
    return (
      <div className="format_shop home_navbar" id="shop">
        <div className="navbar_block">
          <Stack className="navbar_config" id="navbar">
            <Box onClick={props.setPath}>
              <NavLink to="/">
                <img
                  style={{
                    width: "100px",
                    height: "80px",
                    cursor: "pointer",
                    // borderRadius: "24px",
                  }}
                  src="/icons/logo1.svg"
                  alt="logo"
                  className="logo"
                />
              </NavLink>
            </Box>
            {/* <Stack className="navbar_links">
              <Box className="hover-line" onClick={props.setPath}>
                <NavLink to="/shop" activeClassName="underline">
                  Brands
                </NavLink>
              </Box>

              <Box className="hover-line" onClick={props.setPath}>
                <NavLink to={"/orders"} activeClassName="underline">
                  Orders
                </NavLink>
              </Box>

              <Box className="hover-line" onClick={props.setPath}>
                <NavLink to="/community" activeClassName="underline">
                  Articles
                </NavLink>
              </Box>

              <Box className="hover-line" onClick={props.setPath}>
                <NavLink to="/member-page" activeClassName="underline">
                  Profile
                </NavLink>
              </Box>

              <Box className="hover-line" onClick={props.setPath}>
                <NavLink to="/help" activeClassName="underline">
                  FAQ
                </NavLink>
              </Box>
            </Stack> */}
            <Stack className="navbar_icons">
              {!verifiedMemberData ? (
                <Box>
                  <Button
                    className="nav_button"
                    variant="contained"
                    style={{
                      color: isHovered1 ? "#282828" : "#f5f5f5",
                      opacity: isHovered1 ? 0.7 : 1,
                      backgroundColor: isHovered1 ? "#f5f5f5" : "#282828",
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
                      color: isHovered2 ? "#282828" : "#f5f5f5",
                      opacity: isHovered2 ? 0.7 : 1,
                      backgroundColor: isHovered2 ? "#f5f5f5" : "#282828",
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
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "24px",
                  }}
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
                    overflow: "hidden",
                    backdropFilter: "blur(10px)", // Apply blur effect to the background
                    backgroundColor: "transparent", // Set the background color to transparent
                    mt: "15px",
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
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem
                  onClick={props.handleLogOutRequest}
                  style={{ color: "#1f1f1f" }}
                >
                  <ListItemIcon>
                    <Logout fontSize="small" style={{ color: "#f5f5f5" }} />
                  </ListItemIcon>
                  <span style={{ color: "#f5f5f5", fontWeight: "600" }}>
                    {" "}
                    Log out
                  </span>
                </MenuItem>
              </Menu>
            </Stack>
          </Stack>
        </div>
        <style>{styles}</style>

        <div className="scroll-button">
          <Button style={{ color: "black" }} onClick={handleClickShop}>
            <ArrowUpwardIcon />
          </Button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="format_shop home_navbar" id="shop">
        <div className="navbar_block">
          <Stack className="navbar_config" id="navbar">
            <Box onClick={props.setPath}>
              <NavLink to="/">
                <img src="/icons/logo1.svg" alt="logo" className="logo" />
              </NavLink>
            </Box>
            <Stack className="navbar_links">
              <Box className="hover-line" onClick={props.setPath}>
                <NavLink to="/shop" activeClassName="underline">
                  Brands
                </NavLink>
              </Box>

              <Box className="hover-line" onClick={props.setPath}>
                <NavLink to={"/orders"} activeClassName="underline">
                  Orders
                </NavLink>
              </Box>

              <Box className="hover-line" onClick={props.setPath}>
                <NavLink to="/community" activeClassName="underline">
                  Articles
                </NavLink>
              </Box>

              <Box className="hover-line" onClick={props.setPath}>
                <NavLink to="/member-page" activeClassName="underline">
                  Profile
                </NavLink>
              </Box>

              <Box className="hover-line" onClick={props.setPath}>
                <NavLink to="/help" activeClassName="underline">
                  FAQ
                </NavLink>
              </Box>
            </Stack>
            <Stack className="navbar_icons">
              {!verifiedMemberData ? (
                <Box>
                  <Button
                    className="nav_button"
                    variant="contained"
                    style={{
                      color: isHovered1 ? "#282828" : "#f5f5f5",
                      opacity: isHovered1 ? 0.7 : 1,
                      backgroundColor: isHovered1 ? "#f5f5f5" : "#282828",
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
                      color: isHovered2 ? "#282828" : "#f5f5f5",
                      opacity: isHovered2 ? 0.7 : 1,
                      backgroundColor: isHovered2 ? "#f5f5f5" : "#282828",
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
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "24px",
                  }}
                  src={verifiedMemberData.mb_image}
                  alt=""
                  onClick={props.handleLogOutClick}
                />
              )}
              <Favorites
                favItems={props.favItems}
                onDeleteFav={props.onDeleteFav}
              />
              <Basket
                cartItems={props.cartItems}
                onAdd={props.onAdd}
                onRemove={props.onRemove}
                onDelete={props.onDelete}
                onDeleteAll={props.onDeleteAll}
                setOrderRebuild={props.setOrderRebuild}
              />

              <Menu
                anchorEl={props.anchorEl}
                open={props.open}
                onClose={props.handleCloseLogOut}
                onClick={props.handleCloseLogOut}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "hidden",
                    backdropFilter: "blur(10px)", // Apply blur effect to the background
                    backgroundColor: "transparent", // Set the background color to transparent
                    mt: "15px",
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
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem
                  onClick={props.handleLogOutRequest}
                  style={{ color: "#1f1f1f" }}
                >
                  <ListItemIcon>
                    <Logout fontSize="small" style={{ color: "#f5f5f5" }} />
                  </ListItemIcon>
                  <span style={{ color: "#f5f5f5", fontWeight: "600" }}>
                    {" "}
                    Log out
                  </span>
                </MenuItem>
              </Menu>
            </Stack>
          </Stack>
        </div>
        <style>{styles}</style>

        <div className="scroll-button">
          <Button style={{ color: "black" }} onClick={handleClickShop}>
            <ArrowUpwardIcon />
          </Button>
        </div>
      </div>
    );
  }
}
