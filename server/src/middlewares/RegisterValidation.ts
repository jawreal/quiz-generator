import type { Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import { UserModel } from "@/models/UserSchema";

// check if user account already exists
const CheckIfExist = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const { username } = req.body;
    const isExist = await UserModel.find({ username: username as string });
    if(isExist){
      console.log("User already exist!")
      return res.status(400).json({ message: "User already exist!"})
    }
    next();
  }catch(error){
    next(error)
  }
};

// validate user info
const CheckUserInfo =  [
  body("firstName").notEmpty().withMessage("First name is required").isString().withMessage("First name must be a string"),
  body("lastName").notEmpty().withMessage("Last name is required").isString().withMessage("Last name must be a string"),
  body("username").notEmpty().withMessage("Username is required").isString().withMessage("Username must be a string"),
  body("password").notEmpty().withMessage("Password is required").isString().withMessage("Password must be a string").isLength({ min: 8 }).withMessage("Password must be at least 8 characters."),
];

export { CheckIfExist, CheckUserInfo };