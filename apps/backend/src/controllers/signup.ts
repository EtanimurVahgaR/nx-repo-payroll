import { Request, Response } from 'express';
import { generateToken, authToken } from '../utils/jwt';
import bcrypt from 'bcryptjs';
import prisma from '../utils/prismaClient';

export const Employee_signup = async (req: Request, res: Response) => {
  const {
    email,
    password,
    name,
    employeeCode,
    designation,
    trade,
    grade,
    dateOfJoining,
    dob,
    phoneNumber,
    address,
    aadharNumber,
    pan,
    bankName,
    ifscCode,
    accountNumber,
    fathersName,
    motherName,
    marriedStatus,
    spouseName,
    childrenName,
    uanNumber,
    gender,
    esicNumber,
    projectId,
    emergencyStatusNo,
  } = req.body;

  if (!email || !password || !name || !employeeCode || !designation) {
    return res.status(400).json({ message: 'Required fields missing' });
  }

  try {
    const existingUser = await prisma.employee.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.employee.create({
      data: {
        email,
        password: hashedPassword,
        name,
        employeeCode,
        designation,
        trade,
        grade,
        dateOfJoining: dateOfJoining ? new Date(dateOfJoining) : undefined,
        dob: dob ? new Date(dob) : undefined,
        phoneNumber,
        address,
        aadharNumber,
        pan,
        bankName,
        ifscCode,
        accountNumber,
        fathersName,
        motherName,
        marriedStatus,
        spouseName,
        childrenName,
        uanNumber,
        gender,
        esicNumber,
        projectId,
        emergencyStatusNo,
      },
    });

    const accessToken = generateToken({
      id: user.id,
      email: user.email,
      designation: user.designation,
    });

    const roleToken = authToken({ designation: user.designation });

    return res.status(201).json({ accessToken, authToken: roleToken });
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const clientSignup = async (req: Request, res: Response) => {
  const { name, email, phoneNumber, address, companyName, password } = req.body;

  if (!name || !email || !companyName || !password) {
    return res.status(400).json({
      message: 'Name, Email, Company Name, and Password are required.',
    });
  }

  try {
    const existingClient = await prisma.client.findUnique({ where: { email } });
    if (existingClient) {
      return res.status(409).json({ message: 'Client already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const client = await prisma.client.create({
      data: {
        name,
        email,
        phoneNumber: phoneNumber || null,
        address: address || null,
        companyName,
        password: hashedPassword,
      },
    });

    const accessToken = generateToken({
      id: client.id,
      email: client.email,
      designation: 'client',
    });

    const roleToken = authToken({ designation: 'client' });

    return res.status(201).json({ accessToken, authToken: roleToken });
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};