import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { info } = useSelector(({ market }) => market);

  /**
   * 
   * values
   * 
   * let { data } = await axios.put("/markets/me", values)
   * dispatch(updateMarketInfo(data))
   */
  
  return (
    <div>
      <div className="container">
        <h1 className="display-2">{info.name}</h1>
        <h3 className="display-4">{info.inCharge}</h3>
        <p>{info.phone}</p>
        <p>
          {info.address.city?.name?.uz} / {info.address.region?.name?.uz}
        </p>
        <p>{info.address.full}</p>

        <button className="btn btn-danger">Change Password</button>
        <button className="btn btn-info">Change Info</button>
      </div>
    </div>
  );
};

export default Profile;
