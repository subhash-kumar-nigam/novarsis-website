const Admin = require("../models/admin.model");
const bcrypt = require("bcryptjs");
const jwtUtil = require("../utils/jwt");
const jwtConfig = require("../config/jwt");
const { formatCustomDate } = require("../common");

// ------------------------------------
// GET ALL ADMINS
// ------------------------------------
exports.findAll = async (req, res) => {
  try {
    const admins = await Admin.findAll();

    const formatted = admins.map((item) => ({
      ...item.toJSON(),
      createdAt: formatCustomDate(item.createdAt, "MM-DD-YYYY HH:mm:ss"),
      lastLogin: item.lastLogin ? formatCustomDate(item.lastLogin, "MM-DD-YYYY HH:mm:ss") : null,
    }));

    return res.json(formatted);

  } catch (error) {
    console.error("FindAll Error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// ------------------------------------
// SIGNUP
// ------------------------------------
exports.create = async (req, res) => {
  try {
    const { name, username, password } = req.body;

    if (!name || !username || !password)
      return res.status(400).json({ message: "All fields required" });

    const exists = await Admin.findOne({
      where: { username: username.trim().toLowerCase() },
    });

    if (exists)
      return res.status(400).json({ message: "User already exists" });

    const hashedPass = await bcrypt.hash(password.trim(), 10);

    const newAdmin = await Admin.create({
      name: name.trim(),
      username: username.trim().toLowerCase(),
      password: hashedPass,
    });

    return res.status(201).json({
      id: newAdmin.id,
      name: newAdmin.name,
      username: newAdmin.username,
    });

  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ------------------------------------
// LOGIN
// ------------------------------------
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).json({ message: "Username & Password required" });

    const adminFound = await Admin.findOne({
      where: { username: username.trim().toLowerCase() },
    });

    if (!adminFound)
      return res.status(400).json({ message: "Invalid username or password" });

    const isMatched = await bcrypt.compare(password, adminFound.password);
    if (!isMatched)
      return res.status(400).json({ message: "Invalid username or password" });

    // Tokens
    const accessToken = jwtUtil.createToken({ id: adminFound.id });
    const refreshToken = jwtUtil.createRefreshToken({ id: adminFound.id });

    // Store refresh token + last login
    await Admin.update(
      {
        refresh_token: refreshToken,
        lastLogin: new Date(),   // ✅ FIXED (now DATE works)
      },
      { where: { id: adminFound.id } }
    );

    // Set cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    return res.json({
      id: adminFound.id,
      name: adminFound.name,
      access_token: accessToken,
      refresh_token: refreshToken,
      token_type: "Bearer",
      expires_in: jwtConfig.ttl,
    });

  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ------------------------------------
// REFRESH TOKEN
// ------------------------------------
exports.refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken)
      return res.status(401).json({ message: "Refresh Token missing" });

    let decoded;
    try {
      decoded = jwtUtil.verifyToken(refreshToken);
    } catch (err) {
      return res.status(403).json({ message: "Invalid or expired refresh token" });
    }

    const adminFound = await Admin.findOne({
      where: { id: decoded.id, refresh_token: refreshToken },
    });

    if (!adminFound)
      return res.status(403).json({ message: "Invalid Refresh Token" });

    const newAccess = jwtUtil.createToken({ id: adminFound.id });
    const newRefresh = jwtUtil.createRefreshToken({ id: adminFound.id });

    await Admin.update(
      { refresh_token: newRefresh },
      { where: { id: adminFound.id } }
    );

    res.cookie("refreshToken", newRefresh, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    return res.json({
      access_token: newAccess,
      token_type: "Bearer",
      expires_in: jwtConfig.ttl,
    });

  } catch (error) {
    console.error("Refresh Error:", error);
    return res.status(403).json({
      message: "Invalid or expired refresh token",
    });
  }
};
