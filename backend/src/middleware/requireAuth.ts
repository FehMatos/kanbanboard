import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { Request, Response, NextFunction, RequestHandler } from "express";

interface JwtPayload {
  _id: string;
}

const requireAuth: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    res.status(401).json({ error: "Authorization token required" });
    return;
  }

  const token = authorization.split(" ")[1];
  if (!token) {
    res.status(401).json({ error: "Invalid authorization format" });
    return;
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.SECRET as string
    ) as JwtPayload;
    const { _id } = decoded;

    const user = await User.findOne({ _id }).select("_id email");

    if (!user) {
      res.status(401).json({ error: "User not found" });
      return;
    }
    if (!user.email) {
      res.status(500).json({ error: "User email not found in database" });
      return;
    }
    req.user = { _id: user._id.toString(), email: user.email };
    next();
  } catch (error) {
    console.log(error);

    res.status(401).json({ error: "Request is not authorized" });
  }
};

export default requireAuth;
