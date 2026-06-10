import cookieParser from "cookie-parser";
import { doubleCsrf } from "csrf-csrf";

const COOKIE_SECRET = process.env.COOKIE_SECRET;

export const { doubleCsrfProtection, generateCsrfToken } = doubleCsrf({
  getSecret: () => COOKIE_SECRET,
  cookieName: "x-csrf-token",
  cookieOptions: {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  },
  size: 64,
  ignoredMethods: ["GET", "HEAD", "OPTIONS"],
  getTokenFromRequest: (req) => req.body._csrf,
  getSessionIdentifier: (req) => "fotaza-session-id",
});
