import User from "../db/models/User.js";
import bcrypt from "bcrypt";
import gravatar from "gravatar";
import fs from "node:fs/promises";
import path from "node:path";

const registerUser = async (email, password) => {
  const existedUser = await User.findOne({ where: { email: email } });
  if (existedUser) return null;

  const hashPassword = await bcrypt.hash(password, 10);
  const avatar = gravatar.url(email);
  const user = await User.create({
    email: email,
    password: hashPassword,
    avatarURL: avatar,
  });
  return user;
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ where: { email: email } });
  if (!user) return null;
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return null;

  return user;
};

const logoutUser = async (userId) => {
  const user = await User.findByPk(userId);
  if (!user) return null;
  await user.update({ token: null });
  return user;
};

const currentUser = async (userId) => {
  const user = await User.findByPk(userId);
  if (!user) return null;
  return user;
};

const updateUser = async (userId, body) => {
  const user = await User.findByPk(userId);
  if (!user) return null;

  await user.update(body);

  return user;
};

const updateAvatar = async (userId, file) => {
  const user = await User.findByPk(userId);
  if (!user) return null;

  let avatar = null;
  if (file) {
    const newPathArray = ["public", "avatars", file.filename || null];
    await fs.rename(file.path, path.resolve(...newPathArray));
    avatar = path.join(...newPathArray);
  }

  await user.update({ avatarURL: avatar });

  return user;
};

const usersService = {
  registerUser,
  loginUser,
  logoutUser,
  currentUser,
  updateUser,
  updateAvatar,
};

export default usersService;
