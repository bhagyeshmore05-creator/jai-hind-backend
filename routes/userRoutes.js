import express from "express";
import { getProfile, updateProfile } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.get("/profile", protect, getProfile);

// The 'profileImage' string must match the field name sent from the frontend
router.put("/profile", protect, upload.single("profileImage"), updateProfile);

export default router;