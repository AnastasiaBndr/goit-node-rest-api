import usersService from "../services/usersServices.js";
import tokenOperations from "../db/jwt/jwt.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../middlewares/ctrlWrapper.js";

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(password)

  const user = await usersService.registerUser(email, password);
  if (!user) throw HttpError(409, "Email in use");
  res.status(201).json(user);
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await usersService.loginUser(email, password);

  if (!user) throw HttpError(400, "Incorrect login or password");
  const payload = {
    id: user.id,
    email: user.email,
  };

  const token = tokenOperations.createToken(payload);
  await user.update({token})

  res.json({
    status: "success",
    code: 200,
    data: {
      token,
    },
  });
};


export const usersControllers = {
  registerUserController: ctrlWrapper(registerUser),
  loginUserController: ctrlWrapper(loginUser),
};
