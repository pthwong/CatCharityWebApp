import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage";
import CatDetails from "./components/CatDetails";
import LoginPage from "./components/LoginPage";
import CwLoginPage from "./components/CwLoginPage";
import PubLoginPage from "./components/PubLoginPage";
import CwRegPage from "./components/CwRegPage";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cwLogin" element={<CwLoginPage />} />
        <Route path="/cwSignup" element={<CwRegPage />} />
        <Route path="/pubLogin" element={<PubLoginPage />} />
        <Route path="/cat/:catID" element={<CatDetails />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
