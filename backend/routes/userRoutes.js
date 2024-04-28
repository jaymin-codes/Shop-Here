import express from "express";
import {
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
} from "../controllers/userController.js";

const router = express.Router();

//if the route is a admin route we have to add middleware

router.route("/").post(registerUser).get(getUsers); //if POST than registerUser, if GET getUsers

router.post("/logout", logoutUser);
router.post("/login", authUser);

router.route("/profile").get(getUserProfile).put(updateUserProfile);
router.route("/:id").delete(deleteUser).get(getUserById).put(updateUser);


export default router;
