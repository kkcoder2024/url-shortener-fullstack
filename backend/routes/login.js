import express from "express";
const login_router = express.Router();
import { handleLogin } from "../controllers/auth.js";
login_router.post("/", handleLogin);
export { login_router };
