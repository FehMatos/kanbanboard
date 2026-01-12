import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

interface AuthBody {
  email: string;
  password: string;
}

const createToken = (_id: string): string => {
  const secret = process.env.SECRET as string;

  return jwt.sign({ _id }, secret, { expiresIn: "3d" });
};

const loginUser = async (
  req: Request<{}, {}, AuthBody>,
  res: Response
): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const token = createToken(user._id.toString());

    res.status(200).json({ email: user.email, token });
  } catch (error) {
    res.status(400).json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

const signupUser = async (
  req: Request<{}, {}, AuthBody>,
  res: Response
): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);

    const token = createToken(user._id.toString());

    res.status(200).json({ email: user.email, token });
  } catch (error) {
    res.status(400).json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export { signupUser, loginUser };
