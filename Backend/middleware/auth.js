import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'] || '';
  try {
    const user = jwt.verify(authHeader, process.env.JWT_SECRET);
    if (user) {
      req.userId = user.id;
      next();
    } else {
      res.status(403).json({ message: 'You are not logged in' });
    }
  } catch (e) {
    res.status(403).json({ message: 'You are not logged in' });
  }
};

export default verifyToken;
