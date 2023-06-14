import "./App.css";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import LandingPage from "./pages/LandingPage";
import LayoutWithNavbar from "./components/LayoutWithNavbar";
import AuthRoute from "./components/AuthRoute";
import Profile from "./pages/Profile";
import Forum from "./pages/Forum";
import { useEffect } from "react";

//put imported pages here!
import ProductList from "./pages/ProductList";
import Cart from "./pages/Cart";
import Verification from "./pages/Verification";
import Login from "./pages/Login";
import Address from "./pages/Address";
import ChangePassword from "./pages/ChangePassword";

//
function App() {
  //for token check
  // useEffect(() => console.log("Running First"));
  // const userProfile = {
  //   name: "Rifqi",
  //   email: "rifqirafialdy@gmail.com",
  //   id: 1,
  // };
  // useEffect(() => {
  //   localStorage.setItem("user", JSON.stringify(userProfile));
  // });

  return (
    <div className="">
      <Routes>
        <Route element={<LayoutWithNavbar />}>
          <Route path="/productlist" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/address" element={<Address />} />
          <Route path="/change-password" element={<ChangePassword />} />
        </Route>
        <Route element={<AuthRoute />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verification/:token" element={<Verification />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
