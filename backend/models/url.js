import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectUrl: {
      type: String,
      required: true,
    },
    visitHistory: [{ time: {} }],
  },
  { timestamps: true }
);

const URL = mongoose.model("urls", urlSchema); // urls is set a collection to this database
export default URL;
