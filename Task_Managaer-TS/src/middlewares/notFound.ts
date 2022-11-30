import { Request, Response } from "express";
const notFound = (req: Request, res: Response) =>
  res.status(404).send("OOPS! Page not found");

export default notFound;
