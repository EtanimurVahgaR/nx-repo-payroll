import prisma from '../utils/prismaClient';

export const add_test_user = async (req: any, res: any) => {
  try {
    const employee = await prisma.employee.create({
      data: {
        employeeCode: '1',
        name: 'sarthak',
        designation: 'officer',
        trade: 'software',
        grade: 'high skilled',
        // Add other fields as needed, using null or default values for optional fields
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
    } = req.body;

    // Convert empty strings to null for optional fields
    const toNull = (v: any) => (v === '' ? null : v);

    const data = {
      employeeCode,
      name,
      designation,
      trade,
      grade,
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
