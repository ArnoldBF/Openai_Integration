import { Strategy } from "passport-local";

import { AuthService } from "../../../services/auth.service";

const authService = new AuthService();

export const LocalStrategy = new Strategy(
    { usernameField: "userName", passwordField: "password" },
    async (userName: string, password: string, done) => {
        try {
            const usuario = await authService.login(userName, password);
            done(null, usuario);
        } catch (error) {
            done(error, false);
        }
    }
);
