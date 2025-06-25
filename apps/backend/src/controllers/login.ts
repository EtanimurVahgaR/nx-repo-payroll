import { Request, Response } from 'express';
import { generateToken } from '../utils/jwt';
import prisma from '../utils/prismaClient';
import bcrypt from 'bcryptjs';

// export const login = async (req: Request, res: Response) => {
//   const { email, password } = req.body;

//   const employee = await prisma.employee.findUnique({ where: { email } });

//   if (!employee || !(await bcrypt.compare(password, employee.password))) {
//     return res.status(401).json({ message: 'Invalid email or password' });
//   }
//   const token = generateToken({
//     id: employee.id,
//     email: employee.email,
//     designation: employee.designation,
//   });

//   return res.json({ token });
// };

export const clientLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const client = await prisma.client.findUnique({ where: { email } });
  if (!client || !(await bcrypt.compare(password, client.password))) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
<<<<<<< HEAD
  const token = generateToken({
    id: client.id,
    email: client.email,
    designation: 'client',
  });
  return res.json({ token });
=======
  // Actual endpoint: just echo back the email for now
  return res.status(200).json({ message: 'Login received', email });
>>>>>>> authentication
};
