import express from "express";
import cors from "cors";
const exp = express();
import { router } from "./routes/url.js";
import { auth_router } from "./routes/auth.js";
import { login_router } from "./routes/login.js";
const PORT = process.env.PORT || 8000;
exp.use(
  cors({
    origin: ["http://localhost:5173",
    "https://url-shortener-fullstack-six.vercel.app/"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

exp.use(express.json());
exp.use(express.urlencoded({ extended: false }));
import { databaseConnection } from "./database/connection.js";
exp.use("/signup", auth_router);
exp.use("/login", login_router);
exp.use("/url", router);
exp.use("/", router);
databaseConnection();
exp.listen(PORT, (err) => {
  console.log("Server is Connected");
});
