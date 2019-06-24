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