import User from "../models/user.js";
// GET Profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// UPDATE Profile
export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.mobile = req.body.mobile || user.mobile;
    user.district = req.body.district || user.district;
    user.taluka = req.body.taluka || user.taluka;
    user.aadhar = req.body.aadhar || user.aadhar;
    user.pancard = req.body.pancard || user.pancard;

    if (req.file) {
      user.profileImage = req.file.path;
    }

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Update failed", error: error.message });
  }
};