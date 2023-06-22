const authRoutes = require("./authRoutes");
const relatedProductRouter = require("./relatedProductRouter");
const productRoutes = require("./productRoutes");
const qnaRoute = require("./qnaRoute");
const usersRoute = require("./usersRoute");
const rajaOngkirRouter = require("./rajaOngkirRouter");
const addressRoute = require("./addressRoute");
const qnaAdminRoutes = require("./admin/qnaAdminRoute");
const prescriptionRouter = require("./prescriptionRouter");
const orderRouter = require("./orderRouter");

module.exports = {
  authRoutes,
  relatedProductRouter,
  productRoutes,
  qnaRoute,
  usersRoute,
  rajaOngkirRouter,
  prescriptionRouter,
  addressRoute,
  qnaAdminRoutes,
  orderRouter,
};
