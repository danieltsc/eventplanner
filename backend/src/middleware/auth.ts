import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'

interface UserPayload {
  id: number;
  email: string
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload
    }
  }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authentication'] as string | undefined
  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  const token = authHeader.split(' ')[1]

  jwt.verify(token, process.env.SECRET_KEY || '', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token.' })
    }

    req.user = user as UserPayload
    next()
  })
}