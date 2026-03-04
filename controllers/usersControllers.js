import usersService from "../services/usersServices.js";
import tokenOperations from "../db/jwt/jwt.js";
import ctrlWrapper from "../middlewares/ctrlWrapper.js";

const registerUser = async (req, res) => {
  const user = await usersService.registerUser(req.body);
  
  res.status(201).json({
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const loginUser = async (req, res) => {
  const user = await usersService.loginUser(req.body);

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
  await usersService.logoutUser(req.user.id);

  res.status(204).send();
};

const currentUser = async (req, res) => {
  const user = await usersService.currentUser(req.user.id);

  res.status(200).json({
    email: user.email,
    subscription: user.subscription,
  });
};

const updateUser = async (req, res) => {
  const user = await usersService.updateUser(req.user.id, req.body);

  res.status(200).json({
    email: user.email,
    subscription: user.subscription,
  });
};

const updateAvatar = async (req, res, next) => {
  const file = req.file;
  const user = await usersService.updateAvatar(req.user.id, file);
  res.status(200).json({
    avatarURL: user.avatarURL,
  });
};
const verifyUser = async (req, res) => {
  const { verificationToken } = req.params;
  await usersService.verifyUser(verificationToken);

  res.status(200).json({ message: "Verification successful" });
};

const reVerifyUser = async (req, res) => {
  const { email } = req.body;
  await usersService.reVerifyUser(email);

  res.status(200).json({ message: "Verification email sent!" });
};

const usersControllers = {
  registerUserController: ctrlWrapper(registerUser),
  loginUserController: ctrlWrapper(loginUser),
  logoutUserController: ctrlWrapper(logoutUser),
  currentUserController: ctrlWrapper(currentUser),
  updateUserController: ctrlWrapper(updateUser),
  updateAvatarController: ctrlWrapper(updateAvatar),
  verifyUserController: ctrlWrapper(verifyUser),
  reVerifyUserController: ctrlWrapper(reVerifyUser),
};

export default usersControllers;
