import usersService from "../services/usersServices.js";
import tokenOperations from "../db/jwt/jwt.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../middlewares/ctrlWrapper.js";

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(password);

  const user = await usersService.registerUser(email, password);
  if (!user) throw HttpError(409, "Email in use");
  res.status(201).json({
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await usersService.loginUser(email, password);

  if (!user) throw HttpError(401, "Email or password is wrong");
  const payload = {
    id: user.id,
    email: user.email,
  };

  const token = tokenOperations.createToken(payload);
  await user.update({ token });

  res.status(200).json({
    token: token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const logoutUser = async (req, res) => {
  const user = await usersService.logoutUser(req.user.id);
  if (!user) throw HttpError(401);

  res.status(204).send();
};

const currentUser = async (req, res) => {
  const user = await usersService.currentUser(req.user.id);
  if (!user) throw HttpError(401);

  res.status(200).json({
    email: user.email,
    subscription: user.subscription,
  });
};

const updateUser = async (req, res) => {
  if (!Object.keys(req.body).length) {
    throw HttpError(400, "Body must have at least one field");
  }
  const body = req.body;

  const user = await usersService.updateUser(req.user.id, body);
  if (!user) throw HttpError(401);

  res.status(200).json({
    email: user.email,
    subscription: user.subscription,
  });
};

const updateAvatar = async (req, res, next) => {
  const file = req.file;
  const user = await usersService.updateAvatar(req.user.id, file);
  if (!user) throw HttpError(401);
  res.status(200).json({
    avatarURL: user.avatarURL,
  });
};

export const usersControllers = {
  registerUserController: ctrlWrapper(registerUser),
  loginUserController: ctrlWrapper(loginUser),
  logoutUserController: ctrlWrapper(logoutUser),
  currentUserController: ctrlWrapper(currentUser),
  updateUserController: ctrlWrapper(updateUser),
  updateAvatarController: ctrlWrapper(updateAvatar),
};
