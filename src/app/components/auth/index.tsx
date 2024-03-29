import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Fab, Stack, TextField } from "@mui/material";
import styled from "styled-components";
import LoginIcon from "@mui/icons-material/Login";
import assert from "assert";
import { Definer } from "../../../lib/Definer";
import MemberApiService from "../../apiServices/memberApiService";
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: "#f5f5f5",
    borderRadius: "2%",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 2, 2),
  },
}));

const ModalImg = styled.div`
  width: 0%;
  height: 100%;
  border-radius: 10px;
  margin-top: 9px;
  margin-left: 10px;
`;



export default function AuthenticationModal(props: any) {
  /** INITIALIZATION */
const classes = useStyles();
const [mb_nick, set_mb_nick] = useState<string>("");
const [mb_email, set_mb_email] = useState<string>("");
const [mb_password, set_mb_password] = useState<string>("");


    /** HANDLERS */
    const handleUsername = (e: any) => {
      set_mb_nick(e.target.value);
    };
    const handleEmail = (e: any) => {
      set_mb_email(e.target.value);
    };
    const handlePassword = (e: any) => {
      set_mb_password(e.target.value);
    };

    const handleSignupRequest = async () => {
      try {
        const is_fulfilled =
          (mb_nick !== "" &&
            mb_password !== "" &&
            mb_email.includes("@gmail.com")) ||
          (mb_nick !== "" &&
            mb_password !== "" &&
            mb_email.includes("@mail")) ||
          (mb_nick !== "" &&
            mb_password !== "" &&
            mb_email.includes("@yandex")) ||
          (mb_nick !== "" &&
            mb_password !== "" &&
            mb_email.includes("@naver")) ||
          (mb_nick !== "" &&
            mb_password !== "" &&
            mb_email.includes("@hotmail")) ||
          (mb_nick !== "" &&
            mb_password !== "" &&
            mb_email.includes("@bk")) ||
          (mb_nick !== "" &&
            mb_password !== "" &&
            mb_email.includes("@yahoo")) ||
          (mb_nick !== "" &&
            mb_password !== "" &&
            mb_email.includes("@outlook")) ||
          (mb_nick !== "" &&
            mb_password !== "" &&
            mb_email.includes("@icloud")) ||
          (mb_nick !== "" &&
            mb_password !== "" &&
            mb_email.includes("@pm")) ||
          (mb_nick !== "" &&
            mb_password !== "" &&
            mb_email.includes("@gmx")) ||
          (mb_nick !== "" &&
            mb_password !== "" &&
            mb_email.includes("@hubspot"));
        
        assert.ok(is_fulfilled, Definer.email_err);

        const signup_data = {
          mb_nick: mb_nick,
          mb_email: mb_email,
          mb_password: mb_password,
        };

        const memberApiService = new MemberApiService();
        await memberApiService.signupRequest(signup_data);
        await sweetTopSmallSuccessAlert("Congratulations on signing up!🎉", 1000, true); // reload

        props.handleSignUpClose();
        window.location.reload();
      } catch (err) {
        props.handleSignUpClose();
        console.log(err);
        sweetErrorHandling(err).then();
      }
    };

  const handleLoginRequest = async () => {
    try {
      const is_fulfilled = mb_nick !== "" && mb_password !== ""; // ask
      assert.ok(is_fulfilled, Definer.input_err1);

      const login_data = {
        mb_nick: mb_nick,
        mb_password: mb_password,
      };

      const memberApiService = new MemberApiService();
      await memberApiService.loginRequest(login_data);
      await sweetTopSmallSuccessAlert("Welcome back!👋", 1000, true); // reload
 
      props.handleLoginClose();
      window.location.reload();
    } catch (err) {
      console.log(err);
      props.handleLoginClose();
      sweetErrorHandling(err).then();
    }
  };

    const passwordKeyPressHandler = (e: any) => {
      if (e.key === "Enter" && props.signUpOpen) {
        handleSignupRequest().then();
      } else if (e.key === "Enter" && props.loginOpen) {
        handleLoginRequest().then();
      }
    };
  
  return (
    <div>
      {/*@ts-ignore*/}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.signUpOpen}
        onClose={props.handleSignUpClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.signUpOpen}>
          <Stack
            className={classes.paper}
            direction={"row"}
            justifyContent={"center"}
            sx={{ width: "550px", height: "auto" }}
          >
            <ModalImg />
            <Stack sx={{ alignItems: "center", color: "#222222" }}>
              <h2>Welcome to ₿itsafe</h2>
              <h2>Sign up</h2>
              <TextField
                onChange={handleUsername}
                sx={{
                  my: "17px",
                  width: "280px",
                  background: "#fff",
                  borderRadius: "10px",
                }}
                id="outlined-basic"
                label="Username"
                variant="outlined"
                inputProps={{
                  style: {
                    color: "black",
                  },
                }}
              />
              <TextField
                onChange={handleEmail}
                sx={{
                  my: "17px",
                  width: "280px",
                  background: "#fff",
                  borderRadius: "10px",
                }}
                id="outlined-basic"
                label="Email"
                type="email"
                variant="outlined"
                inputProps={{
                  style: {
                    color: "black",
                  },
                }}
              />
              <TextField
                onChange={handlePassword}
                onKeyDown={passwordKeyPressHandler}
                sx={{
                  my: "17px",
                  width: "280px",
                  background: "#fff",
                  borderRadius: "10px",
                }}
                id="outlined-basic"
                label="Password"
                variant="outlined"
                inputProps={{
                  style: {
                    color: "black",
                  },
                }}
              />
              <Fab
                onClick={handleSignupRequest}
                sx={{ width: "130px", margin: "0.8rem" }}
                variant="extended"
                color="primary"
              >
                <LoginIcon sx={{ mr: 1 }} />
                Sign up
              </Fab>
            </Stack>
          </Stack>
        </Fade>
      </Modal>

      {/*@ts-ignore*/}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.loginOpen}
        onClose={props.handleLoginClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.loginOpen}>
          <Stack
            className={classes.paper}
            direction={"row"}
            justifyContent={"center"}
            sx={{ width: "400px", height: "auto" }}
          >
            <ModalImg />
            <Stack
              sx={{
                alignItems: "center",
                color: "#222222",
              }}
            >
              <h2>Log in</h2>
              <TextField
                onChange={handleUsername}
                id="outlined-basic"
                label="Username"
                variant="outlined"
                sx={{
                  my: "17px",
                  width: "280px",
                  background: "#fff",
                  borderRadius: "10px",
                }}
                inputProps={{
                  style: {
                    color: "black",
                  },
                }}
              />
              <TextField
                onChange={handlePassword}
                onKeyDown={passwordKeyPressHandler}
                sx={{
                  my: "17px",
                  width: "280px",
                  background: "#fff",
                  borderRadius: "10px",
                }}
                id="outlined-basic"
                label="Password"
                variant="outlined"
                inputProps={{
                  style: {
                    color: "black",
                  },
                }}
              />
              <Fab
                onClick={handleLoginRequest}
                sx={{ width: "130px", margin: "0.8rem" }}
                variant="extended"
                color="primary"
              >
                <LoginIcon sx={{ mr: 1 }} />
                Log in
              </Fab>
            </Stack>
          </Stack>
        </Fade>
      </Modal>
    </div>
  );
}
