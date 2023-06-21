require("dotenv/config");
const express = require("express");
const cors = require("cors");
const { join } = require("path");
const {
  authRoutes,
  productRoutes,
  qnaRoute,
  usersRoute,
  addressRoute,
  addressRoutes,
  qnaAdminRoutes,
  prescriptionRouter,
} = require("./routes");
const { relatedProductRouter } = require("./routes/index");

const { db, query } = require("./database/index");
const PORT = process.env.PORT || 8000;
const app = express();

// API RajaOngkir
const { rajaOngkirRouter } = require("./routes/index");

app.use(cors());
app.use(
  cors({
    origin: [
      process.env.WHITELISTED_DOMAIN &&
        process.env.WHITELISTED_DOMAIN.split(","),
    ],
  })
);

app.use(express.json());
app.use(express.static(join(__dirname, "public")));

//#region API ROUTES
app.use("/rajaongkir", rajaOngkirRouter);

// ===========================
// NOTE : Add your routes here
app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/address", addressRoutes);
app.use("/admin/qna", qnaAdminRoutes);

app.use(`/product`, relatedProductRouter);
app.use(`/prescription`, prescriptionRouter);
app.use("/qna", qnaRoute);
app.use("/users", usersRoute);
app.use("/addresses", addressRoute);

// app.get("/api/greetings", (req, res, next) => {
//   res.status(200).json({
//     message: "Hello, Student !",
//   });
// });

// ===========================

// not found
app.use((req, res, next) => {
  if (req.path.includes("/api/")) {
    res.status(404).send("Not found !");
  } else {
    next();
  }
});

// error
app.use((err, req, res, next) => {
  if (req.path.includes("/api/")) {
    console.error("Error : ", err.stack);
    res.status(500).send("Error !");
  } else {
    next();
  }
});

//#endregion

//#region CLIENT
const clientPath = "../../client/build";
app.use(express.static(join(__dirname, clientPath)));

// Serve the HTML page
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, clientPath, "index.html"));
});

//#endregion

app.listen(PORT, (err) => {
  console.log(`APP RUNNING at ${PORT} ✅`);
});
