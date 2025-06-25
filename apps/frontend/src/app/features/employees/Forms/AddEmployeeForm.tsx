import React, { useState } from 'react';
import axios from 'axios';
import { useSidebarContext } from '../../../components/shared/Sidebar/SidebarContext';
import { getToken } from '../../../utils/authUtils';

const AddEmployeeForm = () => {
  const { setLastClickedInOutlet } = useSidebarContext();
  const [form, setForm] = useState({
    employeeCode: '',
    name: '',
    email: '', // Added
    password: '', // Added
    designation: '',
    trade: '',
    grade: '',
    dateOfJoining: '',
    dob: '',
    phoneNumber: '',
    address: '',
    aadharNumber: '',
    pan: '',
    bankName: '',
    ifscCode: '',
    accountNumber: '',
    fathersName: '',
    motherName: '',
    marriedStatus: '',
    spouseName: '',
    childrenName: '',
    uanNumber: '',
    gender: '',
    esicNumber: '',
    projectId: '',
    emergencyStatusNo: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    try {
      const token = getToken();
      const res = await axios.post(
        // TODO: create a new signup for employees
        'http://localhost:8080/api/auth/Employee_signup',
        form,
        {
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );
      if (res.status === 201) {
        setMessage('Employee added successfully!');
        setForm({
          employeeCode: '',
          name: '',
          email: '', // Reset
          password: '', // Reset
          designation: '',
          trade: '',
          grade: '',
          dateOfJoining: '',
          dob: '',
          phoneNumber: '',
          address: '',
          aadharNumber: '',
          pan: '',
          bankName: '',
          ifscCode: '',
          accountNumber: '',
          fathersName: '',
          motherName: '',
          marriedStatus: '',
          spouseName: '',
          childrenName: '',
          uanNumber: '',
          gender: '',
          esicNumber: '',
          projectId: '',
          emergencyStatusNo: '',
        });
      } else {
        setMessage('Failed to add employee.');
      }
    } catch {
      setMessage('Error connecting to server.');
    }
  };

  // Add a handler for input focus
  const handleInputFocus = () => {
    setLastClickedInOutlet(true);
  };

  return (
    <div className="max-w-4xl mx-auto ">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Add New Employee
      </h1>
      {/* <hr className=" border-black" /> */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-bg-LIGHTEST p-4 rounded-md">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Basic Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="employeeCode"
              placeholder="Employee Code"
              value={form.employeeCode}
              onChange={handleChange}
              onFocus={handleInputFocus}
              className="input-field"
              required
            />
            <input
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              onFocus={handleInputFocus}
              className="input-field"
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              onFocus={handleInputFocus}
              className="input-field"
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              onFocus={handleInputFocus}
              className="input-field"
              required
            />
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              onFocus={handleInputFocus}
              className="input-field"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <input
              name="dob"
              type="date"
              placeholder="Date of Birth"
              value={form.dob}
              onChange={handleChange}
              onFocus={handleInputFocus}
              className="input-field"
            />
          </div>
        </div>

        {/* Professional Details */}
        <div className="bg-bg-LIGHTEST p-4 rounded-md">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Professional Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="designation"
              placeholder="Designation"
              value={form.designation}
              onChange={handleChange}
              onFocus={handleInputFocus}
              className="input-field"
              required
            />
            <input
              name="trade"
              placeholder="Trade"
              value={form.trade}
              onChange={handleChange}
              onFocus={handleInputFocus}
              className="input-field"
            />
            <input
              name="grade"
              placeholder="Grade"
              value={form.grade}
              onChange={handleChange}
              onFocus={handleInputFocus}
              className="input-field"
            />
            <input
              name="dateOfJoining"
              type="date"
              placeholder="Date of Joining"
              value={form.dateOfJoining}
              onChange={handleChange}
              onFocus={handleInputFocus}
              className="input-field"
            />
            <input
              name="projectId"
              placeholder="Project ID"
              value={form.projectId}
              onChange={handleChange}
              onFocus={handleInputFocus}
              className="input-field"
            />
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-bg-LIGHTEST p-4 rounded-md">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Contact Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="phoneNumber"
              placeholder="Phone Number"
              value={form.phoneNumber}
              onChange={handleChange}
              onFocus={handleInputFocus}
              className="input-field"
            />
            <input
              name="emergencyStatusNo"
              placeholder="Emergency Contact"
              value={form.emergencyStatusNo}
              onChange={handleChange}
              onFocus={handleInputFocus}
              className="input-field"
            />
            <textarea
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
              onFocus={handleInputFocus}
              className="input-field col-span-2"
              rows={3}
            />
          </div>
        </div>

        {/* Family Information */}
        <div className="bg-bg-LIGHTEST p-4 rounded-md">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Family Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="fathersName"
              placeholder="Father's Name"
              value={form.fathersName}
              onChange={handleChange}
              onFocus={handleInputFocus}
              className="input-field"
            />
            <input
              name="motherName"
              placeholder="Mother's Name"
              value={form.motherName}
              onChange={handleChange}
              onFocus={handleInputFocus}
              className="input-field"
            />
            <select
              name="marriedStatus"
              value={form.marriedStatus}
              onChange={handleChange}
              onFocus={handleInputFocus}
              className="input-field"
            >
              <option value="">Marital Status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
            </select>
            <input
              name="spouseName"
              placeholder="Spouse Name"
              value={form.spouseName}
              onChange={handleChange}
              onFocus={handleInputFocus}
              className="input-field"
            />
            <input
              name="childrenName"
              placeholder="Children Names"
              value={form.childrenName}
              onChange={handleChange}
              onFocus={handleInputFocus}
              className="input-field"
            />
          </div>
        </div>

        {/* Documents & Banking */}
        <div className="bg-bg-LIGHTEST p-4 rounded-md">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Documents & Banking
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="aadharNumber"
              placeholder="Aadhar Number"
              value={form.aadharNumber}
              onChange={handleChange}
              onFocus={handleInputFocus}
              className="input-field"
            />
            <input
              name="pan"
              placeholder="PAN Number"
              value={form.pan}
              onChange={handleChange}
              onFocus={handleInputFocus}
              className="input-field"
            />
            <input
              name="uanNumber"
              placeholder="UAN Number"
              value={form.uanNumber}
              onChange={handleChange}
              onFocus={handleInputFocus}
              className="input-field"
            />
            <input
              name="esicNumber"
              placeholder="ESIC Number"
              value={form.esicNumber}
              onChange={handleChange}
              onFocus={handleInputFocus}
              className="input-field"
            />
            <input
              name="bankName"
              placeholder="Bank Name"
              value={form.bankName}
              onChange={handleChange}
              onFocus={handleInputFocus}
              className="input-field"
            />
            <input
              name="ifscCode"
              placeholder="IFSC Code"
              value={form.ifscCode}
              onChange={handleChange}
              onFocus={handleInputFocus}
              className="input-field"
            />
            <input
              name="accountNumber"
              placeholder="Account Number"
              value={form.accountNumber}
              onChange={handleChange}
              onFocus={handleInputFocus}
              className="input-field"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          Add Employee
        </button>
      </form>
      {message && (
        <p
          className={`mt-4 text-center ${
            message.includes('Error') ? 'text-red-600' : 'text-green-600'
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default AddEmployeeForm;
