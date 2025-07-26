import { Link, useLocation } from "react-router-dom";
import useAuthUser from "../hooks/useAuthUser";
import {
  LogOutIcon,
  MessageSquare,
} from "lucide-react";
import useLogout from "../hooks/useLogout";
import { motion } from "framer-motion";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const { logoutMutation } = useLogout();

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 80, damping: 12 }}
      className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-700 sticky top-0 z-30 h-16 shadow-md"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        {/* Logo - Always visible */}
        <motion.div
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-2"
        >
          <Link to="/" className="flex items-center gap-2">
            <MessageSquare className="size-7 text-cyan-400 animate-pulse" />
            <span className="text-2xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 tracking-wide">
              Sova
            </span>
          </Link>
        </motion.div>

        {/* Right-side controls */}
        <motion.div
          initial={{ x: 10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-3 sm:gap-4"
        >
          {/* Avatar */}
          <motion.div whileHover={{ rotate: 3 }} className="avatar">
            <div className="w-9 rounded-full ring ring-cyan-400 ring-offset-base-100 ring-offset-2">
              <img
                src={authUser?.profilePic}
                alt="User"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>

          {/* Logout */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-ghost btn-circle"
            onClick={logoutMutation}
          >
            <LogOutIcon className="h-6 w-6 text-gray-300 opacity-80 hover:text-red-500" />
          </motion.button>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
