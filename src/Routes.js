import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage";
import CatDetails from "./components/CatDetails";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/cat/:catID" element={<CatDetails />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
