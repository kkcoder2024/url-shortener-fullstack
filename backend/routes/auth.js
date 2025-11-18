import express from "express";
const auth_router = express.Router();
import { handleSignup } from "../controllers/auth.js";
auth_router.post("/", handleSignup);
export { auth_router };
