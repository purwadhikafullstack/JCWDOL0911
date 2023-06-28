const authRoutes = require("./authRoutes");
const relatedProductRouter = require("./relatedProductRouter");
const productRoutes = require("./productRoutes");
const qnaRoute = require("./qnaRoute");
const usersRoute = require("./usersRoute");
const categoryRoutes = require("./categoryRoutes");
const transactionRoutes = require("./transactionRoutes")
const rajaOngkirRouter = require("./rajaOngkirRouter");
const addressRoute = require("./addressRoute");
const qnaAdminRoutes = require("./admin/qnaAdminRoute");
const prescriptionRouter = require("./prescriptionRouter");
const transactionRoute = require("./transactionRoute");
const orderRouter = require("./orderRouter");
const productOnAdminRoute = require("./admin/productOnAdminRoute");

module.exports = {
  authRoutes,
  relatedProductRouter,
  productRoutes,
  qnaRoute,
  usersRoute,
  categoryRoutes,
  transactionRoutes,
  rajaOngkirRouter,
  prescriptionRouter,
  addressRoute,
  qnaAdminRoutes,
  transactionRoute,
  orderRouter,
  productOnAdminRoute,
};
