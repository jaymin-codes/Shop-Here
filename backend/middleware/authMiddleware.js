import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

//two functions in this file
//1 -> protected routes for registered users
//2 -> admin middleware function for admins

//Protect routes
const protect = asyncHandler(async (req, res, next) => {
  let token;

  //read jwt from cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); //this has now the userId in jwt token
      req.user = await User.findById(decoded.userId).select("-password"); //we dont want password
      //now this req.user will be available in all our route's req
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not Autorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not Autorized, No token");
  }
});

// Admin Middleware
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not Autorized As Admin");
  }
};

export { protect, admin };
