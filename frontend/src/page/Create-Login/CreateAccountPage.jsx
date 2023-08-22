import "./Create-LoginCSS.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import axios from "axios";

const CreateAccountPage = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const createAccount = async () => {
    try {
      if (email === "" || password === "") {
        setError("Missing Required Fields!");
        return;
      }

      const response = await createUserWithEmailAndPassword(
        getAuth(),
        email,
        password, userName
      );

      await axios.post(`/api/users/createNewUser/${response.user.uid}`, {
        userName
      }, null)

      setUserName("")
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="create-account-login">
      <div>
        {error && (
          <div className="container error">
            <span className="text">{error}</span>
          </div>
        )}
        <div className="container">
          <header>
            <h2 className="logo">- PictureAPP V2 +</h2>
            <h3>Join The Fun</h3>
            <h3>Create a free account!</h3>
          </header>

          <form className="account-info">
            <button className="btn">Sign Up With Other Service</button>

            <div className="divider">
              <span className="left"></span>
              <span className="or"> Or </span>
              <span className="right"></span>
            </div>

            <input
              className="account-input"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="account-input"
              type="text"
              placeholder="User Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              className="account-input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="btn create-account"
              onClick={(e) => {
                e.preventDefault();
                createAccount();
              }}
            >
              Sign Up
            </button>
          </form>
        </div>

        <div className="container">
          <span className="text">
            Already have an account? <Link to={"/login"}>Log In</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default CreateAccountPage;
