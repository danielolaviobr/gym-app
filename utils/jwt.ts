import { JWT_VAID_FOR_DAYS } from "constants/auth";
import jwt from "jsonwebtoken";

export function getJWT(data: any, stayLogedin: boolean) {
  let options = { expiresIn: `${JWT_VAID_FOR_DAYS}d` };

  return jwt.sign(data, process.env.JWT_SECRET, stayLogedin ? {} : options);
}
