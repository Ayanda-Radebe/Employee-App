import React, { useState, useEffect } from 'react';
import './EmployeePortal.css';

const EmployeePortal = () => {
  const [employees, updateEmployees] = useState(() => {
    const storedEmployees = localStorage.getItem('employees');
    return storedEmployees ? JSON.parse(storedEmployees) : [];
  });

  const [newEmployee, setNewEmployee] = useState({
    name: '',
    surname: '',
    email: '',
    position: '',
    department: '',
    phone: '',
    image: '',
    startDate: '',
  });

  const [editingEmployee, setEditingEmployee] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');

  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  const handleAddEmployee = (e) => {
    e.preventDefault(); // Prevent form from reloading the page
    if (editingEmployee) {
      handleUpdateEmployee({ ...editingEmployee, ...newEmployee });
    } else {
      updateEmployees((prevEmployees) => [...prevEmployees, { ...newEmployee, email: newEmployee.email.trim() }]);
    }
    setNewEmployee({
      name: '',
      surname: '',
      email: '',
      position: '',
      department: '',
      phone: '',
      image: '',
      startDate: '',
    });
    setEditingEmployee(null);
  };

  const handleUpdateEmployee = (updatedEmployee) => {
    updateEmployees((prevEmployees) =>
      prevEmployees.map((employee) =>
        employee.email === updatedEmployee.email ? updatedEmployee : employee
      )
    );
    setEditingEmployee(null);
  };

  const handleDeleteEmployee = (email) => {
    updateEmployees((prevEmployees) =>
      prevEmployees.filter((employee) => employee.email !== email)
    );
  };

  const handleEditEmployee = (employee) => {
    setNewEmployee(employee);
    setEditingEmployee(employee);
  };

  const filteredEmployees = employees
    .filter((employee) => {
      // Filter by search query
      return (
        employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.surname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    })
    .filter((employee) => {
      // Filter by department
      return selectedDepartment === '' || employee.department === selectedDepartment;
    });

  return (
    <div>
      <h1>Welcome to the Employee Portal</h1>
      <h2>{editingEmployee ? 'Edit Employee' : 'Add New Employee'}</h2>
      <form onSubmit={handleAddEmployee}>
        <input
          type="text"
          placeholder="Name"
          value={newEmployee.name}
          onChange={(e) =>
            setNewEmployee((prevEmployee) => ({ ...prevEmployee, name: e.target.value }))
          }
        />
        <input
          type="text"
          placeholder="Surname"
          value={newEmployee.surname}
          onChange={(e) =>
            setNewEmployee((prevEmployee) => ({ ...prevEmployee, surname: e.target.value }))
          }
        />
        <input
          type="email"
          placeholder="Email"
          value={newEmployee.email}
          onChange={(e) =>
            setNewEmployee((prevEmployee) => ({ ...prevEmployee, email: e.target.value }))
          }
        />
        <input
          type="text"
          placeholder="Position"
          value={newEmployee.position}
          onChange={(e) =>
            setNewEmployee((prevEmployee) => ({ ...prevEmployee, position: e.target.value }))
          }
        />
        <input
          type="text"
          placeholder="Department"
          value={newEmployee.department}
          onChange={(e) =>
            setNewEmployee((prevEmployee) => ({ ...prevEmployee, department: e.target.value }))
          }
        />
        <input
          type="tel"
          placeholder="Phone"
          value={newEmployee.phone}
          onChange={(e) =>
            setNewEmployee((prevEmployee) => ({ ...prevEmployee, phone: e.target.value }))
          }
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newEmployee.image}
          onChange={(e) =>
            setNewEmployee((prevEmployee) => ({ ...prevEmployee, image: e.target.value }))
          }
        />
        <input
          type="date"
          placeholder="Start Date"
          value={newEmployee.startDate}
          onChange={(e) =>
            setNewEmployee((prevEmployee) => ({ ...prevEmployee, startDate: e.target.value }))
          }
        />
        <button type="submit">{editingEmployee ? 'Update Employee' : 'Add Employee'}</button>
      </form>
      <h2>Employee List</h2>
      <input
        type="search"
        placeholder="Search by name, surname, or email"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <select
        value={selectedDepartment}
        onChange={(e) => setSelectedDepartment(e.target.value)}
      >
        <option value="">All Departments</option>
        <option value="Sales">Sales</option>
        <option value="Marketing">Marketing</option>
        <option value="IT">IT</option>
      </select>
      <ul>
        {filteredEmployees.map((employee) => (
          <li key={employee.email}>
            <img src={employee.image} alt={employee.name} />
            <h3>
              {employee.name} {employee.surname}
            </h3>
            <p>Position: {employee.position}</p>
            <p>Department: {employee.department}</p>
            <p>Phone: {employee.phone}</p>
            <p>Start Date: {employee.startDate}</p>
            <button onClick={() => handleEditEmployee(employee)}>Edit</button>
            <button onClick={() => handleDeleteEmployee(employee.email)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeePortal;
