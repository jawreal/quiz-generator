import type { Request, Response, NextFunction } from "express";
import { QuizModel } from "@/models/QuizSchema";
import { validationResult, matchedData } from "express-validator";
import { Types } from "mongoose";

type QueryValues = {
  searchValue?: string;
}

const SearchController = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const user_id = req?.user?._id
    const error = validationResult(req);
    if(!error.isEmpty() || !user_id) {
      throw new Error("Invalid fields or not authorized")
    } // validation
    
    const { searchValue } = matchedData(req) as QueryValues;
    // get the validated data
    
    const title = new RegExp(searchValue as string, "i"); // apply RegExp for search value
    
    const result = await QuizModel.find({
      title,
      user: new Types.ObjectId(user_id), 
    }, {
      title: 1,
      icon: 1,
    }) // query
    
   res.status(201).json(result)
  }catch(error){
    next(error)
  }
}

export default SearchController;