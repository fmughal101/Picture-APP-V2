import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./page/HomePage";
import LoginPage from "./page/Create-Login/LoginPage";
import CreateAccountPage from "./page/Create-Login/CreateAccountPage";
import CreateNewPost from "./components/CreateNewPost/CreateNewPost";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/create-account" element={<CreateAccountPage />} />
        <Route path="/testing" element={<CreateNewPost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
