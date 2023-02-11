import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [values, setValues] = useState({
    phone: "+998",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) navigate("/");
  }, []);

  async function handleLogin(e) {
    e.preventDefault();

    // Validations ...

    try {
      // Login
      let {
        data: { token, message },
      } = await axios.post("/auth/market", values);

      localStorage.setItem("token", token);
      axios.defaults.headers.common["x-auth-token"] = `Bearer ${token}`;

      toast(message, { type: "success" });

      navigate("/");
    } catch (error) {
      toast(error.response.data.message, { type: "error" });
    }
  }

  function handleInputChange(e) {
    setValues((oldValues) => ({
      ...oldValues,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <main className="min-vh-100 d-flex align-items-center">
      <form
        onSubmit={handleLogin}
        className="w-50 mx-auto shadow border bg-white rounded p-5"
      >
        <h1 className="display-2">Login</h1>
        <div className="my-4">
          <label htmlFor="phone" className="form-label">
            Your Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            placeholder="+998xxxxxxx"
            className="form-control"
            required
            min={13}
            value={values.phone}
            onChange={handleInputChange}
          />
        </div>
        <div className="my-4">
          <label htmlFor="password" className="form-label">
            Your Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="xxxxxx"
            className="form-control"
            required
            min={6}
            value={values.password}
            onChange={handleInputChange}
          />
        </div>
        <button className="my-4 btn btn-success w-100">Register</button>
        <p className="text-center">
          No account yet? <Link to="/register">Register</Link>
        </p>
      </form>
    </main>
  );  
};

export default Login;
