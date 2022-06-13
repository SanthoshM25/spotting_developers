import "./login.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { auth, provider } from "../../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import axios from "axios";

const LogIn = () => {
  const navigate = useNavigate();
  const [data, setData] = useState();

  const handleSubmit = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // const user = result.user;
        console.log(result.user);
        axios
          .post(`${process.env.REACT_APP_API_URL}/auth/login`, {
            email: result.user.email,
          })
          .then((response) => {
            console.log("token: ", response.data.token);
            if (response.data.token) {
              console.log(response.data);
              console.log(result.user.email, response.data.token);
              localStorage.setItem("token", response.data.token);
              localStorage.setItem("name", response.data.name);
              navigate("/");
            } else {
              setData({
                ...data,
                name: result.user.displayName,
                email: result.user.email,
                profileImgUrl: result.user.photoURL,
              });
              navigate("/userdetails", {
                state: {
                  location: data.Location,
                  name: result.user.displayName,
                  email: result.user.email,
                  profileImgUrl: result.user.photoURL,
                },
              });
              localStorage.setItem("name", result.user.displayName);
            }
          })
          .catch((err) => {
            console.log(err);
            alert("Something went wrong!");
          });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage);
      });
  };
  useEffect(() => {
    if (localStorage.getItem("token")) navigate("/");
    else {
      navigator.geolocation.getCurrentPosition(function (position) {
        setData({
          ...data,
          Location: `${position.coords.latitude} ${position.coords.longitude}`,
        });
        console.log(position.coords);
      });
    }
  }, []);

  return (
    <div className="signup-container">
      <main className="form ">
        <header className="signup-header">SPOTTING DEVELOPERS</header>
        <button className="submit-btn" onClick={handleSubmit}>
          SignUp/Login with Google
        </button>
      </main>
    </div>
  );
};

export default LogIn;
