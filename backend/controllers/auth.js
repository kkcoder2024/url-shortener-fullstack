import { Auth } from "../models/auth.js";
import bcrypt from "bcrypt";
export async function handleLogin(req, res) {
  try {
    const { email, password } = req.body;
    const fetch_data = await Auth.findOne({ email });
    if (!fetch_data) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const fetchHashPassword = await bcrypt.compare(
      password,
      fetch_data.password
    );
    if (!fetchHashPassword) {
      return res.status(401).json({
        message: "Invalid Password",
      });
    }
    return res.status(200).json({
      message: "Login successful",
      user: {
        name: fetch_data.name,
        email: fetch_data.email,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
}
export async function handleSignup(req, res) {
  try {
    const { name, email, password } = req.body;
    const email_exist = await Auth.findOne({ email });
    if (email_exist) {
      return res.status(409).json({
        message: "Email Already present",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10); //use bcrypt for hashing and saltation the password
    await Auth.create({
      name,
      email,
      password: hashedPassword,
    });
    return res.status(200).json({
      message: "User created successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
}
