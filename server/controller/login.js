const jwt = require("jsonwebtoken");
const User = require("../model/user");

exports.login = async (req, res) => {
  try {
    // Fetch data
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: `username is required`,
      });
    }

    const user = await User.findOne({ name });
    if (!user) {
      return res.status(200).json({
        success: true,
        message: "New user created",
      });
    }

    // Check if the user is not an admin
    if (user.role !== "admin") {
      // Redirect non-admin user to Telegram link
      return res.status(200).json({
        success: true,
        message: "Redirect to Telegram link",
      });
    }
    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, process.env.JWT_KEY_SECRET, {
      expiresIn: "24h",
    });

    // Storing token into the database
    user.token = token;

    // Setting cookie
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), //expiration for 3 days
      httpOnly: true,
    };

    res.cookie("token", token, options).status(200).json({
      success: true,
      token,
      user,
      message: "Logged In",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Login Failed`,
      error: error.message,
    });
  }
};
