import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [values, setValues] = useState({
    phone: "+998",
    password: "",
    confirmedPassword: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) navigate("/");
  }, []);

  async function handleRegister(e) {
    e.preventDefault();

    if (values.password !== values.confirmedPassword)
      return toast("Passwords do not match", { type: "error" });

    // Validations ...

    try {
      // Register
      let {
        data: { token, message },
      } = await axios.post("/markets", values);

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
        onSubmit={handleRegister}
        className="w-50 mx-auto shadow border bg-white rounded p-5"
      >
        <h1 className="display-2">Register</h1>
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
        <div className="my-4">
          <label htmlFor="confirmedPassword" className="form-label">
            Confirm The Password
          </label>
          <input
            type="password"
            name="confirmedPassword"
            id="confirmedPassword"
            placeholder="xxxxxx"
            className="form-control"
            required
            min={6}
            value={values.confirmedPassword}
            onChange={handleInputChange}
          />
        </div>
        <button className="my-4 btn btn-success w-100">Register</button>
        <p className="text-center">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </main>
  );
};

export default Register;
