// import "dotenv/config";
// export const { PORT, DB_HOST, DB_PORT, DB_DATABASE, SECRET_KEY, JWT_EXPIRATION } = process.env;

import { config } from "dotenv";
config({ path: `.env.${process.env.NODE_ENV || "development"}` });

export const CREDENTIALS = process.env.CREDENTIALS === "true";
export const { NODE_ENV, PORT, LOG_FORMAT, LOG_DIR, ORIGIN } = process.env;
export const { DB_HOST, DB_PORT, DB_DATABASE, SECRET_KEY, JWT_EXPIRATION } = process.env;
