import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useContext } from "react";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HotelDetails from "./Pages/User/HotelDetailsScreen";
import UpdateRoom from "./Pages/Admin/UpdateRoom";
import BookingAction from "./Pages/User/BookingAction";
import Profile from "./Pages/User/Profile";
import UserPanel from "./Pages/User/UserPanel";
import Navbar from "./Pages/Navbar";
import Home from "./Pages/Home/HomeScreen";
function App() {
  return (
    <>
      <div className="App">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route path="/getdetail/:id" element={<HotelDetails />} />
            <Route path="/booking/:id" element={<BookingAction />} />
            <Route path="/update-hotel/:id" element={<UpdateRoom />} />
            <Route path="/user-panel" element={<UserPanel />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
