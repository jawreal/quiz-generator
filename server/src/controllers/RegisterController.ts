import type { Request, Response, NextFunction } from "express";
import { UserModel } from "@/models/UserSchema";
import { validationResult, matchedData } from "express-validator";
import { CheckIfExist } from "@/middlewares/RegisterValidation";

type UserInfo = {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
} // create a type for user info

const RegisterController = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      // check if there's an error
      return res.status(400).json({ errors: errors.array() })
    };
    const userInfo = matchedData(req) as UserInfo; // get the user info, assert it as the type above
    const isExist = await CheckIfExist(req, res, () => res.headersSent); // check if user already exist
    if(isExist) {
      // return if the user exist
      return;
    }
    // create account if user doesn't exist 
    const newUser = new UserModel(userInfo);
    if (newUser) {
      // authenticate user after registering
      req.login(newUser, (err) => {
        if (err) return next(err);

        return res
          .status(201)
          .json({ message: "User registered and logged in!" });
      });
    }
  }catch(error){
    console.log("Error while registering")
    next(error)
  }
};


export default RegisterController;