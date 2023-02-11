import { Route, Routes } from "react-router-dom";
import CompleteProfile from "./Pages/CompleteProfile";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import Register from "./Pages/Register";

function App() {
  return (
    <div className="text-bg-light">
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/complete-profile" element={<CompleteProfile />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
