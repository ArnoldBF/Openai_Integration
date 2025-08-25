import passport from "passport";

import { LocalStrategy } from "./strategies/localAuth.helpers";
import { JwtStrategy } from "./strategies/jwt.helpers";

passport.use(LocalStrategy);
passport.use(JwtStrategy);
