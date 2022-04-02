import { useState, useEffect } from "react";
import "./login.css";
// import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { auth, provider } from "../../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const LogIn = () => {
  const [data, setData] = useState({});
  //   const [clicked, setClicked] = useState(false);
  //   //   const history = useHistory();

  //   const handleChange = (e) => {
  //     setData({ ...data, [e.target.name]: e.target.value });
  //   };
  const handleSubmit = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });

    //     toast.info("logging in please wait!");
    //     setClicked(true);
    // axios
    //   .post(`${process.env.REACT_APP_BASE_URL}/signin`, data)
    //   .then((res) => {
    //     if (res.data.message === "Email/Password wrong") {
    //       toast.error("enter valid details");
    //       setClicked(false);
    //     } else {
    //       toast.success("logged in successfully");
    //       sessionStorage.setItem("mail", res.data.data.email);
    //       sessionStorage.setItem("id", res.data.data.id);
    //       history.replace("/");
    //     }
    //   })
    //   .catch((err) => {
    //     toast.error("something went wrong");
    //     setClicked(false);
    //   });
  };

  //   useEffect(() => {
  //     const mail = localStorage.getItem("mail");
  //     if (mail) {
  //       history.replace("/");
  //     }
  //   }, []);

  return (
    <div className="signup-container">
      <main className="form ">
        <header className="signup-header">LOG IN</header>
        {/* <input
          type="email"
          className="input"
          name="email"
          placeholder="email"
          value={data.email}
          onChange={handleChange}
        />
        <input
          type="password"
          className="input"
          name="password"
          placeholder="password"
          value={data.password}
          onChange={handleChange}
        /> */}
        <button
          className="submit-btn"
          onClick={handleSubmit}
          //   disabled={clicked}
        >
          Sign in with Google
        </button>
        <p>
          New user?{" "}
          {/* <Link className="signin-text" to="/signup">
            register
          </Link> */}
        </p>
      </main>
    </div>
  );
};

export default LogIn;
