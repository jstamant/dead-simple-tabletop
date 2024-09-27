import {Request, Response, NextFunction} from 'express'

import jwt, { Secret } from 'jsonwebtoken'
// TODO should throw an error if there's no secret set??
const secret: Secret = process.env.SECRET || 'test'

export const authentication = (req: Request, res: Response, next: NextFunction) => {
  console.log("CHECKING TOKEN");
  const token = req.cookies.token;
  if (!token) return res.status(401).end();
  // TODO implement catching token expiry
  req.user = jwt.verify(token, secret);
  console.log("Token verified:", token)
  console.log("req.user", req.user);
  next();
};
