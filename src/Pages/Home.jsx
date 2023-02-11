import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updateMarketInfo } from "../store/slices/market";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    let token = localStorage.getItem("token");

    if (!token) return navigate("/login");

    async function getMe() {
      try {
        let {
          data: { message, market },
        } = await axios.get("/markets/me");

        toast(message, { type: "info" });

        if (market.isCompleted) {
          dispatch(updateMarketInfo(market));
          return navigate("/profile");
        } else navigate("/complete-profile");
      } catch (error) {
        toast(error.response.data.message, { type: "error" });

        localStorage.removeItem("token");
        delete axios.defaults.headers.common["x-auth-token"];

        navigate("login");
      }
    }

    getMe();
  }, []);

  function handleLogout() {
    toast("Logged out", { type: "info" });

    localStorage.removeItem("token");
    delete axios.defaults.headers.common["x-auth-token"];

    navigate("login");
  }

  return (
    <div>
      <header>
        <div className="container">
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>
      <Outlet />
    </div>
  );
};

export default Home;
