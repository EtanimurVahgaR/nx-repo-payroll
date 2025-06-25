import { Request, Response } from 'express';
import { generateToken } from '../utils/jwt';
import prisma from '../utils/prismaClient'

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const employee = await prisma.employee.findUnique({ where: { email } });

  if (!employee || employee.password !== password) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const token = generateToken({
    id: employee.id,
    email: employee.email,
    designation: employee.designation,
  });

  return res.json({ token });
};