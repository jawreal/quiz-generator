import express, { type Request, type Response } from "express" 
const app = express();

app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "Hello world"})
})

app.listen(3000, () => {
  console.log("Listening in PORT 3000")
})