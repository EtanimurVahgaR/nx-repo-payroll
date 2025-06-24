import React, { useState } from 'react';

const Dashboard = () => {
  // State to hold employee data
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEmployees = async () => {
    setLoading(true);
    setError(null);
    try {
      const axios = (await import('axios')).default;
      const response = await axios.get(
        'http://localhost:8080/api/employee/all'
      );
      setEmployees(response.data);
    } catch (error: any) {
      setError('Error fetching employees');
      console.error('Error fetching employees:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      Dashboard
      <button onClick={fetchEmployees} disabled={loading}>
        {loading ? 'Fetching...' : 'Fetch Employees'}
      </button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {employees.length > 0 && (
        <table border={1} cellPadding={8} style={{ marginTop: 16 }}>
          <thead>
            <tr>
              {/* Adjust columns as per your employee object structure */}
              {Object.keys(employees[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, idx) => (
              <tr key={emp.id || idx}>
                {Object.values(emp).map((val, i) => (
                  <td key={i}>{String(val)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Dashboard;
