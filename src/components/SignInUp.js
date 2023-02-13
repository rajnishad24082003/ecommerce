import React, { useState, useEffect } from "react";
import "../assets/css/signup.css";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { serverTimestamp, ref, set, onValue, push } from "firebase/database";
import { auth, database } from "../misc/firebase";
import { Modal, Button } from "rsuite";
import { Input, InputGroup, Whisper, Tooltip } from "rsuite";
import EyeIcon from "@rsuite/icons/legacy/Eye";
import EyeSlashIcon from "@rsuite/icons/legacy/EyeSlash";
import { Emailjs } from "./emailjs";
import { forgetpassword } from "./forgetpassword";

function SignInUp() {
  const styles = {
    width: 300,
  };
  let [optForm, setoptForm] = useState(0);
  const [visible, setVisible] = React.useState(false);
  const handleChange = () => {
    setVisible(!visible);
  };
  let [errorCode, seterrorCode] = useState("");
  let [errorMessage, seterrorMessage] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [opensignup, setOpensignup] = React.useState(false);
  const handleClosesignup = () => setOpensignup(false);
  let onproviderlogin = async (provider) => {
    try {
      let result = await signInWithPopup(auth, provider);
      await set(ref(database, `/profile/${result.user.uid}`), {
        name: result.user.displayName,
        email: result.user.email,
        createdAt: serverTimestamp(),
        image: result.user.photoURL,
        password: "nopassword",
        avatar: "noavatar",
        discription: "nodiscription",
      });
    } catch (error) {
      console.log(error);
      const errorCode = error.code;
      const errorMessage = error.message;
      seterrorCode(errorCode);
      seterrorMessage(errorMessage);
      setOpen(true);
    }
  };

  let ongooglelogin = (e) => {
    e.preventDefault();
    onproviderlogin(new GoogleAuthProvider());
  };

  let [hideShow, setHideShow] = useState("");

  let signinpage = () => {
    setHideShow("");
  };
  let signuppage = () => {
    setHideShow("right-panel-active");
  };
  let [name, setName] = useState("");
  let funForName = (e) => {
    setName(e.target.value);
  };
  let [password, setpassword] = useState("");
  let funForPassword = (e) => {
    setpassword(e.target.value);
  };
  let [email, setEmail] = useState("");
  let funForEmail = (e) => {
    setEmail(e.target.value);
  };
  let [formotp, setformotp] = useState(0);
  let optsendandcloase = async () => {
    if (formotp == optForm) {
      signUpfun();
    } else {
      const errorCode = "OPT incorrect";
      const errorMessage =
        "OPT send to the email does not match with the entered one";
      seterrorCode(errorCode);
      seterrorMessage(errorMessage);
      setOpen(true);
    }
  };
  let optModal = (ev) => {
    ev.preventDefault();
    setOpensignup(true);
    let randomOtp = Math.random() * 1000000;
    let actualOtp = Math.floor(randomOtp);
    Emailjs({ formName: name, formEmail: email, formotp: actualOtp });
    setformotp(actualOtp);
  };
  let signUpfun = async () => {
    let data = {
      name: name,
      email: email,
      password: password,
    };
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        await set(ref(database, `/profile/${user.uid}`), {
          name: name,
          email: email,
          createdAt: serverTimestamp(),
          image: "noimage",
          password: password,
          avatar: "noavatar",
          discription: "nodiscription",
        });
      })
      .catch((error) => {
        seterrorCode(error.code);
        seterrorMessage(error.message);
        setOpen(true);
      });
  };
  let [email2, setemail2] = useState("");
  let [password2, setpassword2] = useState("");
  let signUpEmailFun = (ev) => {
    setemail2(ev.target.value);
  };
  let signUpPasswordFun = (ev) => {
    setpassword2(ev.target.value);
  };
  let signInFun = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email2, password2)
      .then(async (userCredential) => {})
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        seterrorCode(errorCode);
        seterrorMessage(errorMessage);
        setOpen(true);
      });
  };
  let [emailEnterforForget, setemailEnterforForget] = useState("");
  let [openforget, setopenforget] = useState(false);
  let ForgetBtn = (e) => {
    e.preventDefault();
    setopenforget(true);
  };
  let handleCloseforget = () => setopenforget(false);
  let emailsendforget = async () => {
    forgetpassword({ emailforget: emailEnterforForget });
    setopenforget(false);
  };
  return (
    <div className="signInUpmainCont">
      <div className={`containersignup ${hideShow}`} id="containersignup">
        {/* actual form sign up*/}
        <div className="form-container sign-up-container">
          <form action="#" className="formsignup">
            <h1 className="h1signup">Create Account</h1>

            <div className="social-container">
              <button onClick={ongooglelogin} className="social asignup">
                <i className="bi bi-google"></i>
              </button>
            </div>
            <span className="spansignup">
              or use your email for registration
            </span>
            <input
              className="inputsignup"
              type="text"
              placeholder="name"
              onChange={funForName}
            />
            <input
              className="inputsignup"
              type="email"
              placeholder="Email"
              onChange={funForEmail}
            />
            <input
              className="inputsignup"
              type="text"
              placeholder="Password"
              onChange={funForPassword}
            />
            <button className="buttonsignup" onClick={optModal}>
              Sign Up
            </button>
            <button
              className="orsignin"
              onClick={() => {
                signinpage();
              }}
            >
              sign in
            </button>
          </form>
        </div>
        {/* actual form sign up*/}

        {/* actual form sign in*/}
        <div className="form-container sign-in-container">
          <form action="#" className="formsignup">
            <h1 className="h1signup">Sign in</h1>
            <div className="social-container">
              <button onClick={ongooglelogin} className="social asignup">
                <i className="bi bi-google"></i>
              </button>
            </div>
            <span className="spansignup">or use your account</span>
            <input
              className="inputsignup"
              type="email"
              placeholder="Email"
              onChange={signUpEmailFun}
            />
            <input
              className="inputsignup"
              type="password"
              placeholder="Password"
              onChange={signUpPasswordFun}
            />
            <button className="asignup" onClick={ForgetBtn}>
              Forgot your password?
            </button>
            <button className="buttonsignup" onClick={signInFun}>
              Sign In
            </button>
            <button
              className="orsignup"
              onClick={() => {
                signuppage();
              }}
            >
              sign up
            </button>
          </form>
        </div>
        {/* actual form sign in*/}

        {/* transition form sign in/up */}
        <div className="overlay-container">
          <div className="overlaysignup">
            <div className="overlay-panel overlay-right">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button
                className="ghost buttonsignup"
                id="signIn"
                onClick={() => {
                  signuppage();
                }}
              >
                Sign Up
              </button>
            </div>
            <div className="overlay-panel overlay-left">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button
                className="ghost buttonsignup"
                id="signUp"
                onClick={() => {
                  signinpage();
                }}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
        {/* transition form sign in/up */}
      </div>
      <Modal keyboard={false} open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>{errorCode}</Modal.Title>
          <Modal.Body>{errorMessage}</Modal.Body>
          <Modal.Footer>
            <Button onClick={handleClose} appearance="subtle">
              Cancel
            </Button>
          </Modal.Footer>
        </Modal.Header>
      </Modal>

      <Modal keyboard={false} open={opensignup} onClose={handleClosesignup}>
        <Modal.Header>
          <Modal.Title>
            enter opt send to {email} (check the spam folder)
          </Modal.Title>
          <Modal.Body>
            <InputGroup inside style={styles}>
              <Input
                type={visible ? "text" : "password"}
                onChange={(e) => {
                  setoptForm(e);
                }}
              />
              <InputGroup.Button onClick={handleChange}>
                {visible ? <EyeIcon /> : <EyeSlashIcon />}
              </InputGroup.Button>
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={optsendandcloase} appearance="subtle">
              submit
            </Button>
            <Button onClick={handleClosesignup} appearance="subtle">
              Cancel
            </Button>
          </Modal.Footer>
        </Modal.Header>
      </Modal>

      <Modal keyboard={false} open={openforget} onClose={handleCloseforget}>
        <Modal.Header>
          <Modal.Title>
            enter email to get password on that email(check the spam folder)
          </Modal.Title>
          <Modal.Body>
            <Whisper trigger="focus" speaker={<Tooltip>Required</Tooltip>}>
              <Input
                style={{ width: 300 }}
                placeholder="email"
                onChange={(e) => {
                  setemailEnterforForget(e);
                }}
              />
            </Whisper>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={emailsendforget} appearance="subtle">
              send
            </Button>
            <Button onClick={handleCloseforget} appearance="subtle">
              Cancel
            </Button>
          </Modal.Footer>
        </Modal.Header>
      </Modal>
    </div>
  );
}

export default SignInUp;
