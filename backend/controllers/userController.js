import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

//@desc    Auth user and get token
//@route   POST /api/users/login
//@access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {

    //JWT token
    const token = jwt.sign({ //sign method creates a token, takes in payload
        userId: user._id,}, process.env.JWT_SECRET,
        { expiresIn: "30d"
      });

    //Set JWT as HTTP-only cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development", //if true than https
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
    })


    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password.");
  }
});

//@desc    register user
//@route   POST /api/users
//@access  Public
const registerUser = asyncHandler(async (req, res) => {
  res.send("register user");
});

//@desc    logout user and clear cookie
//@route   POST /api/users/logout
//@access  Private
const logoutUser = asyncHandler(async (req, res) => {
  res.send("logout user");
});

//@desc    get user profile
//@route   GET /api/users/profile
//@access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  res.send("get user profile");
});

//@desc    update user profile
//@route   PUT /api/users/profile
//@access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.send("update user profile");
});

//? ADMIN ROUTES

//@desc    get users
//@route   GET /api/users/
//@access  Private/admin
const getUsers = asyncHandler(async (req, res) => {
  res.send("get users");
});

//@desc    get users by id
//@route   GET /api/users/:id
//@access  Private/admin
const getUserById = asyncHandler(async (req, res) => {
  res.send("get user by id");
});

//@desc    delete users
//@route   DELETE /api/users/:id
//@access  Private/admin
const deleteUser = asyncHandler(async (req, res) => {
  res.send("delete user");
});

//@desc    update users
//@route   PUT /api/users/:id
//@access  Private/admin
const updateUser = asyncHandler(async (req, res) => {
  res.send("update user");
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  //admin routes 
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
};
