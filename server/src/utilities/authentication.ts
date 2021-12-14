import jwt, { Secret } from 'jsonwebtoken';


const createToken = (userId: number) => {
  return jwt
    .sign(
      { 
        _id: userId 
      }, 
      process.env.JWT_SECRET as Secret, 
      { 
        expiresIn: "3h"
      })
    .toString();
};

const decodeToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET as Secret, {ignoreExpiration: true});
};

export { createToken, decodeToken };