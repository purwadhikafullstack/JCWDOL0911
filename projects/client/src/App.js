import "./App.css";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import LandingPage from "./pages/LandingPage";
import LayoutWithNavbar from "./components/LayoutWithNavbar";
import AuthRoute from "./components/AuthRoute";

function App() {
  return (
    <div className="">
      <Routes>
        <Route element={<LayoutWithNavbar />}>
          <Route path="/" element={<LandingPage />} />
        </Route>
        <Route element={<AuthRoute />}>
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
