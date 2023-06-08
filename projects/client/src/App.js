import axios from "axios";
import { useEffect, useState } from "react";

//importing Routes and Route
import { Routes, Route } from "react-router-dom";

//put imported pages here!
import Cart from "./pages/Cart";
import ProductList from "./pages/ProductList";

//

function App() {
  // const [message, setMessage] = useState("");

  // useEffect(() => {
  //   (async () => {
  //     const { data } = await axios.get(
  //       `${process.env.REACT_APP_API_BASE_URL}/greetings`
  //     );
  //     setMessage(data?.message || "");
  //   })();
  // }, []);

  return (
    <>
      {/*put the Navbar here! */}
      <Routes>
        <Route path="/cart" element={<Cart />} />
        <Route path="/productlist" element={<ProductList />} />
      </Routes>
    </>
  );
}

export default App;
