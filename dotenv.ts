import { config } from "dotenv";

config()

const appconfig = {
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  NEXT_APP_URL: process.env.NEXTAUTH_SECRET,
  OLMO_THINK_API: process.env.OLMO_THINK_API,
  OLMO_THINK_BASE_URL: process.env.OLMO_THINK_BASE_URL
};

export default appconfig;
