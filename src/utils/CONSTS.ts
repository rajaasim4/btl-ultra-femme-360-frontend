export const WEBHOOK_URL =
  "https://hooks.zapier.com/hooks/catch/12961765/2g6o0r2/" as const;
export const WEBHOOK_URL_UNVERIFIED =
  "https://hooks.zapier.com/hooks/catch/12961765/2lfbo4h/" as const;

export const GTM_ID = "GTM-WK7S6V7G" as const;

export const OTP_EXPIRY_TIME = 120;
export const MAX_OTP_ATTEMPTS = 3;
export const REDIRECT_TIMEOUT = 3 * 60 * 1000;

export const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://btl-ultra-femme-360-backend.vercel.app/";
