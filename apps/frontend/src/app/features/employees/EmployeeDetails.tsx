import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Employee {
  id: number;
  email: string;
  password: string;
  employeeCode: string;
  name: string;
  designation: string;
  trade: string;
  grade: string;
  dateOfJoining?: string;
  dob?: string;
  phoneNumber?: string;
  address?: string;
  aadharNumber?: string;
  pan?: string;
  bankName?: string;
  ifscCode?: string;
  accountNumber?: string;
  fathersName?: string;
  motherName?: string;
  marriedStatus?: string;
  spouseName?: string;
  childrenName?: string;
  uanNumber?: string;
  gender?: string;
  esicNumber?: string;
  projectId?: string;
  emergencyStatusNo?: string;
}

const EmployeeDetails = () => {
  const { employeeId } = useParams();
  const [employee, setEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    if (!employeeId) return; // Prevent API call if param is missing
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/employee/${employeeId}`
        );
        setEmployee(response.data);
      } catch (error) {
        console.error('Error fetching employee:', error);
      }
    };
    fetchEmployee();
  }, [employeeId]);

  if (!employee) {
    return <div>Loading...</div>;
  }

  // Adjust the fields below according to your employee schema
  return (
    <div>
      <h2>Employee Details</h2>
      <p>
        <strong>ID:</strong> {employee.id}
      </p>
      <p>
        <strong>Name:</strong> {employee.name}
      </p>
      <p>
        <strong>Email:</strong> {employee.email}
      </p>
      <p>
        <strong>Employee Code:</strong> {employee.employeeCode}
      </p>
      <p>
        <strong>Designation:</strong> {employee.designation}
      </p>
      <p>
        <strong>Trade:</strong> {employee.trade}
      </p>
      <p>
        <strong>Grade:</strong> {employee.grade}
      </p>
      <p>
        <strong>Date of Joining:</strong> {employee.dateOfJoining}
      </p>
      <p>
        <strong>Date of Birth:</strong> {employee.dob}
      </p>
      <p>
        <strong>Phone Number:</strong> {employee.phoneNumber}
      </p>
      <p>
        <strong>Address:</strong> {employee.address}
      </p>
      <p>
        <strong>Aadhar Number:</strong> {employee.aadharNumber}
      </p>
      <p>
        <strong>PAN:</strong> {employee.pan}
      </p>
      <p>
        <strong>Bank Name:</strong> {employee.bankName}
      </p>
      <p>
        <strong>IFSC Code:</strong> {employee.ifscCode}
      </p>
      <p>
        <strong>Account Number:</strong> {employee.accountNumber}
      </p>
      <p>
        <strong>Father's Name:</strong> {employee.fathersName}
      </p>
      <p>
        <strong>Mother's Name:</strong> {employee.motherName}
      </p>
      <p>
        <strong>Married Status:</strong> {employee.marriedStatus}
      </p>
      <p>
        <strong>Spouse Name:</strong> {employee.spouseName}
      </p>
      <p>
        <strong>Children Name:</strong> {employee.childrenName}
      </p>
      <p>
        <strong>UAN Number:</strong> {employee.uanNumber}
      </p>
      <p>
        <strong>Gender:</strong> {employee.gender}
      </p>
      <p>
        <strong>ESIC Number:</strong> {employee.esicNumber}
      </p>
      <p>
        <strong>Project ID:</strong> {employee.projectId}
      </p>
      <p>
        <strong>Emergency Status No:</strong> {employee.emergencyStatusNo}
      </p>
    </div>
  );
};

export default EmployeeDetails;
