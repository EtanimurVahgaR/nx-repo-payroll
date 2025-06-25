import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getToken } from '../../utils/authUtils';

interface EmployeeType {
  id: number;
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

const employeeFields: { key: keyof EmployeeType; label: string }[] = [
  { key: 'employeeCode', label: 'Employee Code' },
  { key: 'name', label: 'Name' },
  { key: 'designation', label: 'Designation' },
  { key: 'trade', label: 'Trade' },
  { key: 'grade', label: 'Grade' },
  { key: 'dateOfJoining', label: 'Date Of Joining' },
  { key: 'dob', label: 'DOB' },
  { key: 'phoneNumber', label: 'Phone Number' },
  { key: 'address', label: 'Address' },
  { key: 'aadharNumber', label: 'Aadhar Number' },
  { key: 'pan', label: 'PAN' },
  { key: 'bankName', label: 'Bank Name' },
  { key: 'ifscCode', label: 'IFSC Code' },
  { key: 'accountNumber', label: 'Account Number' },
  { key: 'fathersName', label: "Father's Name" },
  { key: 'motherName', label: "Mother's Name" },
  { key: 'marriedStatus', label: 'Married Status' },
  { key: 'spouseName', label: 'Spouse Name' },
  { key: 'childrenName', label: 'Children Name' },
  { key: 'uanNumber', label: 'UAN Number' },
  { key: 'gender', label: 'Gender' },
  { key: 'esicNumber', label: 'ESIC Number' },
  { key: 'projectId', label: 'Project ID' },
  { key: 'emergencyStatusNo', label: 'Emergency Status No' },
];

const Employee = () => {
  const [employees, setEmployees] = useState<EmployeeType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{
    key: keyof EmployeeType;
    direction: 'asc' | 'desc';
  }>({ key: 'name', direction: 'asc' });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const token = getToken();
      const response = await fetch('http://localhost:8080/api/employee/all', {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      });
      if (!response.ok) throw new Error('Failed to fetch employees');
      const data = await response.json();
      setEmployees(data);
    } catch (err) {
      setError('Failed to load employees');
    } finally {
      setLoading(false);
    }
  };

  const sortData = (key: keyof EmployeeType) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === 'asc'
          ? 'desc'
          : 'asc',
    });
  };

  const getSortedEmployees = () => {
    const filtered = employees.filter(
      (emp) =>
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.employeeCode.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filtered.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue === undefined || bValue === undefined) return 0;
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  if (error) return <div className="text-center text-red-600 p-4">{error}</div>;

  return (
    <div className="p-3 pt-0">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Employees</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search employees..."
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="absolute right-3 top-2.5 text-gray-400">🔍</span>
          </div>
          <Link
            to="/employees/add-new"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Add Employee
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {employeeFields.map(({ key, label }) => (
                <th
                  key={key}
                  onClick={() => sortData(key)}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                >
                  <div className="flex items-center space-x-1">
                    <span>{label}</span>
                    {sortConfig.key === key && (
                      <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
              ))}
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {getSortedEmployees().map((employee) => (
              <tr
                key={employee.id}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                {employeeFields.map(({ key }) => (
                  <td
                    key={key}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                  >
                    {key === 'dateOfJoining' || key === 'dob'
                      ? employee[key]
                        ? new Date(employee[key] as string).toLocaleDateString()
                        : 'N/A'
                      : employee[key] || 'N/A'}
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900">
                    View
                  </button>
                  <button className="ml-4 text-blue-600 hover:text-blue-900">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {getSortedEmployees().length === 0 && (
        <div className="text-center text-gray-500 py-8">
          No employees found matching your search.
        </div>
      )}
    </div>
  );
};

export default Employee;
