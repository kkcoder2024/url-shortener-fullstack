import express from "express";
const router = express.Router();
import { handlegenerateUrl, redirectUrls } from "../controllers/url.js";

router.post("/", handlegenerateUrl);
router.get("/:short_id", redirectUrls);

export { router };
