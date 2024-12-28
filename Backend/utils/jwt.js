import jwt from 'jsonwebtoken';

export const signToken = (payload, secret) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
};
