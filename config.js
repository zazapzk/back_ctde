import { config } from "dotenv";
config();

export const JWT_SECRET = process.env.JWT_SECRET;
export const PORT = process.env.PORT;
export const HOSTNAME = process.env.HOSTNAME;

//DB
export const HOSTDB = process.env.HOSTDB;
export const USERDB = process.env.USERDB;
export const PASSDB = process.env.PASSDB;
export const DATABASE = process.env.DATABASE;
export const PORTDB = process.env.PORTDB;