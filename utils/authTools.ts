import "server-only";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import connectDB from "@/db/db";
import { User } from "@/db/schema";

const SECRET = process.env.JWT_SECRET as string;

export const createTokenForUser = (userId: string) => {
  const token = jwt.sign({ id: userId }, SECRET);
  return token;
};

export const getUserFromToken = async (token: {
  name: string;
  value: string;
}) => {
  try {
    const payload = jwt.verify(token.value, SECRET) as { id: string };
    await connectDB();
    const user = User.findById(payload.id).select("id email createdAt");
    return user;
  } catch (error) {
    console.error("Error getting user from token:", error);
    throw new Error("Invalid token");
  }
};

export const signin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  await connectDB();
  const match = await User.findOne({ email });

  if (!match) throw new Error("invalid user");

  const correctPW = await comparePW(password, match.password);

  if (!correctPW) {
    throw new Error("invalid user");
  }
  const token = createTokenForUser(match.id);
  const { password: pw, ...user } = match.toObject();

  return { user, token };
};

export const signup = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const hashedPW = await hashPW(password);
    await connectDB();
    const newUser = new User({ email, password: hashedPW });
    const user = await newUser.save();

    const token = createTokenForUser(user.id);

    return { user, token };
  } catch (error) {
    console.error(error);
    throw new Error("db insert error");
  }
};

export const hashPW = (password: string) => {
  return bcrypt.hash(password, 10);
};

export const comparePW = (password: string, hashedPW: string) => {
  return bcrypt.compare(password, hashedPW);
};
