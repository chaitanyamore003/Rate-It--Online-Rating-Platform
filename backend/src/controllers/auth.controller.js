const UserRepository = require("../db/users.repository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { name, email, password, address, role } = req.body;

  try {
    const existing = await UserRepository.findByEmail(email);

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Email is already registered",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    // Public registration is limited to USER and OWNER roles.
    const userRole = role === "OWNER" ? "OWNER" : "USER";

    const newUser = await UserRepository.createUser({
      name,
      email,
      passwordHash,
      address,
      userRole,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error during registration:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserRepository.findByEmail(email);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User is Not Registered",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    return res.json({
      success: true,
      message: "Login successful",
      data: {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error) {
    console.error("Error during login:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await UserRepository.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Error fetching current user:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const updatePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await UserRepository.findByIdWithPassword(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isOldPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password_hash,
    );

    if (!isOldPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    const newPasswordHash = await bcrypt.hash(newPassword, 10);

    await UserRepository.updatePassword(user.id, newPasswordHash);

    return res.json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error("Error during password update:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  register,
  login,
  getMe,
  updatePassword,
};
