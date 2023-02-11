import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updateMarketInfo } from "../store/slices/market";

const CompleteProfile = () => {
  const [regions, setRegions] = useState([]);
  const [values, setValues] = useState({
    name: "",
    inCharge: "",
    address: {
      city: "",
      region: "",
      full: "",
    },
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, []);

  useEffect(() => {
    async function getRegions() {
      try {
        let { data } = await axios.get("/regions");
        setRegions(data.regions);
      } catch (error) {
        toast(error.response.data.message, { type: "error" });
      }
    }

    getRegions();
  }, []);

  function handleInputChange(e) {
    setValues((oldValues) => ({
      ...oldValues,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleCompleteProfile(e) {
    e.preventDefault();

    // Validations ...

    try {
      // Complete
      let {
        data: { message, market },
      } = await axios.post("/markets/me", values);

      toast(message, { type: "success" });

      dispatch(updateMarketInfo(market));

      navigate("/profile");
    } catch (error) {
      toast(error.response.data.message, { type: "error" });
    }
  }

  function handleRegionChange(e) {
    let regionId = e.target.value;

    let {
      city: { _id: cityId },
    } = regions.find((r) => r._id === regionId);

    setValues((ov) => ({
      ...ov,
      address: {
        ...ov.address,
        region: regionId,
        city: cityId,
      },
    }));
  }

  function handleFullAddressChange(e) {
    setValues((ov) => ({
      ...ov,
      address: {
        ...ov.address,
        full: e.target.value,
      },
    }));
  }

  return (
    <main className="min-vh-100 d-flex align-items-center">
      <form
        onSubmit={handleCompleteProfile}
        className="w-50 mx-auto shadow border bg-white rounded p-5"
      >
        <h1 className="display-2">Complete Profile</h1>
        <div className="my-4">
          <label htmlFor="name" className="form-label">
            Market Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Korzinka"
            className="form-control"
            required
            min={13}
            value={values.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="my-4">
          <label htmlFor="inCharge" className="form-label">
            Person In Charge
          </label>
          <input
            type="text"
            name="inCharge"
            id="inCharge"
            placeholder="Eshmatjon"
            className="form-control"
            required
            min={6}
            value={values.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="my-4">
          <label htmlFor="region" className="form-label">
            Region
          </label>
          <select
            onChange={handleRegionChange}
            className="form-select"
            id="region"
          >
            {regions.map((region) => (
              <option key={region._id} value={region._id}>
                {region.name.uz}
              </option>
            ))}
          </select>
        </div>

        <div className="my-4">
          <label htmlFor="full-address" className="form-label">
            Full Address
          </label>
          <input
            type="text"
            name="full-address"
            id="full-address"
            placeholder="Navoiy ko'chasi, 65a uy"
            className="form-control"
            required
            min={6}
            value={values.address.full}
            onChange={handleFullAddressChange}
          />
        </div>
        <button className="my-4 btn btn-success w-100">Complete Profile</button>
      </form>
    </main>
  );
};

export default CompleteProfile;
