const express = require("express");
const cors = require("cors");
const colors = require("colors");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const connectDB = require("./config/database");
const setupStaticFiles = require("./config/staticfolders");
const initializeSocket = require("./config/socket");

const app = express();
const PORT = process.env.PORT || 4001;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.ORIGIN],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Access-Control-Allow-Headers"],
  })
);

connectDB();
setupStaticFiles(app);

app.use("/", require("./routes/clientRoutes"));
app.use("/professional", require("./routes/professionalRoutes"));
app.use("/shop", require("./routes/shopRoutes"));
app.use("/admin", require("./routes/adminRoutes"));

const server = app.listen(PORT, () =>
  console.log(`SERVER RUNNING ON PORT : ${PORT}`.yellow.bold)
);

const io = initializeSocket(server);
