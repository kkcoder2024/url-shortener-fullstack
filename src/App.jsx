import { Link } from "react-router-dom";
import "./App.css";
import { useEffect, useState } from "react";
export default function App() {
  const [isLogin, setIsLongin] = useState("");

  const user = JSON.parse(localStorage.getItem("loginUserToken"));
  useEffect(() => {
    const token = localStorage.getItem("loginUserToken");
    setIsLongin(token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loginUserToken");
    setIsLongin("");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-600 to-purple-700 p-6">
      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-md w-full text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Welcome</h1>
        <h2 className="text-3xl font-extrabold text-emerald-500 mb-6">
          {user ? user.name : ""}
        </h2>
        <p className="text-gray-600 mb-10">Choose an option to continue</p>
        {!isLogin ? (
          <div className="space-y-5">
            <Link
              className="block w-full bg-blue-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-blue-700 transition"
              to={"/login"}
            >
              {" "}
              Login
            </Link>
            <Link
              className="block w-full bg-green-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-green-700 transition"
              to={"/signup"}
            >
              {" "}
              Sign Up
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            <button
              onClick={handleLogout}
              className=" cursor-pointer block w-full bg-red-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
