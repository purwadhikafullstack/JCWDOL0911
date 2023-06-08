import "./App.css";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import LandingPage from "./pages/LandingPage";
import LayoutWithNavbar from "./components/LayoutWithNavbar";
import AuthRoute from "./components/AuthRoute";

//put imported pages here!
import Cart from "./pages/Cart";
<<<<<<< HEAD
import ProductList from "./pages/ProductList";
=======
import { useEffect } from "react";
>>>>>>> development

//
function App() {
  //for token check
  // useEffect(() => console.log("Running First"));

  return (
    <div className="">
      <Routes>
<<<<<<< HEAD
        <Route path="/cart" element={<Cart />} />
        <Route path="/productlist" element={<ProductList />} />
=======
        {/* <Route path="/test" element={<Test />} /> */}
        {/* <Route path="/register" element={<Register />} /> */}
        <Route element={<LayoutWithNavbar />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/" element={<LandingPage />} />
        </Route>
        <Route element={<AuthRoute />}>
          <Route path="/register" element={<Register />} />
        </Route>
>>>>>>> development
      </Routes>
    </div>
  );
}

export default App;
