const authRoutes = require("./authRoutes");
const relatedProductRouter = require("./relatedProductRouter");
const productRoutes = require("./productRoutes");
const qnaRoute = require("./qnaRoute");
const usersRoute = require("./usersRoute");
const rajaOngkirRouter = require("./rajaOngkirRouter");
const addressRoute = require("./addressRoute");
<<<<<<< Updated upstream
const transactionRoute = require('./transactionRoute')
=======
// const addressRoutes = require("./addressRoutes");
const qnaAdminRoutes = require("./admin/qnaAdminRoute");
const prescriptionRouter = require("./prescriptionRouter");
>>>>>>> Stashed changes

module.exports = {
  authRoutes,
  relatedProductRouter,
  productRoutes,
  qnaRoute,
  usersRoute,
  rajaOngkirRouter,
  addressRoute,
  transactionRoute

};
