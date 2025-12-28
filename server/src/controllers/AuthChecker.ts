import type { Request, Response, NextFunction } from "express";


const CheckAuth = (req: Request, res: Response, next: NextFunction) => {
  try{
    if(req.isAuthenticated()){
      return res.status(201).json(req.user);
    }
    res.status(401).json({
      message: "Unauthorized"
    })
  }catch(err){
    next(err)
  }
};


const LogoutSession = (req: Request, res: Response, next: NextFunction) => {
  req.session.destroy((err: Error) => {
    if (err) {
      console.log("Couldn't destroy the session");
      next(err);
      return;
    }
    res.clearCookie("connect.sid");
    res.status(200).send("Signout");
  });
}

export { CheckAuth, LogoutSession };