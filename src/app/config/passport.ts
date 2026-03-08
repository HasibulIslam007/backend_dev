
import passport from "passport"
import { Strategy as GoogleStrategy, type Profile } from "passport-google-oauth20";
import type { VerifyCallback } from "passport-google-oauth20";
import {envVars} from "./env.js";
import { User } from "../modules/user/user.model.js";
import { UserRole } from "../modules/user/user.interface.js";
import { Strategy as LocalStrategy } from "passport-local";
import bcryptjs from "bcryptjs";
passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
        },
        async (
            email: string,
            password: string,
            done: (err: any, user?: any, info?: { message?: string }) => void
        ) => {
            try {
                const isUserExist = await User.findOne({ email });

                if (!isUserExist) {
                    return done(null, false, { message: "Incorrect email or password." });
                }
                const isGoogleAuthenticated = Array.isArray(isUserExist.auths) && isUserExist.auths.some(auth => auth.provider === "google");

                if (isGoogleAuthenticated || !isUserExist.password) {
                    return done(null, false, { message: "Please login with Google." });
                }

                const isPasswordMatched = await bcryptjs.compare(password as string, isUserExist.password);

                if (!isPasswordMatched) {
                    return done(null, false, { message: "Incorrect email or password." });
                }
                
                // You should add password validation here if needed
                return done(null, isUserExist);
            } catch (error) {
                return done(error, false);
            }
        }
    )
)





passport.use(

    new GoogleStrategy(
        {
            clientID: envVars.GOOGLE_CLIENT_ID,
            clientSecret: envVars.GOOGLE_CLIENT_SECRET,
            callbackURL: envVars.GOOGLE_CALLBACK_URL,
        },
        async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback)=> {

            try {

                const email = Array.isArray(profile.emails) && profile.emails.length > 0 && profile.emails[0] && profile.emails[0].value
                    ? profile.emails[0].value
                    : undefined;

                if(!email){
                    return done(null, false, { message: "No email found in Google profile" });
                }

                const user = await User.findOne({ email: email });

                if (!user) {
                    const newUser = new User({
                        email,
                        name: profile.displayName,
                        googleId: profile.photos && profile.photos[0] ? profile.photos[0].value : undefined,
                        role: UserRole.USER, // Use a specific role value
                        isVerified: true, // Mark as verified since it's from Google
                        auths: [
                            { 
                                provider: "google",
                                providerId: profile.id
                            }
                        ]
                    });
                    await newUser.save();
                    return done(null, newUser);
                } else {
                    return done(null, user);
                }
            } catch (error) {
                return done(error, false);
            }
        }
    
    )
)


passport.serializeUser((user: any, done:(err: any, id?: any) => void) => {
    done(null, user._id);
});

passport.deserializeUser(async (id: string, done:(err: any, user?: any) => void) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});
