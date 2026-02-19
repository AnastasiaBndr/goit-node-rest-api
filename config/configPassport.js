import passport from "passport";
import passportJWT from "passport-jwt";
import User from "../db/models/User.js";

const secret = process.env.SECRET_WORD;

const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;

const params = {
  secretOrKey: secret,
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new Strategy(params, function (payload, done) {
    User.findOne({ where: { id: payload.id } })
      .then((user) => {
        if (!user) {
          return done(new Error("User not found"));
        }
        return done(null, user.dataValues);
      })
      .catch((err) => done(err));
  })
);
