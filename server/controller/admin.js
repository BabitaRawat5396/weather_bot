const User = require("../model/user");

// Controller for getting all the existing users
exports.getAllUsers = async (req, res) => {
  try {
    // Retrieve all users from the database
    const allUsers = await User.find({ role: { $ne: "admin" } });

    // Return the response with success message and user data
    return res.status(200).json({
      success: true,
      message: "All Users fetched successfully",
      users: allUsers,
    });
  } catch (error) {
    // Handle errors
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Can't Fetch User Data",
      error: error.message,
    });
  }
};

// Function to delete a user by ID
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.body;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const allUsers = await User.find({ role: { $ne: "admin" } });

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      users: allUsers,
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete user",
      error: error.message,
    });
  }
};
