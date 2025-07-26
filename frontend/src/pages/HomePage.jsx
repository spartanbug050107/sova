import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import React from "react";
import {
  getOutgoingFriendReqs,
  getRecommendedUsers,
  getUserFriends,
  sendFriendRequest,
  getFriendRequests,
} from "../lib/api";
import { Link } from "react-router";
import {
  CheckCircleIcon,
  MapPinIcon,
  UserPlusIcon,
  UsersIcon,
} from "lucide-react";
import FriendCard from "../components/FriendCard";
import NoFriends from "../components/NoFriends";
import { motion } from "framer-motion";

const HomePage = () => {
  
  const queryClient = useQueryClient();
  const [outgoingReqId, setOutgoingReqId] = useState(new Set());

  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["Users"],
    queryFn: getRecommendedUsers,
  });

  const { data: outgoingFriendReqs } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
  });

  const { mutate: sendRequestMutation, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] }),
  });

  const { data: friendRequests = [] } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
    refetchInterval: 5000,
  });

  const count = friendRequests.length;

  useEffect(() => {
    const outgoingIds = new Set();
    if (outgoingFriendReqs && outgoingFriendReqs.length > 0) {
      outgoingFriendReqs.forEach((req) => {
        outgoingIds.add(req.recipient._id);
      });
      setOutgoingReqId(outgoingIds);
    }
  }, [outgoingFriendReqs]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 text-white px-6 py-10"
    >
      <div className="max-w-7xl mx-auto space-y-14">
        {/* Your Friends Section */}
        <motion.section
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold tracking-wide border-b pb-3 w-fit">
              Your Friends
            </h2>
            <Link
              to="/notifications"
              className="relative flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium border border-cyan-500 text-cyan-400 hover:bg-cyan-900 transition"
            >
              <motion.div whileHover={{ scale: 1.1 }} className="relative">
                <UserPlusIcon className="h-6 w-6 text-white hover:text-cyan-400" />
                {count > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                  >
                    {count}
                  </motion.span>
                )}
              </motion.div>
            </Link>
          </div>

          {loadingFriends ? (
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : friends.length === 0 ? (
            <NoFriends />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {friends.map((friend) => (
                <FriendCard key={friend._id} friend={friend} />
              ))}
            </div>
          )}
        </motion.section>

        {/* Recommendations Section */}
        <motion.section
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="inline-block border-b pb-3 mb-6 w-fit">
            <h1 className="text-3xl font-bold">Suggestions</h1>
          </div>

          {loadingUsers ? (
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : recommendedUsers.length === 0 ? (
            <div className="bg-slate-800 p-6 rounded-xl text-center">
              <h3 className="font-semibold text-lg">No recommendations</h3>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedUsers.map((user) => {
                const hasRequestSent = outgoingReqId.has(user._id);

                return (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    key={user._id}
                    className="bg-slate-800 p-5 rounded-xl space-y-4 shadow-md hover:shadow-xl transition"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full overflow-hidden">
                        <img
                          src={user.profilePic}
                          alt={user.fullname}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">
                          {user.fullname}
                        </h3>
                        {user.location && (
                          <div className="text-sm text-gray-400 flex items-center gap-1 mt-1">
                            <MapPinIcon className="size-3" /> {user.location}
                          </div>
                        )}
                      </div>
                    </div>

                    {user.bio && (
                      <p className="text-sm text-gray-300 line-clamp-3">
                        {user.bio}
                      </p>
                    )}

                    <button
                      onClick={() => sendRequestMutation(user._id)}
                      disabled={hasRequestSent || isPending}
                      className={`w-full py-2 rounded-lg text-sm font-medium transition ${
                        hasRequestSent
                          ? "bg-gray-600 text-white cursor-not-allowed"
                          : "bg-cyan-600 hover:bg-cyan-700 text-white"
                      }`}
                    >
                      {hasRequestSent ? (
                        <span className="flex items-center justify-center gap-2">
                          <CheckCircleIcon className="size-4" /> Request Sent
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <UserPlusIcon className="size-4" /> Send Friend
                          Request
                        </span>
                      )}
                    </button>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.section>
      </div>
    </motion.div>
  );
};

export default HomePage;
