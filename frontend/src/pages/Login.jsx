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
    // Fits EXACTLY between Navbar & Footer
    <motion.div
      className="
        flex-1
        flex items-center justify-center
        px-4
        py-6 sm:py-8
      "
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.form
        onSubmit={onSubmitHandler}
        className="
          flex flex-col
          gap-4 sm:gap-3
          w-full max-w-[360px]
          p-6 sm:p-5
          border rounded-xl
          text-[#5E5E5E] text-sm
          shadow-md bg-white
        "
      >
        <p className="text-xl font-semibold text-center">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>

        <p className="text-xs text-center">
          Please {state === "Sign Up" ? "sign up" : "log in"} to book an
          appointment
        </p>

        {state === "Sign Up" && (
          <div>
            <p>Full Name</p>
            <input
              onChange={onChangeHandler}
              value={user.name}
              name="name"
              required
              className="
                border border-[#DADADA]
                rounded w-full
                p-2 sm:p-1.5
                mt-1
                focus:ring-2 focus:ring-primary focus:outline-none
              "
            />
          </div>
        )}

        <div>
          <p>Email</p>
          <input
            onChange={onChangeHandler}
            value={user.email}
            name="email"
            type="email"
            required
            className="
              border border-[#DADADA]
              rounded w-full
              p-2 sm:p-1.5
              mt-1
              focus:ring-2 focus:ring-primary focus:outline-none
            "
          />
        </div>

        <div>
          <p>Password</p>
          <input
            onChange={onChangeHandler}
            value={user.password}
            name="password"
            type="password"
            required
            className="
              border border-[#DADADA]
              rounded w-full
              p-2 sm:p-1.5
              mt-1
              focus:ring-2 focus:ring-primary focus:outline-none
            "
          />
        </div>

        <button
          type="submit"
          className="
            bg-primary text-white
            w-full
            py-2 sm:py-1.5
            mt-2
            rounded-md
            text-sm
            shadow
          "
        >
          {state === "Sign Up" ? "Create account" : "Login"}
        </button>

        <p className="text-xs text-center mt-1">
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
      </motion.form>
    </motion.div>
  );
};

export default Login;
