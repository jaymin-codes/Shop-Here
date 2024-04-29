import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

//@desc    Auth user and get token
//@route   POST /api/users/login
//@access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    //JWT token
    generateToken(res, user._id);

    res.status(200).json({
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
  const { name, email, password } = req.body; //user inputs this

  //checking if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400); //client error
    throw new Error("User already exists");
  }

  const user = await User.create({
    //comes from a form in frontend
    name,
    email,
    password, //hashing happens in userModel
  });

  if (user) {
    //checking if user created successfully
    generateToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid User data");
  }
});

//@desc    logout user and clear cookie
//@route   POST /api/users/logout
//@access  Private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out successfully" });
});

//@desc    get user profile
//@route   GET /api/users/profile
//@access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc    update user profile
//@route   PUT /api/users/profile
//@access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
 
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      password: updatedUser.password,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
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
