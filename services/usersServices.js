import "dotenv/config";

import path from "node:path";
import bcrypt from "bcrypt";
import gravatar from "gravatar";
import fs from "node:fs/promises";
import { nanoid } from "nanoid";

import User from "../db/models/User.js";
import sendEmail from "../helpers/sendEmail.js";
import HttpError from "../helpers/HttpError.js";

const date = new Date();

const registerUser = async ({ email, password }) => {
  const existedUser = await User.findOne({ where: { email: email } });
  if (existedUser) throw HttpError(409, "Email in use");

  const hashPassword = await bcrypt.hash(password, 10);
  const avatar = gravatar.url(email);
  const verificationToken = nanoid();
  const user = await User.create({
    email: email,
    password: hashPassword,
    avatarURL: avatar,
    verificationToken: verificationToken,
  });

  const verifyEmail = {
    to: user.email,
    subject: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} Verify email`,
    html: `<a href=${process.env.BASE_URL}/api/auth/verify/${verificationToken} target="_blank">Click to verify email</a>`,
  };
  await sendEmail(verifyEmail);
  return user;
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ where: { email: email } });

  if (!user) throw HttpError(401, "Email or password is wrong");
  if (!user.verify) throw HttpError(401, "Unauthorized");

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) throw HttpError(401, "Email or password is wrong");

  return user;
};

const logoutUser = async (userId) => {
  const user = await User.findByPk(userId);
  if (!user) throw HttpError(401);
  await user.update({ token: null });
  return user;
};

const currentUser = async (userId) => {
  const user = await User.findByPk(userId);
  if (!user) throw HttpError(401);
  return user;
};

const updateUser = async (userId, body) => {
  if (!Object.keys(req.body).length) {
    throw HttpError(400, "Body must have at least one field");
  }

  const user = await User.findByPk(userId);
  if (!user) throw HttpError(401);

  await user.update(body);

  return user;
};

const updateAvatar = async (userId, file) => {
  const user = await User.findByPk(userId);
  if (!user) throw HttpError(401);

  let avatar = null;
  if (file) {
    const newPathArray = ["public", "avatars", file.filename || null];
    await fs.rename(file.path, path.resolve(...newPathArray));
    avatar = path.join(...newPathArray);
  }

  await user.update({ avatarURL: avatar });

  return user;
};

const verifyUser = async (token) => {
  const user = await User.findOne({ where: { verificationToken: token } });
  if (!user) throw HttpError(404, "User not found");

  await user.update({ verify: true, verificationToken: null });
  return user;
};

const reVerifyUser = async (email) => {
  const user = await User.findOne({ where: { email: email } });

  if (!user) {
    throw HttpError(404, "User not found");
  }

  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  const verificationToken = nanoid();

  await user.update({ verificationToken: verificationToken });

  const emailOptions = {
    to: user.email,
    subject: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} Verify email`,
    html: `<a href=${process.env.BASE_URL}/api/auth/verify/${verificationToken} target="_blank">Click to verify email</a>`,
  };

  await sendEmail(emailOptions);

  return user;
};

const usersService = {
  registerUser,
  loginUser,
  logoutUser,
  currentUser,
  updateUser,
  updateAvatar,
  verifyUser,
  reVerifyUser,
};

export default usersService;
