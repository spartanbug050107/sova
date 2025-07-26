import React from "react";
import { motion } from "framer-motion";
import { MessageSquare, Home, Settings, LogOutIcon ,UserCheck, BellIcon  } from "lucide-react";
import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";

const Sidebar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <motion.div
      initial={{ x: -40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 70 }}
      className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white w-52 min-h-screen px-6 py-6 shadow-2xl flex flex-col"
    >

      {/* Navigation Links */}
      <nav className="flex flex-col gap-4 flex-1">
        <Link to="/" className="group">
          <motion.div
            whileHover={{ scale: 1.05, x: 4 }}
            className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-300 hover:bg-gray-700 transition"
          >
            <Home className="size-5 text-cyan-400" />
            <span>Home</span>
          </motion.div>
        </Link>

        {/* <Link to="/friends" className={`group ${ currentPath === "/friends" ? "btn-active" : ""}`}>
          <motion.div
            whileHover={{ scale: 1.05, x: 4 }}
            className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-300 hover:bg-gray-700 transition"
          >
            <UserCheck className="size-5 text-cyan-400" />
            <span>Friends</span>
          </motion.div>
        </Link> */}

        <Link to={"/notifications"} className={`group ${ currentPath === "/notifications" ? "btn-active" : ""}`}>
          <motion.div
            whileHover={{ scale: 1.05, x: 4 }}
            className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-300 hover:bg-gray-700 transition"
          >
            <BellIcon className="size-5 text-cyan-400" />
            <span>Notifications</span>
          </motion.div>
        </Link>
      </nav>

      {/* User Profile at Bottom */}
      <div className="pt-4 border-t border-base-300 mt-6">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src={authUser?.profilePic} alt="User Avatar" />
            </div>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm">{authUser?.fullName}</p>
            <p className="text-xs text-success flex items-center gap-1">
              <span className="size-2 rounded-full bg-success inline-block" />
              Online
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
