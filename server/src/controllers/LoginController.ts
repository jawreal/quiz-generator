import type { Request, Response, NextFunction } from "express";
import type { UserInfo } from "@/models/UserSchema";
import passport from "passport";

const LoginController = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    "local",
    (err: Error, user: UserInfo | false, _next: NextFunction) => {
      console.log(err);
      if (err) return res.status(500).json({ message: "Server error" });
      if (!user) {
        return res.status(401).json({ message: "Incorrect credentials" });
      }
      req.login(user, async (err) => {
        if (err) return res.status(500).json({ message: "Login error" });
        console.log(req?.user?._id)
        return res.status(200).json({
          message: "Signed in successfully",
        });
      });
    }
  )(req, res, next);
};

export default LoginController;