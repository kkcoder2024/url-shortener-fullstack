import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError("All fields are required");
      setSuccess("");
      hideSms();
      return;
    }
    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });
      const data = await response.json();
      if (response.status == 200) {
        setSuccess(data.message);
        localStorage.setItem("loginUserToken", JSON.stringify(data.user));
        setError("");
        hideSms();
        setForm({ email: "", password: "" });
        navigate("/");
      } else {
        setError(data.message);
        setSuccess("");
        hideSms();
      }
    } catch (err) {
      setError("Server Error from frontend");
      setSuccess("");
      hideSms();
    }
  };
  const hideSms = () => {
    setTimeout(() => {
      setSuccess("");
      setError("");
    }, 3000);
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
          Login
        </h2>

        {error && (
          <p className=" bg-red-100 text-red-700 p-2 rounded mb-4 text-center">
            {error}
          </p>
        )}
        {success && (
          <p className=" bg-green-100 text-green-700 p-2 rounded mb-4 text-center">
            {success}
          </p>
        )}

        <form onSubmit={handleLoginSubmit} className="space-y-5">
          <div>
            <label className="text-start block text-gray-700 mb-1 font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="text-start block text-gray-700 mb-1 font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter password"
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl cursor-pointer text-lg font-medium hover:bg-blue-700 transition"
          >
            Login
          </button>

          <p className="text-center text-gray-600 mt-4">
            Don't have an account?{" "}
            <Link
              className="text-blue-600 font-semibold hover:underline"
              to={"/signup"}
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
