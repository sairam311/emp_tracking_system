import React, { useState } from "react";
import { Plus, Search, Filter, Eye, Edit, Trash2, X } from "lucide-react";
export const employees = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@company.com',
    department: 'Engineering',
    position: 'Senior Developer',
    joinDate: '2023-01-15',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    status: 'active',
    leavesAvailable: 18
  },
  {
    id: 2,
    name: 'Sarah Wilson',
    email: 'sarah.wilson@company.com',
    department: 'Marketing',
    position: 'Marketing Manager',
    joinDate: '2022-08-20',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    status: 'active',
    leavesAvailable: 22
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike.johnson@company.com',
    department: 'Sales',
    position: 'Sales Representative',
    joinDate: '2023-05-10',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    status: 'active',
    leavesAvailable: 15
  },
  {
    id: 4,
    name: 'Emily Davis',
    email: 'emily.davis@company.com',
    department: 'HR',
    position: 'HR Specialist',
    joinDate: '2022-12-01',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    status: 'active',
    leavesAvailable: 12
  }
];
const EmployeeList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h2 className="text-xl lg:text-2xl font-bold text-gray-800">Employees</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 text-sm lg:text-base">
          <Plus className="w-4 h-4" />
          <span>Add Employee</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 lg:w-5 lg:h-5 absolute left-3 top-2.5 lg:top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search employees..."
            className="w-full pl-8 lg:pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm lg:text-base"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center space-x-2 text-sm lg:text-base">
          <Filter className="w-4 h-4" />
          <span>Filter</span>
        </button>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {filteredEmployees.map(employee => (
          <div
            key={employee.id}
            className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:ring-2 hover:ring-blue-300"
            onClick={() => setSelectedEmployee(employee)}
          >
            <div className="flex items-center space-x-3 mb-3">
              <img src={employee.avatar} alt={employee.name} className="w-12 h-12 rounded-full" />
              <div className="min-w-0 flex-1">
                <div className="text-base font-medium text-gray-900 truncate">{employee.name}</div>
                <div className="text-sm text-gray-500 truncate">{employee.email}</div>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Position:</span>
                <span className="text-gray-900">{employee.position}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Join Date:</span>
                <span className="text-gray-900">{employee.joinDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Leaves Available:</span>
                <span className="text-gray-900">{employee.leavesAvailable} days</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leaves Available</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEmployees.map(employee => (
                <tr
                  key={employee.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedEmployee(employee)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img src={employee.avatar} alt={employee.name} className="w-10 h-10 rounded-full mr-3" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                        <div className="text-sm text-gray-500">{employee.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.position}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.joinDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.leavesAvailable} days</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Employee Details Modal */}
      {selectedEmployee && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              onClick={() => setSelectedEmployee(null)}
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-4 mb-4">
              <img src={selectedEmployee.avatar} alt={selectedEmployee.name} className="w-16 h-16 rounded-full" />
              <div>
                <h3 className="text-lg font-bold text-gray-800">{selectedEmployee.name}</h3>
                <p className="text-sm text-gray-500">{selectedEmployee.email}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Position:</span>
                <span className="text-gray-900">{selectedEmployee.position}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Join Date:</span>
                <span className="text-gray-900">{selectedEmployee.joinDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Leaves Available:</span>
                <span className="text-gray-900">{selectedEmployee.leavesAvailable} days</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
