import User from "../models/user.js";

// @desc    Get user profile
export const getProfile = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

// @desc    Update user profile
export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      // Update basic info
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.mobile = req.body.mobile || user.mobile;
      user.district = req.body.district || user.district;
      user.taluka = req.body.taluka || user.taluka;

      // Update new identity fields
      user.aadhar = req.body.aadhar || user.aadhar;
      user.pancard = req.body.pancard || user.pancard;

      // Handle profile image if uploaded via multer
      if (req.file) {
        user.profileImage = `/uploads/${req.file.filename}`;
      }

      const updatedUser = await user.save();

      // Return updated user (excluding password)
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        mobile: updatedUser.mobile,
        district: updatedUser.district,
        taluka: updatedUser.taluka,
        aadhar: updatedUser.aadhar,
        pancard: updatedUser.pancard,
        profileImage: updatedUser.profileImage,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Update failed", error: error.message });
  }
};