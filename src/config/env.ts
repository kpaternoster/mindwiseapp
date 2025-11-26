const BASE_API_URL = 'https://mindwise-main.vercel.app/api';

export const ENV = {
  API_URL: BASE_API_URL,
  ONESIGNAL_APP_ID: 'ONESIGNAL_APP_ID',
} as const;

export const API_ENDPOINTS = {
  SIGNUP: `${BASE_API_URL}/signup-with-password`,
  LOGIN: `${BASE_API_URL}/login-with-password`,
  BUY_SUBSCRIPTION: `${BASE_API_URL}/buy-subscription`,
  LOGOUT: `${BASE_API_URL}/logout`,
  FORGOT_PASSWORD: `${BASE_API_URL}/forgot-password`,
  VERIFY_FORGOT_PASSWORD: `${BASE_API_URL}/verify-forgot-password`,
  CHANGE_FORGOTTEN_PASSWORD: `${BASE_API_URL}/change-forgotten-password`,
  PROFILE: `${BASE_API_URL}/profile`,
  CONTACTS: `${BASE_API_URL}/contacts`,
  EMERGENCY_CONTACT: `${BASE_API_URL}/emergency-contact`,
  PROGRESS: `${BASE_API_URL}/progress`,
  LETTER_FROM_FUTURE_SELF: `${BASE_API_URL}/letter-from-future-self`,
  NOTIFICATIONS: `${BASE_API_URL}/notifications`,
  NOTIFICATION_SETTINGS: `${BASE_API_URL}/notification-settings`,
  NOTIFICATION_TOKEN: `${BASE_API_URL}/notification-token`,
  SHARING_PERMISSIONS: `${BASE_API_URL}/sharing-permissions`,
  DIARY: `${BASE_API_URL}/diary`,
  TODAY_STATUS: `${BASE_API_URL}/today-status`,
} as const;
