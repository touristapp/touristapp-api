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
    async (jwtPayload, done) => {
      try {
        const user = await User.findOne({ where: { id: jwtPayload.id } });
        if (!user) {
          return done("User doesn't exist");
        }
        return done(false, user);
      } catch (err) {
        return done(err.message);
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
    async (email, password, done) => {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return done("Email doesn't exist");
      }

      if (!(await user.checkPassword(password))) {
        return done("Password doesn't match");
      }

      return done(false, user);
    }
  )
);