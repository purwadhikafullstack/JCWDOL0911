import "./App.css";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import LandingPage from "./pages/LandingPage";
import LayoutWithNavbar from "./components/LayoutWithNavbar";
import AuthRoute from "./components/AuthRoute";
import axios from "axios";
import Profile from "./pages/Profile";
import Forum from "./pages/Forum";
import { useEffect } from "react";

//put imported pages here!
import Cart from "./pages/Cart";
import { useEffect } from "react";

//
function App() {
  //for token check
  // useEffect(() => console.log("Running First"));
  const userProfile = {
    name: "Rifqi",
    email: "rifqirafialdy@gmail.com",
    id: 1,
  };
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(userProfile));
  });

  return (
    <div className="">
      <Routes>
        {/* <Route path="/test" element={<Test />} /> */}
        {/* <Route path="/register" element={<Register />} /> */}
        <Route element={<LayoutWithNavbar />}>
          <Route path="/productlist" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/forum" element={<Forum />} />
        </Route>
        <Route element={<AuthRoute />}>
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
