import jwt from "jsonwebtoken";

const secret_word = process.env.SECRET_WORD;

const createToken = (payload) => {
  const token = jwt.sign(payload, secret_word);
  return token;
};

const tokenOperations = {
  createToken,
};

export default tokenOperations;
