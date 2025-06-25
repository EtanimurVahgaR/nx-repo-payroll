import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../utils/prismaClient';

const SECRET = process.env.JWT_SECRET || 'supersecretkey';

export const Employee_signup = async (req: Request, res: Response) => {
  console.log('trying to sign up i swear');
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
    // Check if user already exists
    const existingUser = await prisma.employee.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create user
    console.log('trying to add in db');
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
    console.log('added in db');

    // Generate JWT
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET, {
      expiresIn: '1d',
    });
    return res.status(201).json({ token });
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
    // Check if client already exists
    const existingClient = await prisma.client.findUnique({ where: { email } });
    if (existingClient) {
      return res.status(409).json({ message: 'Client already exists' });
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create client
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
    // Generate JWT for the client
    const token = jwt.sign({ id: client.id, email: client.email }, SECRET, {
      expiresIn: '1d',
    });
    return res.status(201).json({ token });
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};
