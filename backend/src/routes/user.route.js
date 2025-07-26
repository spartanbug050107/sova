import express from 'express'
import { protectRoute } from '../middleware/auth.middleware.js';
import { getUsers , getFriends, sendingFriendRequest, acceptingFriendRequest, incomingFriendRequests, outgoingFriendRequests, rejectFriendRequest} from '../controller/user.controller.js';
const router = express.Router();

router.get("/", protectRoute, getUsers)
router.get("/friends", protectRoute, getFriends)
router.post("/friend-request/:id", protectRoute, sendingFriendRequest)
router.put("/friend-request/:id/accept", protectRoute, acceptingFriendRequest)
router.delete("/friend-request/:id/reject", protectRoute,rejectFriendRequest);
router.get("/friend-requests", protectRoute, incomingFriendRequests)
router.get("/outgoing-friend-requests", protectRoute, outgoingFriendRequests)
export default router;