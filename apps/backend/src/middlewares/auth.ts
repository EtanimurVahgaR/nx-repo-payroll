import { Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'supersecretkey';

export const authenticateJWT = (req: Request, res: any, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res
      .status(401)
      .json({ message: 'unauthenticated: No token provided' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SECRET);
    (req as any).user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Forbidden: Invalid token' });
  }
};

export const checkToken = (req: any, res: any, next: NextFunction) => {
  res.json({ user: (req as any).user });
};

export const authorizeByDesignation = (allowedDesignathowions: string[]) => {
  return (req: Request, res: any, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res
        .status(401)
        .json({ message: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, SECRET) as { designation?: string };
      if (
        !decoded.designation ||
        !allowedDesignathowions.includes(decoded.designation)
      ) {
        return res
          .status(403)
          .json({ message: 'Forbidden: Insufficient role' });
      }
      (req as any).designation = decoded.designation;
      next();
    } catch (err) {
      return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }
  };
};
