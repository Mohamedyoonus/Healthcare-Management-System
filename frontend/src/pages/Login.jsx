import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const [state, setState] = useState("Sign Up");
  const [user, setUser] = useState({ name: "", email: "", password: "" });

  const navigate = useNavigate();
  const { backendUrl, token, setToken } = useContext(AppContext);

  const onChangeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const endpoint =
        state === "Sign Up" ? "/api/user/register" : "/api/user/login";
      const payload =
        state === "Sign Up"
          ? user
          : { email: user.email, password: user.password };

      const { data } = await axios.post(`${backendUrl}${endpoint}`, payload);

      if (data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        toast.success(`${state} successful!`);
      } else {
        toast.error(data.message || "Authentication failed!");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  useEffect(() => {
    if (token) navigate("/");
  }, [token, navigate]);

  return (
    <motion.form
      onSubmit={onSubmitHandler}
      className="min-h-[80vh] flex items-center px-4"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <motion.div
        key={state}
        className="flex flex-col gap-4 m-auto p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg bg-white"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <motion.p
          className="text-2xl font-semibold"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {state === "Sign Up" ? "Create Account" : "Login"}
        </motion.p>
        <p>
          Please {state === "Sign Up" ? "sign up" : "log in"} to book an
          appointment
        </p>

        {state === "Sign Up" && (
          <div className="w-full">
            <p>Full Name</p>
            <motion.input
              onChange={onChangeHandler}
              value={user.name}
              name="name"
              className="border border-[#DADADA] rounded w-full p-2 mt-1 focus:ring-2 focus:ring-primary focus:outline-none transition-all"
              type="text"
              required
              whileFocus={{ scale: 1.01 }}
            />
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <motion.input
            onChange={onChangeHandler}
            value={user.email}
            name="email"
            className="border border-[#DADADA] rounded w-full p-2 mt-1 focus:ring-2 focus:ring-primary focus:outline-none transition-all"
            type="email"
            required
            whileFocus={{ scale: 1.01 }}
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <motion.input
            onChange={onChangeHandler}
            value={user.password}
            name="password"
            className="border border-[#DADADA] rounded w-full p-2 mt-1 focus:ring-2 focus:ring-primary focus:outline-none transition-all"
            type="password"
            required
            whileFocus={{ scale: 1.01 }}
          />
        </div>

        <motion.button
          type="submit"
          className="bg-primary text-white w-full py-2 my-2 rounded-md text-base shadow-md"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {state === "Sign Up" ? "Create account" : "Login"}
        </motion.button>

        <p>
          {state === "Sign Up"
            ? "Already have an account?"
            : "Create a new account?"}
          <span
            onClick={() => setState(state === "Sign Up" ? "Login" : "Sign Up")}
            className="text-primary underline cursor-pointer ml-1"
          >
            {state === "Sign Up" ? "Login here" : "Click here"}
          </span>
        </p>
      </motion.div>
    </motion.form>
  );
};

export default Login;
