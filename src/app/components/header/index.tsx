import React, { useState, useEffect, useRef } from "react";
import Typed from 'typed.js';
import { motion } from "framer-motion";
import { Advertisements } from "../../screens/HomePage/advertisements";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

import {
  Badge,
  Box,
  Button,
  Container,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import { Link, NavLink, useHistory } from "react-router-dom";
import { Logout } from "@mui/icons-material";
import Basket from "./basket";
import Favorites from "./favorites";
import { verifiedMemberData } from "../../apiServices/verify";
import useDeviceDetect from "../../../lib/responsive/useDeviceDetect";

export function NavbarHome(props: any) {
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

  const handleClick = () => {
    const element = document.getElementById("video");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
   const handleClickHome = () => {
     const element = document.getElementById("home");
     if (element) {
       element.scrollIntoView({ behavior: "smooth" });
     }
   };

  
  // Create ref element
  const textRef = useRef<HTMLSpanElement>(null);
  
    useEffect(() => {
      const options = {
        strings: ["Save your money.", "Save your crypto.", "Save your assets."],
        startDelay: 300,
        typeSpeed: 70,
        backSpeed: 50,
        backDelay: 150,
        smartBackspace: true,
        showCursor: false,
        loop: true,
      };
      const typed = new Typed(textRef.current, options);
 if (textRef.current) {
   textRef.current.classList.add("color");
 }
      return () => {
        typed.destroy();
      };
    }, []);
  
  
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
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  }
  
  .scroll-button:hover {
 background-color: rgba(0, 0, 0, 0.1);
    color: #000;
  }
`;
  
   useEffect(() => {
     const handleScroll = () => {
       const scrollTop =
         window.scrollY || document.documentElement.scrollTop;
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
  
     const history = useHistory<History>();
     const { isMobile } = useDeviceDetect();
     const handlePushConstruction = () => {
       history.push("/construction");
       props.setPath();
     };
  if (isMobile()) {
    
    return (
      <div className="format home_navbar1" id="home">
        <div className="navbar_block">
          <div className="navbar_config" id="navbar">
            <Box onClick={props.setPath}>
              <NavLink to="/">
                <img
                  style={{
                    width: "100px",
                    height: "100px",
                    cursor: "pointer",
                    // borderRadius: "24px",
                  }}
                  src="/icons/logo1.svg"
                  alt="logo"
                  className="logo"
                />
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
                onDeleteAllFav={props.onDeleteAllFav}
                setOrderRebuild={props.setOrderRebuild}
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
                    backgroundColor: "#fff", // Set the background color to transparent
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
                    <Logout fontSize="small" style={{ color: "#222222" }} />
                  </ListItemIcon>
                  <span style={{ color: "#222222", fontWeight: "600" }}>
                    {" "}
                    Log out
                  </span>
                </MenuItem>
              </Menu>
            </Stack>
          </div>

          <Stack className="head_information" justifyContent={"row"}>
            <Stack justifyContent={"column"} style={{ marginTop: "200px" }}>
              <Box>
                <span>Welcome to ₿itSafe!</span>
              </Box>
              <Box className="define_shop">
                We provide easy solution for complex problems.
                <div className="crossed_under">
                  <style>{styles} </style> <span ref={textRef}></span>
                </div>
              </Box>
            </Stack>
          </Stack>
        </div>
        <div className="framer-motion-wrapper">
          <div onClick={handleClick} className="framer-motion-container">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="framer-motion-element"
            />
          </div>
        </div>
        <style>{styles}</style>

        <div className="scroll-button">
          <Button style={{ color: "black" }} onClick={handleClickHome}>
            <ArrowUpwardIcon />
          </Button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="format home_navbar" id="home">
        <div className="navbar_block">
          <div className="navbar_config" id="navbar">
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
                onDeleteAllFav={props.onDeleteAllFav}
                setOrderRebuild={props.setOrderRebuild}
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
                    backgroundColor: "#fff", // Set the background color to transparent
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
                    <Logout fontSize="small" style={{ color: "#222222" }} />
                  </ListItemIcon>
                  <span style={{ color: "#222222", fontWeight: "600" }}>
                    {" "}
                    Log out
                  </span>
                </MenuItem>
              </Menu>
            </Stack>
          </div>

          <Stack className="head_information" justifyContent={"row"}>
            <Stack justifyContent={"column"} style={{ marginTop: "200px" }}>
              <Box>
                <span>Welcome to ₿itSafe!</span>
              </Box>
              <Box className="define_shop">
                We provide easy solution for complex problems.
                <div className="crossed_under">
                  <style>{styles} </style> <span ref={textRef}></span>
                </div>
              </Box>
            </Stack>
          </Stack>
        </div>
        <div className="framer-motion-wrapper">
          <div onClick={handleClick} className="framer-motion-container">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="framer-motion-element"
            />
          </div>
        </div>
        <style>{styles}</style>

        <div className="scroll-button">
          <Button style={{ color: "black" }} onClick={handleClickHome}>
            <ArrowUpwardIcon />
          </Button>
        </div>
      </div>
    );
  }
}
