const authRoutes = require("./authRoutes");
const relatedProductRouter = require("./relatedProductRouter");
const productRoutes = require("./productRoutes");
const qnaRoute = require("./qnaRoute");
const usersRoute = require("./usersRoute");
const rajaOngkirRouter = require("./rajaOngkirRouter");
const addressRoute = require("./addressRoute");
const addressRoutes = require("./addressRoutes");
const qnaAdminRoutes = require("./admin/qnaAdminRoute");

module.exports = {
  authRoutes,
  relatedProductRouter,
  productRoutes,
  qnaRoute,
  usersRoute,
  rajaOngkirRouter,
  addressRoute,
  addressRoutes,
  qnaAdminRoutes,
};
