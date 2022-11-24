const express = require("express");
const cors = require("cors");
const app = express();
const bearerToken = require("express-bearer-token");
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use(bearerToken());

const { verifyToken } = require("./middlewares/verifyToken");
const { user, job } = require("./routers");
app.use("/auth", user);
app.use("/job", verifyToken, job);

const PORT = 2000;
app.listen(PORT, () => console.log(`Running at PORT: ${2000}`));
