import passport from "passport"; // Import the Passport library for handling authentication
import { Request } from "express"; // Import the Request type from Express
import { Strategy as GoogleStrategy } from "passport-google-oauth20"; // Import Google OAuth 2.0 strategy for Passport
import { Strategy as LocalStrategy } from "passport-local"; // Import Local strategy for Passport

import { config } from "./app.config"; // Import configuration settings from app.config
import { NotFoundException } from "../utils/appError"; // Import custom NotFoundException class
import { ProviderEnum } from "../enums/account-provider.enum"; // Import ProviderEnum enumeration
import {
  loginOrCreateAccountService,
  verifyUserService,
} from "../services/auth.service"; // Import authentication services

// Google OAuth 2.0 strategy configuration
passport.use(
  new GoogleStrategy(
    {
      clientID: config.GOOGLE_CLIENT_ID, // Google client ID from config
      clientSecret: config.GOOGLE_CLIENT_SECRET, // Google client secret from config
      callbackURL: config.GOOGLE_CALLBACK_URL, // Callback URL after Google authentication
      scope: ["profile", "email"], // Scope for accessing profile and email
      passReqToCallback: true, // Pass the entire request to the callback
    },
    // Callback function for Google OAuth 2.0 strategy
    async (req: Request, accessToken, refreshToken, profile, done) => {
      try {
        const { email, sub: googleId, picture } = profile._json; // Extract email, Google ID, and picture from the profile
        console.log(profile, "profile"); // Log the profile (for debugging)
        console.log(googleId, "googleId"); // Log the Google ID (for debugging)
        if (!googleId) {
          throw new NotFoundException("Google ID (sub) is missing"); // Throw an error if Google ID is missing
        }

        const { user } = await loginOrCreateAccountService({
          provider: ProviderEnum.GOOGLE, // Provider type is Google
          displayName: profile.displayName, // User's display name
          providerId: googleId, // User's Google ID
          picture: picture, // User's profile picture
          email: email, // User's email
        });
        done(null, user); // Pass the user to the done callback
      } catch (error) {
        done(error, false); // Pass the error to the done callback
      }
    }
  )
);

// Local strategy configuration
passport.use(
  new LocalStrategy(
    {
      usernameField: "email", // Use email as the username field
      passwordField: "password", // Use password as the password field
      session: true, // Enable session support
    },
    // Callback function for Local strategy
    async (email, password, done) => {
      try {
        const user = await verifyUserService({ email, password }); // Verify user credentials
        return done(null, user); // Pass the user to the done callback
      } catch (error: any) {
        return done(error, false, { message: error?.message }); // Pass the error to the done callback
      }
    }
  )
);

// Serialize user instance to the session
passport.serializeUser((user: any, done) => done(null, user));

// Deserialize user instance from the session
passport.deserializeUser((user: any, done) => done(null, user));
