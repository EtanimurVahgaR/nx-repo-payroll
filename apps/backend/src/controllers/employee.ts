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
