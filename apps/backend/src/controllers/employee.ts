import { initializeAttendance } from '../utils/initializeAttendance';
// Endpoint to initialize dummy attendance for all employees (admin/test only)

export const initialize_dummy_attendance = async (req: any, res: any) => {
  try {
    await initializeAttendance();
    res.status(200).json({ message: 'Dummy attendance initialized for all employees for June-July 2024 and 2025.' });
  } catch (error) {
    res.status(500).json({ message: 'Error initializing dummy attendance', error });
  }
};
import prisma from '../utils/prismaClient';

export const add_test_user = async (req: any, res: any) => {
  try {
    // All required fields must be present
    const employee = await prisma.employee.create({
      data: {
        employeeCode: '1',
        name: 'sarthak',
        designation: 'officer',
        trade: 'software',
        grade: 'high skilled',
        email: 'testuser@example.com', // required and unique
        password: 'testpassword', // required
        dateOfJoining: null,
        dob: null,
        phoneNumber: null,
        address: null,
        aadharNumber: null,
        pan: null,
        bankName: null,
        ifscCode: null,
        accountNumber: null,
        fathersName: null,
        motherName: null,
        marriedStatus: null,
        spouseName: null,
        childrenName: null,
        uanNumber: null,
        gender: null,
        esicNumber: null,
        projectId: null,
        emergencyStatusNo: null,
      },
    });
    return res.status(201).json(employee);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating employee', error });
  }
};

export const get_all_employees = async (req: any, res: any) => {
  try {
    const employees = await prisma.employee.findMany();
    return res.status(200).json(employees);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching employees', error });
  }
};

export const add_new_employee = async (req: any, res: any) => {
  try {
    let {
      employeeCode,
      name,
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
      email,
      password,
    } = req.body;

    // Validate required fields
    if (
      !employeeCode ||
      !name ||
      !designation ||
      !trade ||
      !grade ||
      !email ||
      !password
    ) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Convert empty strings to null for optional fields
    const toNull = (v: any) => (v === '' ? null : v);

    const data = {
      employeeCode,
      name,
      designation,
      trade,
      grade,
      email,
      password,
      dateOfJoining: toNull(dateOfJoining) ? new Date(dateOfJoining) : null,
      dob: toNull(dob) ? new Date(dob) : null,
      phoneNumber: toNull(phoneNumber),
      address: toNull(address),
      aadharNumber: toNull(aadharNumber),
      pan: toNull(pan),
      bankName: toNull(bankName),
      ifscCode: toNull(ifscCode),
      accountNumber: toNull(accountNumber),
      fathersName: toNull(fathersName),
      motherName: toNull(motherName),
      marriedStatus: toNull(marriedStatus),
      spouseName: toNull(spouseName),
      childrenName: toNull(childrenName),
      uanNumber: toNull(uanNumber),
      gender: toNull(gender),
      esicNumber: toNull(esicNumber),
      projectId: toNull(projectId),
      emergencyStatusNo: toNull(emergencyStatusNo),
    };

    const employee = await prisma.employee.create({
      data,
    });

    return res.status(201).json(employee);
  } catch (error) {
    console.error('Error in add_new_employee:', error);
    return res.status(500).json({ message: 'Error creating employee', error });
  }
};

export const mark_attendance = async (req: any, res: any) => {
  const { employeeCode } = req.params;
  const { date, status } = req.body;

  if (!date) {
    return res.status(400).json({ message: 'Date is required.' });
  }

  try {
    // Check if employee exists
    const employee = await prisma.employee.findUnique({
      where: { employeeCode: String(employeeCode) },
    });

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found.' });
    }

    // Normalize date to only the day (ignore time) for uniqueness
    const inputDate = new Date(date);
    const dayStart = new Date(inputDate);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(inputDate);
    dayEnd.setHours(23, 59, 59, 999);

    // Check if attendance already exists for this employee and day
    const existing = await prisma.attendance.findFirst({
      where: {
        employeeCode: String(employeeCode),
        date: {
          gte: dayStart,
          lte: dayEnd,
        },
      },
    });

    let newStatus;

    if (existing) {
      // If status is specified, update it; otherwise, toggle
      if (typeof status === 'undefined' || status === null) {
        // Toggle only if status is not provided
        if (existing.status === 'present') {
          newStatus = 'absent';
        } else if (existing.status === 'absent') {
          newStatus = 'present';
        } else {
          // If status is neither present nor absent, default to 'absent' (to ensure toggle)
          newStatus = 'absent';
        }
      } else {
        newStatus = status;
      }

      // Update the existing record (keep the original date/time)
      const updated = await prisma.attendance.update({
        where: {
          attendance_id: existing.attendance_id,
        },
        data: { status: newStatus },
      });
      return res.status(200).json(updated);
    } else {
      // Create a new attendance record
      newStatus = status ? status : 'present';
      const created = await prisma.attendance.create({
        data: {
          employeeCode: String(employeeCode),
          date: inputDate,
          status: newStatus,
        },
      });
      return res.status(201).json(created);
    }
  } catch (error) {
    console.error('Error in mark_attendance:', error);
    return res.status(500).json({ message: 'Error marking attendance', error });
  }
};

// Get all attendance records between two dates, paginated, optionally filtered by employeeCode
export const getAllAttendance = async (req: any, res: any) => {
  try {
    // Query params: startDate, endDate, page, pageSize
    const { startDate, endDate, page = 1, pageSize = 20 } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({
        message: 'startDate and endDate are required in query params.',
      });
    }

    const skip = (parseInt(page) - 1) * parseInt(pageSize);
    const take = parseInt(pageSize);

    // Build where clause
    const where: any = {
      date: {
        gte: new Date(startDate),
        lte: new Date(endDate),
      },
    };

    // Get total count for pagination
    const total = await prisma.attendance.count({ where });

    // Get paginated attendance records, include employee basic info
    const records = await prisma.attendance.findMany({
      where,
      skip,
      take,
      orderBy: { date: 'desc' },
      include: {
        employee: {
          select: {
            employeeCode: true,
            name: true,
            designation: true,
            grade: true,
          },
        },
      },
    });

    return res.status(200).json({
      total,
      page: parseInt(page),
      pageSize: take,
      records,
    });
  } catch (error) {
    console.error('Error in getAllAttendance:', error);
    return res
      .status(500)
      .json({ message: 'Error fetching attendance records', error });
  }
};
