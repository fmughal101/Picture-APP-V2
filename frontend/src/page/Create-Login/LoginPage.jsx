import "./Create-LoginCSS.css";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      if (email === "" || password === "") {
        setError("Missing Required Information!");
        return;
      }

      await signInWithEmailAndPassword(getAuth(), email, password);

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
          </header>

          <form className="account-info">
            <button className="btn">Sign In with Other Service</button>

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
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="btn create-account"
              onClick={(e) => {
                e.preventDefault();
                login();
              }}
            >
              Log In
            </button>
          </form>
        </div>

        <div className="container">
          <span className="text">
            Don't have an account? <Link to={"/create-account"}>Sign Up</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
