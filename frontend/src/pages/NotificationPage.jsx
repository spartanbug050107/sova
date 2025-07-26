import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  acceptFriendRequest,
  getFriendRequests,
  rejectFriendRequest,
} from "../lib/api";
import {
  BellIcon,
  ClockIcon,
  MapPinIcon,
  MessageSquareIcon,
  UserCheckIcon,
} from "lucide-react";
import NoNotifications from "../components/NoNotificationsPage";
import { motion } from "framer-motion";

const NotificationPage = () => {
  const queryClient = useQueryClient();

  const { data: friendReq, isLoading } = useQuery({
    queryKey: ["friendReq"],
    queryFn: getFriendRequests,
  });

  const { mutate: acceptFriendMutation, isPending } = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendReq"] });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });

  const { mutate: rejectFriendMutation, isPending: isRejecting } = useMutation({
    mutationFn: rejectFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendReq"] });
    },
  });

  const incomingReq = friendReq?.incomingReq || [];
  const acceptedReq = friendReq?.acceptedReq || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl mx-auto px-6 py-8 text-white"
    >
      <h1 className="text-3xl font-bold mb-8 border-b pb-3 border-gray-700">
        Notifications
      </h1>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <>
          {incomingReq.length > 0 && (
            <section className="space-y-4 mb-10">
              <motion.h2
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-semibold flex items-center gap-2"
              >
                <UserCheckIcon className="h-5 w-5 text-cyan-400" />
                Friend Requests
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {incomingReq.map((request, idx) => {
                  const sender = request.sender;
                  if (!sender) return null;

                  return (
                    <motion.div
                      key={request._id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.05 * idx }}
                      className="bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-700"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={sender.profilePic || "/default-avatar.png"}
                          alt={sender.fullname || "User"}
                          className="w-14 h-14 rounded-full border border-gray-500"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">
                            {sender.fullname || "Unknown"}
                          </h3>
                          <div className="text-sm text-gray-400 mt-1 flex gap-1 items-center">
                            <MapPinIcon className="size-3" />
                            <span>{sender.location || "No location available"}</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex gap-3 justify-end">
                        <button
                          className="btn btn-sm btn-success"
                          onClick={() => acceptFriendMutation(request._id)}
                          disabled={isPending}
                        >
                          Accept
                        </button>
                        <button
                          className="btn btn-sm btn-outline"
                          onClick={() => rejectFriendMutation(request._id)}
                          disabled={isRejecting}
                        >
                          Reject
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </section>
          )}

          {acceptedReq.length > 0 && (
            <section className="space-y-4">
              <motion.h2
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-semibold flex items-center gap-2"
              >
                <BellIcon className="h-5 w-5 text-green-400" />
                New Connections
              </motion.h2>

              <div className="space-y-4">
                {acceptedReq.map((notification, idx) => (
                  <motion.div
                    key={notification._id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.05 * idx }}
                    className="bg-gray-800 rounded-xl p-4 shadow-md border border-gray-700"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={notification.recipient.profilePic}
                        alt={notification.recipient.fullname}
                        className="w-10 h-10 rounded-full border border-gray-500"
                      />
                      <div className="flex-1">
                        <p className="text-sm text-gray-300">
                          <span className="font-semibold text-white">
                            {notification.recipient.fullname}
                          </span>{" "}
                          accepted your friend request
                        </p>
                        <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                          <ClockIcon className="h-3 w-3" /> Recently
                        </div>
                      </div>
                      <div className="badge badge-success">
                        <MessageSquareIcon className="h-3 w-3 mr-1" /> Friend
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {incomingReq.length === 0 && acceptedReq.length === 0 && <NoNotifications />}
        </>
      )}
    </motion.div>
  );
};

export default NotificationPage;
