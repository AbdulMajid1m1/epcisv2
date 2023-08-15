import { pool1, pool2 } from "../config/connection.js";
import * as bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../.env") });
let jwtSecret = process.env.JWT_SECRET;
let jwtExpiration = process.env.JWT_EXPIRATION;

const saltRounds = 10;
const userEmail = process.env.USER_EMAIL;
const userPassword = process.env.USER_PASSWORD;

export {
  pool1,
  pool2,
  bcrypt,
  nodemailer,
  jwt,
  dotenv,
  path,
  saltRounds,
  userEmail,
  userPassword,
  jwtSecret,
  jwtExpiration,
};
