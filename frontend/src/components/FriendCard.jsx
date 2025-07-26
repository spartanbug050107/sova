import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MessageCircleIcon, MapPinIcon } from "lucide-react";

const FriendCard = ({ friend }) => {
  // Debug log
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-slate-800 rounded-xl shadow hover:shadow-lg transition p-4 space-y-4"
    >
      {/* Avatar + Name + Location */}
      <div className="flex items-center gap-3">
        <img
          src={friend.profilePic}
          alt={friend.fullname}
          className="w-14 h-14 rounded-full object-cover border border-slate-600"
        />
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-white">{friend.fullname}</h3>

          {/* Always show location (for testing) */}
          <div className="text-sm text-gray-400 flex items-center gap-1">
            <MapPinIcon className="size-3" />
            <span>{friend.location || "No location available"}</span>
          </div>
        </div>
      </div>

      {friend.bio && (
        <p className="text-sm text-gray-300 line-clamp-3">{friend.bio}</p>
      )}

      <Link
        to={`/chat/${friend._id}`}
        className="flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium py-2 rounded-lg transition"
      >
        <MessageCircleIcon className="size-4" />
        Message
      </Link>
    </motion.div>
  );
};

export default FriendCard;
