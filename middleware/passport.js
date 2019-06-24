import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import User from "../database/models/user";
require('dotenv').config();

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SUPERSECRET
    },
    async (jwtPayload, next) => {
      try {
        const user = await User.findOne({ where: { id: jwtPayload.id } });
        if (!user) {
          return next("User doesn't exist");
        }
        return next(false, user);
      } catch (err) {
        return next(err.message);
      }
    }
  )
);

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    async (email, password, next) => {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return next("Nickname doesn't exist");
      }

      if (!(await user.checkPassword(password))) {
        return next("Password doesn't match");
      }

      return next(false, user);
    }
  )
);