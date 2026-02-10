import cloudinary from "../lib/cloudinary.js";
import User from "../models/user.model.js";

export const updateProfile = async (req, res) => {
  try {
    const { name, age, bio, image, genderPreference } = req.body;

    if (age < 18) {
      return res
        .status(400)
        .json({ message: "You must be at least 18 years old" });
    }

    let uploadResult = null;
    let imageUrl = req.user.image;
    if (image?.startsWith("data:image")) {
      // Upload image to Cloudinary
      uploadResult = await cloudinary.uploader.upload(image, {
        overwrite: true,
      });
      imageUrl = uploadResult.secure_url;
    }
    // if (image) {
    //   // Upload image to Cloudinary
    //   uploadResult = await cloudinary.uploader.upload(image);
    // }
    // Update user profile
    const userId = req.user._id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name,
        age,
        bio,
        image: imageUrl,
        genderPreference,
      },
      { new: true },
    );

    res.status(200).json({ message: "Profile updated", user: updatedUser });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};
