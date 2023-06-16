import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage";
import CatDetails from "./components/CatDetails";
import LoginPage from "./components/LoginPage";
import CwLoginPage from "./components/CwLoginPage";
import PubLoginPage from "./components/PubLoginPage";
import CwRegPage from "./components/CwRegPage";
import CreateCatForm from "./components/CreateCatForm";
import UpdateCatForm from "./components/UpdateCatForm";
import PubRegPage from "./components/PubRegPage";
import UpdatePerInfoForm from "./components/UpdatePerInfoForm";
import CatFavouriteList from "./components/CatFavouriteList";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cwLogin" element={<CwLoginPage />} />
        <Route path="/cwSignup" element={<CwRegPage />} />
        <Route path="/pubLogin" element={<PubLoginPage />} />
        <Route path="/pubSignup" element={<PubRegPage />} />
        <Route path="/:catID" element={<CatDetails />} />
        <Route path="/settings" element={<UpdatePerInfoForm />} />
        <Route path="/createCatDetails" element={<CreateCatForm />} />
        <Route path="/updateCatDetails/:catID" element={<UpdateCatForm />} />
        <Route path="/favourite" element={<CatFavouriteList />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
