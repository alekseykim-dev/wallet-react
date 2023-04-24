import React, { useState, useEffect } from "react";
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
import { NavLink } from "react-router-dom";
import { Logout } from "@mui/icons-material";
import Basket from "./basket";
import { verifiedMemberData } from "../../apiServices/verify";

export function NavbarHome(props: any) {
  // verifiedMemberData comes from app.tsx useState. memberData

  /** INITIALIZATION */
  // const [count, setCount] = useState(0)   // array destructuring
  // const [value, setValue] = useState(true);

  /** HANDLERS */
  // const countHandler = () => {
  //   setCount(count + 1)
  // }

  // useState is used for action and data change through axios by requesting to backend and update.
  // useEffect(() => {   // Used for calling data from backend
  //   setCount(count + 1);
  // }, [value]); // [ optional array of dependencies] [control the useEffect]
  return (
    <div className="format home_navbar">
      <Container>
        <Stack
          flexDirection={"row"}
          className="navbar_config"
          justifyContent={"space-between"}
        >
          <Box>
            <img src="/icons/Bitsafe.Store.svg" alt="logo" />
          </Box>
          <Stack
            flexDirection={"row"}
            justifyContent={"space-evenly"}
            alignItems={"center"}
            className="navbar_links"
          >
            <Box className="hover-line" onClick={props.setPath}>
              <NavLink to="/" activeClassName="underline">
                Home
              </NavLink>
            </Box>
            <Box className="hover-line" onClick={props.setPath}>
              <NavLink to="/restaurant" activeClassName="underline">
                Store
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
          <Stack
            flexDirection={"row"}
            justifyContent={"space-evenly"}
            alignItems={"center"}
            className="navbar_icons"
          >
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
                  variant="contained"
                  style={{ color: "#ffffff", background: "#1976d2" }}
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
                  style={{ color: "#ffffff", background: "#1976d2" }}
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
              <img src="/icons/welcome.svg" alt="welcome" />
            </Box>
            <Box className="define_restaurant">Own your assets</Box>
            <Box className="timeline_service">Worldwide shipping</Box>
          </Stack>

          <Stack flexDirection={"column"}>
            <Box className="big_img"></Box>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
