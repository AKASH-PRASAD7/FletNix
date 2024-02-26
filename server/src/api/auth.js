import { Router } from "express";
const router = Router();
import { signUp, signIn, signOut } from "../controller/auth.js";

/**
 * Route     /api/auth/signup
 * Des       Sign Up User
 * Params    none
 * Access    Public
 * Method    POST
 */

router.post("/signup", (req, res) => signUp(req, res));

/**
 * Route     /api/auth/signin
 * Des       Sign In User
 * Params    none
 * Access    Public
 * Method    POST
 */

router.post("/signin", (req, res) => signIn(req, res));

/**
 * Route     /api/auth/signOut
 * Des       Sign Out User
 * Params    none
 * Access    Public
 * Method    POST
 */

router.post("/signout", (req, res) => signOut(req, res));

router.get("*", (req, res) => {
  try {
    res.status(404).json({ message: "Route doesn't exist" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
