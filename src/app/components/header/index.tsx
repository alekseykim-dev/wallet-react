import React, { useState, useEffect, useRef } from "react";
import Typed from 'typed.js';
import { motion } from "framer-motion";
import { TopShops } from "../../screens/HomePage/topShops";

import {
  Badge,
  Box,
  Button,
  Container,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { Logout } from "@mui/icons-material";
import Basket from "./basket";
import { verifiedMemberData } from "../../apiServices/verify";

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

  // Create ref element
  const textRef = useRef(null);
  
    useEffect(() => {
      const options = {
        strings: ["money.", "crypto.", "assets."],
        startDelay: 300,
        typeSpeed: 130,
        backSpeed: 50,
        backDelay: 150,
        smartBackspace: true,
        showCursor: false,
        loop: true,
      };
      const typed = new Typed(textRef.current, options);
      return () => {
        typed.destroy();
      };
    }, []);
  
  return (
    <div className="format home_navbar">
      <Container>
        <Stack className="navbar_config">
          <Box>
            <img src="/icons/Logo.svg" alt="logo" />
          </Box>
          <Stack className="navbar_links">
            <Box className="hover-line" onClick={props.setPath}>
              <NavLink to="/" activeClassName="underline">
                Home
              </NavLink>
            </Box>
            <Box className="hover-line" onClick={props.setPath}>
              <NavLink to="/shop" activeClassName="underline">
                Shops
              </NavLink>
            </Box>
            {verifiedMemberData ? (
              <Box className="hover-line" onClick={props.setPath}>
                <NavLink to={"/orders"} activeClassName="underline">
                  Orders
                </NavLink>
              </Box>
            ) : null}
            <Box className="hover-line" onClick={props.setPath}>
              <NavLink to="/community" activeClassName="underline">
                Community
              </NavLink>
            </Box>

            {verifiedMemberData ? (
              <Box className="hover-line" onClick={props.setPath}>
                <NavLink to="/member-page" activeClassName="underline">
                  My Page
                </NavLink>
              </Box>
            ) : null}

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
                    color: isHovered1 ? "#fff" : "#000",
                    opacity: isHovered1 ? 0.7 : 1,
                    backgroundColor: isHovered1 ? "#000000d0" : "#d7b686",
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
                    color: isHovered2 ? "#fff" : "#000",
                    opacity: isHovered2 ? 0.7 : 1,
                    backgroundColor: isHovered2 ? "#000000d0" : "#d7b686",
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
              <MenuItem onClick={props.handleLogOutRequest}>
                <ListItemIcon>
                  <Logout fontSize="small" style={{ color: "blue" }} />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Stack>
        </Stack>

        <Stack className="head_information" justifyContent={"row"}>
          <Stack
            justifyContent={"column"}
            style={{ marginTop: "86px", marginLeft: "24px" }}
          >
            <Box>
              <img src="/icons/Welcome.svg" alt="welcome" />
            </Box>
            <Box className="define_shop">
              Easy solution for complex{" "}
              <span className="crossed">problems</span>.
              <div className="crossed_under">
                {" "}
                Save your <span ref={textRef}></span>
              </div>
            </Box>
          </Stack>
        </Stack>
      </Container>
      <div className="framer-motion-wrapper">

          <div className="framer-motion-container">
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
    </div>
  );
}
