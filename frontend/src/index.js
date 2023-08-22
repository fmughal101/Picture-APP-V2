import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyByJVEcZ47fUc904DW4ODHRaEoLrbZ3p6o",
  authDomain: "picture-app-v2.firebaseapp.com",
  projectId: "picture-app-v2",
  storageBucket: "picture-app-v2.appspot.com",
  messagingSenderId: "615537835534",
  appId: "1:615537835534:web:98db3f21fb92b20694465f",
};

const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
