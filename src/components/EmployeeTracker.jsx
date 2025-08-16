import React, { useState, useEffect } from 'react';
import { Users, Calendar, Clock, TrendingUp, UserCheck, UserX, Plus, Search, Filter, Eye, Edit, Trash2, Menu, X, LogOut, MessageSquare, Monitor, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

// Mock Data
const mockEmployees = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@company.com',
    department: 'Engineering',
    position: 'Senior Developer',
    joinDate: '2023-01-15',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    status: 'active',
    leavesAvailable: 18,
    phone: '+1 (555) 123-4567',
    bloodGroup: 'O+',
    employeeId: 'EMP001'
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
    leavesAvailable: 22,
    phone: '+1 (555) 234-5678',
    bloodGroup: 'A+',
    employeeId: 'EMP002'
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
    leavesAvailable: 15,
    phone: '+1 (555) 345-6789',
    bloodGroup: 'B+',
    employeeId: 'EMP003'
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
    leavesAvailable: 12,
    phone: '+1 (555) 456-7890',
    bloodGroup: 'AB+',
    employeeId: 'EMP004'
  }
];

const mockAttendance = [
  { id: 1, employeeId: 1, date: '2024-08-10', checkIn: '09:00', checkOut: '17:30', status: 'present' },
  { id: 2, employeeId: 2, date: '2024-08-10', checkIn: '08:45', checkOut: '17:15', status: 'present' },
  { id: 3, employeeId: 3, date: '2024-08-10', checkIn: '09:15', checkOut: '18:00', status: 'late' },
  { id: 4, employeeId: 4, date: '2024-08-10', checkIn: '', checkOut: '', status: 'absent' },
  { id: 5, employeeId: 1, date: '2024-08-09', checkIn: '08:55', checkOut: '17:25', status: 'present' },
  { id: 6, employeeId: 2, date: '2024-08-09', checkIn: '09:30', checkOut: '17:00', status: 'late' },
];

const mockLeaves = [
  { 
    id: 1, 
    employeeId: 1, 
    type: 'Annual', 
    startDate: '2024-08-15', 
    endDate: '2024-08-17', 
    days: 3, 
    status: 'approved', 
    reason: 'Family vacation',
    appliedDate: '2024-08-01',
    approvedDate: '2024-08-02'
  },
  { 
    id: 2, 
    employeeId: 2, 
    type: 'Sick', 
    startDate: '2024-08-12', 
    endDate: '2024-08-12', 
    days: 1, 
    status: 'pending', 
    reason: 'Medical appointment',
    appliedDate: '2024-08-10'
  },
  { 
    id: 3, 
    employeeId: 3, 
    type: 'Personal', 
    startDate: '2024-08-20', 
    endDate: '2024-08-22', 
    days: 3, 
    status: 'rejected', 
    reason: 'Personal matters',
    appliedDate: '2024-08-15',
    rejectedDate: '2024-08-16',
    rejectionReason: 'Busy project timeline, cannot spare resources'
  },
  { 
    id: 4, 
    employeeId: 4, 
    type: 'Annual', 
    startDate: '2024-08-10', 
    endDate: '2024-08-10', 
    days: 1, 
    status: 'pending', 
    reason: 'Personal appointment',
    appliedDate: '2024-08-08'
  },
];

const mockFeedbacks = [
  {
    id: 1,
    employeeId: 1,
    employeeName: 'John Doe',
    employeeAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    subject: 'Great Work Environment',
    message: 'I really appreciate the collaborative atmosphere in our team. The support from colleagues has been outstanding, and I feel motivated to contribute my best work every day.',
    category: 'workplace',
    priority: 'medium',
    date: '2024-08-10',
    status: 'pending',
    response: null
  },
  {
    id: 2,
    employeeId: 2,
    employeeName: 'Sarah Wilson',
    employeeAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    subject: 'Suggestion for Better Coffee',
    message: 'Would it be possible to get better quality coffee in the break room? The current coffee is quite bitter and many employees have mentioned this. Perhaps we could consider a different brand or a coffee machine upgrade.',
    category: 'facilities',
    priority: 'low',
    date: '2024-08-09',
    status: 'reviewed',
    response: 'Thank you for the suggestion! We have ordered a new coffee machine and premium coffee beans. They should be installed by next week.'
  },
  {
    id: 3,
    employeeId: 3,
    employeeName: 'Mike Johnson',
    employeeAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    subject: 'Request for Additional Training',
    message: 'I would like to request additional training in digital marketing tools and analytics. This would help me perform better in my role and contribute more effectively to our sales targets.',
    category: 'general',
    priority: 'high',
    date: '2024-08-08',
    status: 'in_progress',
    response: null
  },
  {
    id: 4,
    employeeId: 4,
    employeeName: 'Emily Davis',
    employeeAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    subject: 'Appreciation for Management Support',
    message: 'I wanted to express my gratitude for the excellent support provided during my recent project. The management team was very understanding and provided all necessary resources.',
    category: 'management',
    priority: 'medium',
    date: '2024-08-07',
    status: 'reviewed',
    response: 'Thank you for your kind words! We are glad we could support you. Keep up the excellent work!'
  },
  {
    id: 5,
    employeeId: 1,
    employeeName: 'John Doe',
    employeeAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    subject: 'Flexible Working Hours Request',
    message: 'I would like to discuss the possibility of flexible working hours. Due to my commute, arriving 30 minutes later and leaving 30 minutes later would significantly improve my work-life balance.',
    category: 'benefits',
    priority: 'medium',
    date: '2024-08-06',
    status: 'pending',
    response: null
  }
];

const mockWFHRequests = [
  {
    id: 1,
    employeeId: 1,
    employeeName: 'John Doe',
    employeeAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    date: '2024-08-20',
    reason: 'Avoid traffic congestion',
    description: 'Working from home to avoid heavy traffic due to road construction',
    status: 'pending',
    appliedDate: '2024-08-15',
    rejectionReason: null
  },
  {
    id: 2,
    employeeId: 2,
    employeeName: 'Sarah Wilson',
    employeeAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    date: '2024-08-25',
    reason: 'Home maintenance',
    description: 'Need to be present for scheduled home repairs',
    status: 'approved',
    appliedDate: '2024-08-20',
    approvedDate: '2024-08-21',
    rejectionReason: null
  },
  {
    id: 3,
    employeeId: 3,
    employeeName: 'Mike Johnson',
    employeeAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    date: '2024-07-30',
    reason: 'Personal appointment',
    description: 'Medical appointment that requires work from home',
    status: 'rejected',
    appliedDate: '2024-07-25',
    rejectedDate: '2024-07-26',
    rejectionReason: 'Important client meeting scheduled in office'
  },
  {
    id: 4,
    employeeId: 4,
    employeeName: 'Emily Davis',
    employeeAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    date: '2024-08-18',
    reason: 'Child care',
    description: 'Need to care for sick child',
    status: 'pending',
    appliedDate: '2024-08-16',
    rejectionReason: null
  }
];

const EmployeeTracker = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [employees, setEmployees] = useState(mockEmployees);
  const [attendance, setAttendance] = useState(mockAttendance);
  const [leaves, setLeaves] = useState(mockLeaves);
  const [feedbacks, setFeedbacks] = useState(mockFeedbacks);
  const [wfhRequests, setWfhRequests] = useState(mockWFHRequests);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [showViewEmployeeModal, setShowViewEmployeeModal] = useState(false);
  const [showEditEmployeeModal, setShowEditEmployeeModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showFeedbackResponseModal, setShowFeedbackResponseModal] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [feedbackResponse, setFeedbackResponse] = useState('');
  const [showWFHRejectModal, setShowWFHRejectModal] = useState(false);
  const [selectedWFHRequest, setSelectedWFHRequest] = useState(null);
  const [wfhRejectionReason, setWfhRejectionReason] = useState('');
  const [showLeaveRejectModal, setShowLeaveRejectModal] = useState(false);
  const [selectedLeaveRequest, setSelectedLeaveRequest] = useState(null);
  const [leaveRejectionReason, setLeaveRejectionReason] = useState('');
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    email: '',
    department: '',
    position: '',
    joinDate: '',
    phone: '',
    bloodGroup: '',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
  });

  // Get unique positions for filter dropdown
  const uniquePositions = [...new Set(employees.map(emp => emp.position))].sort();

  // Filter employees based on search term and selected position
  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPosition = !selectedPosition || emp.position === selectedPosition;
    return matchesSearch && matchesPosition;
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showFilterDropdown && !event.target.closest('.relative')) {
        setShowFilterDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showFilterDropdown]);

  const handleLogout = () => {
    logout();
  };

  const handleLeaveAction = (leaveId, action, rejectionReason = null) => {
    setLeaves(prevLeaves => 
      prevLeaves.map(leave => 
        leave.id === leaveId 
          ? { 
              ...leave, 
              status: action,
              ...(action === 'approved' && { approvedDate: new Date().toISOString().split('T')[0] }),
              ...(action === 'rejected' && { 
                rejectedDate: new Date().toISOString().split('T')[0],
                rejectionReason 
              })
            }
          : leave
      )
    );
  };

  const handleLeaveReject = (leave) => {
    setSelectedLeaveRequest(leave);
    setShowLeaveRejectModal(true);
  };

  const submitLeaveRejection = () => {
    handleLeaveAction(selectedLeaveRequest.id, 'rejected', leaveRejectionReason);
    setShowLeaveRejectModal(false);
    setSelectedLeaveRequest(null);
    setLeaveRejectionReason('');
  };

  const handleAddEmployee = () => {
    const employee = {
      id: employees.length + 1,
      ...newEmployee,
      status: 'active',
      leavesAvailable: 25,
      employeeId: `EMP${String(employees.length + 1).padStart(3, '0')}`
    };
    setEmployees([...employees, employee]);
    setNewEmployee({
      name: '',
      email: '',
      department: '',
      position: '',
      joinDate: '',
      phone: '',
      bloodGroup: '',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    });
    setShowAddEmployeeModal(false);
  };

  const handleViewEmployee = (employee) => {
    setSelectedEmployee(employee);
    setShowViewEmployeeModal(true);
  };

  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);
    setNewEmployee({ ...employee });
    setShowEditEmployeeModal(true);
  };

  const handleUpdateEmployee = () => {
    setEmployees(employees.map(emp => 
      emp.id === selectedEmployee.id ? { ...newEmployee } : emp
    ));
    setShowEditEmployeeModal(false);
    setSelectedEmployee(null);
    setNewEmployee({
      name: '',
      email: '',
      department: '',
      position: '',
      joinDate: '',
      phone: '',
      bloodGroup: '',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    });
  };

  const handleDeleteEmployee = (employee) => {
    setSelectedEmployee(employee);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteEmployee = () => {
    setEmployees(employees.filter(emp => emp.id !== selectedEmployee.id));
    setShowDeleteConfirm(false);
    setSelectedEmployee(null);
  };

  const handleFeedbackStatusUpdate = (feedbackId, newStatus) => {
    setFeedbacks(feedbacks.map(feedback => 
      feedback.id === feedbackId ? { ...feedback, status: newStatus } : feedback
    ));
  };

  const handleRespondToFeedback = (feedback) => {
    setSelectedFeedback(feedback);
    setFeedbackResponse(feedback.response || '');
    setShowFeedbackResponseModal(true);
  };

  const submitFeedbackResponse = () => {
    setFeedbacks(feedbacks.map(feedback => 
      feedback.id === selectedFeedback.id 
        ? { ...feedback, status: 'reviewed', response: feedbackResponse }
        : feedback
    ));
    setShowFeedbackResponseModal(false);
    setSelectedFeedback(null);
    setFeedbackResponse('');
  };

  const handleWFHAction = (wfhId, action, rejectionReason = null) => {
    setWfhRequests(prevRequests => 
      prevRequests.map(request => 
        request.id === wfhId 
          ? { 
              ...request, 
              status: action,
              ...(action === 'approved' && { approvedDate: new Date().toISOString().split('T')[0] }),
              ...(action === 'rejected' && { 
                rejectedDate: new Date().toISOString().split('T')[0],
                rejectionReason 
              })
            }
          : request
      )
    );
  };

  const handleWFHReject = (request) => {
    setSelectedWFHRequest(request);
    setShowWFHRejectModal(true);
  };

  const submitWFHRejection = () => {
    handleWFHAction(selectedWFHRequest.id, 'rejected', wfhRejectionReason);
    setShowWFHRejectModal(false);
    setSelectedWFHRequest(null);
    setWfhRejectionReason('');
  };

  // Dashboard Stats
  const totalEmployees = employees.length;
  const presentToday = attendance.filter(a => a.date === '2024-08-10' && a.status === 'present').length;
  const onLeaveToday = leaves.filter(l => {
    const today = '2024-08-10';
    return l.status === 'approved' && today >= l.startDate && today <= l.endDate;
  }).length;
  const pendingLeaves = leaves.filter(l => l.status === 'pending').length;

  const Dashboard = () => (
    <div className="space-y-4 lg:space-y-6">
      <h2 className="text-xl lg:text-2xl font-bold text-gray-800">Dashboard</h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <div className="bg-white rounded-lg shadow-md p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs lg:text-sm text-gray-600">Total Employees</p>
              <p className="text-2xl lg:text-3xl font-bold text-gray-800">{totalEmployees}</p>
            </div>
            <Users className="w-8 h-8 lg:w-12 lg:h-12 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs lg:text-sm text-gray-600">Present Today</p>
              <p className="text-2xl lg:text-3xl font-bold text-green-600">{presentToday}</p>
            </div>
            <UserCheck className="w-8 h-8 lg:w-12 lg:h-12 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs lg:text-sm text-gray-600">On Leave Today</p>
              <p className="text-2xl lg:text-3xl font-bold text-orange-600">{onLeaveToday}</p>
            </div>
            <UserX className="w-8 h-8 lg:w-12 lg:h-12 text-orange-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs lg:text-sm text-gray-600">Pending Leaves</p>
              <p className="text-2xl lg:text-3xl font-bold text-yellow-600">{pendingLeaves}</p>
            </div>
            <Calendar className="w-8 h-8 lg:w-12 lg:h-12 text-yellow-500" />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
        <div className="bg-white rounded-lg shadow-md p-4 lg:p-6">
          <h3 className="text-base lg:text-lg font-semibold mb-4">Today's Attendance</h3>
          <div className="space-y-3">
            {attendance.filter(a => a.date === '2024-08-10').map(record => {
              const employee = employees.find(e => e.id === record.employeeId);
              return (
                <div key={record.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                  <div className="flex items-center space-x-2 lg:space-x-3 min-w-0 flex-1">
                    <img src={employee?.avatar} alt={employee?.name} className="w-6 h-6 lg:w-8 lg:h-8 rounded-full flex-shrink-0" />
                    <span className="font-medium text-sm lg:text-base truncate">{employee?.name}</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ${
                    record.status === 'present' ? 'bg-green-100 text-green-800' :
                    record.status === 'late' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {record.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 lg:p-6">
          <h3 className="text-base lg:text-lg font-semibold mb-4">Recent Leave Requests</h3>
          <div className="space-y-3">
            {leaves.slice(0, 4).map(leave => {
              const employee = employees.find(e => e.id === leave.employeeId);
              return (
                <div key={leave.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-sm lg:text-base truncate">{employee?.name}</div>
                    <div className="text-xs lg:text-sm text-gray-600">{leave.type} - {leave.days} days</div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ml-2 ${
                    leave.status === 'approved' ? 'bg-green-100 text-green-800' : 
                    leave.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {leave.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  const EmployeeList = () => (
    <div className="space-y-4 lg:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h2 className="text-xl lg:text-2xl font-bold text-gray-800">Employees</h2>
        <button 
          onClick={() => setShowAddEmployeeModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 text-sm lg:text-base"
        >
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
        <div className="relative">
          <button 
            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center space-x-2 text-sm lg:text-base"
          >
            <Filter className="w-4 h-4" />
            <span>Filter</span>
            {selectedPosition && <span className="ml-1 w-2 h-2 bg-blue-500 rounded-full"></span>}
          </button>
          {showFilterDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              <div className="p-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Position</label>
                <select
                  value={selectedPosition}
                  onChange={(e) => {
                    setSelectedPosition(e.target.value);
                    setShowFilterDropdown(false);
                  }}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Positions</option>
                  {uniquePositions.map(position => (
                    <option key={position} value={position}>{position}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {filteredEmployees.map(employee => (
          <div key={employee.id} className="bg-white rounded-lg shadow-md p-4">
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
            <div className="flex justify-end space-x-3 mt-4 pt-3 border-t">
              <button 
                onClick={() => handleViewEmployee(employee)}
                className="text-blue-600 hover:text-blue-900 p-1"
                title="View Employee"
              >
                <Eye className="w-4 h-4" />
              </button>
              <button 
                onClick={() => handleEditEmployee(employee)}
                className="text-green-600 hover:text-green-900 p-1"
                title="Edit Employee"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button 
                onClick={() => handleDeleteEmployee(employee)}
                className="text-red-600 hover:text-red-900 p-1"
                title="Delete Employee"
              >
                <Trash2 className="w-4 h-4" />
              </button>
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
                <tr key={employee.id} className="hover:bg-gray-50">
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
                      <button 
                        onClick={() => handleViewEmployee(employee)}
                        className="text-blue-600 hover:text-blue-900"
                        title="View Employee"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleEditEmployee(employee)}
                        className="text-green-600 hover:text-green-900"
                        title="Edit Employee"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteEmployee(employee)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete Employee"
                      >
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
    </div>
  );

  const AttendanceView = () => (
    <div className="space-y-4 lg:space-y-6">
      <h2 className="text-xl lg:text-2xl font-bold text-gray-800">Attendance</h2>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-4 lg:px-6 py-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
            <h3 className="text-base lg:text-lg font-medium">Attendance Records</h3>
            <div className="flex flex-col sm:flex-row gap-2">
              <input type="date" className="border border-gray-300 rounded px-3 py-1 text-sm" defaultValue="2024-08-10" />
              <button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 text-sm">Filter</button>
            </div>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden">
          {attendance.map(record => {
            const employee = employees.find(e => e.id === record.employeeId);
            const hours = record.checkIn && record.checkOut ? 
              ((new Date(`2024-08-10 ${record.checkOut}`) - new Date(`2024-08-10 ${record.checkIn}`)) / (1000 * 60 * 60)).toFixed(1) 
              : '0';
            
            return (
              <div key={record.id} className="p-4 border-b border-gray-200 last:border-b-0">
                <div className="flex items-center space-x-3 mb-3">
                  <img src={employee?.avatar} alt={employee?.name} className="w-10 h-10 rounded-full" />
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium text-gray-900 truncate">{employee?.name}</div>
                    <div className="text-xs text-gray-500">{record.date}</div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    record.status === 'present' ? 'bg-green-100 text-green-800' :
                    record.status === 'late' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {record.status}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-gray-600 block">Check In</span>
                    <span className="text-gray-900">{record.checkIn || '-'}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 block">Check Out</span>
                    <span className="text-gray-900">{record.checkOut || '-'}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 block">Hours</span>
                    <span className="text-gray-900">{hours}h</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Check In</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Check Out</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hours</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {attendance.map(record => {
                const employee = employees.find(e => e.id === record.employeeId);
                const hours = record.checkIn && record.checkOut ? 
                  ((new Date(`2024-08-10 ${record.checkOut}`) - new Date(`2024-08-10 ${record.checkIn}`)) / (1000 * 60 * 60)).toFixed(1) 
                  : '0';
                
                return (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img src={employee?.avatar} alt={employee?.name} className="w-8 h-8 rounded-full mr-3" />
                        <span className="text-sm font-medium">{employee?.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.checkIn || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.checkOut || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{hours}h</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        record.status === 'present' ? 'bg-green-100 text-green-800' :
                        record.status === 'late' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {record.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const FeedbackManagement = () => {
    const getStatusColor = (status) => {
      switch (status) {
        case 'reviewed':
          return 'bg-green-50 text-green-800 border-green-200';
        case 'pending':
          return 'bg-yellow-50 text-yellow-800 border-yellow-200';
        case 'in_progress':
          return 'bg-blue-50 text-blue-800 border-blue-200';
        default:
          return 'bg-gray-50 text-gray-800 border-gray-200';
      }
    };

    const getPriorityColor = (priority) => {
      switch (priority) {
        case 'high':
          return 'bg-red-50 text-red-800 border-red-200';
        case 'medium':
          return 'bg-yellow-50 text-yellow-800 border-yellow-200';
        case 'low':
          return 'bg-green-50 text-green-800 border-green-200';
        default:
          return 'bg-gray-50 text-gray-800 border-gray-200';
      }
    };

    const getCategoryLabel = (category) => {
      const categories = {
        general: 'General Feedback',
        workplace: 'Workplace Environment',
        facilities: 'Facilities & Equipment',
        management: 'Management & Leadership',
        benefits: 'Benefits & Compensation',
        suggestion: 'Suggestions & Ideas'
      };
      return categories[category] || category;
    };

    return (
      <div className="space-y-4 lg:space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h2 className="text-xl lg:text-2xl font-bold text-gray-800">Feedback Management</h2>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              Total: {feedbacks.length} | 
              Pending: {feedbacks.filter(f => f.status === 'pending').length} | 
              In Progress: {feedbacks.filter(f => f.status === 'in_progress').length} | 
              Reviewed: {feedbacks.filter(f => f.status === 'reviewed').length}
            </div>
          </div>
        </div>

        {/* Feedback Cards */}
        <div className="space-y-4">
          {feedbacks.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No feedback received yet</p>
            </div>
          ) : (
            feedbacks.map(feedback => (
              <div key={feedback.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <img 
                      src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=100&h=100&fit=crop&crop=face" 
                      alt="Anonymous"
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{feedback.subject}</h3>
                      <p className="text-sm text-gray-600">by Anonymous • {feedback.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(feedback.priority)}`}>
                      {feedback.priority.charAt(0).toUpperCase() + feedback.priority.slice(1)} Priority
                    </span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(feedback.status)}`}>
                      {feedback.status.charAt(0).toUpperCase() + feedback.status.slice(1).replace('_', ' ')}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">Category:</span> {getCategoryLabel(feedback.category)}
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700">{feedback.message}</p>
                  </div>
                </div>

                {feedback.response && (
                  <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400 mb-4">
                    <h4 className="font-medium text-blue-900 mb-2">Your Response:</h4>
                    <p className="text-blue-800">{feedback.response}</p>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center space-x-2">
                    {feedback.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleFeedbackStatusUpdate(feedback.id, 'in_progress')}
                          className="px-3 py-1 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Mark In Progress
                        </button>
                      </>
                    )}
                    {feedback.status !== 'reviewed' && (
                      <button
                        onClick={() => handleRespondToFeedback(feedback)}
                        className="px-3 py-1 text-xs bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        {feedback.response ? 'Update Response' : 'Respond'}
                      </button>
                    )}
                  </div>
                  <div className="text-xs text-gray-500">
                    ID: {feedback.id}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  const LeaveManagement = () => (
    <div className="space-y-4 lg:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h2 className="text-xl lg:text-2xl font-bold text-gray-800">Leave Management</h2>
      {/*<button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 text-sm lg:text-base">
          <Plus className="w-4 h-4" />
          <span>New Leave Request</span>
        </button> */}
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {leaves.map(leave => {
          const employee = employees.find(e => e.id === leave.employeeId);
          return (
            <div key={leave.id} className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center space-x-3 mb-3">
                <img src={employee?.avatar} alt={employee?.name} className="w-10 h-10 rounded-full" />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium text-gray-900 truncate">{employee?.name}</div>
                  <div className="text-xs text-gray-500">{leave.type} - {leave.days} days</div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  leave.status === 'approved' ? 'bg-green-100 text-green-800' : 
                  leave.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                </span>
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-600">Period: </span>
                  <span className="text-gray-900">{leave.startDate} to {leave.endDate}</span>
                </div>
                <div>
                  <span className="text-gray-600">Reason: </span>
                  <span className="text-gray-900">{leave.reason}</span>
                </div>
                <div>
                  <span className="text-gray-600">Applied: </span>
                  <span className="text-gray-900">{leave.appliedDate}</span>
                </div>
                {leave.approvedDate && (
                  <div className="text-green-600">
                    <span className="font-medium">Approved on: </span>
                    <span>{leave.approvedDate}</span>
                  </div>
                )}
                {leave.rejectedDate && (
                  <div className="text-red-600">
                    <span className="font-medium">Rejected on: </span>
                    <span>{leave.rejectedDate}</span>
                  </div>
                )}
                {leave.rejectionReason && (
                  <div className="text-red-600">
                    <span className="font-medium">Rejection reason: </span>
                    <span>{leave.rejectionReason}</span>
                  </div>
                )}
              </div>
              {leave.status === 'pending' && (
                <div className="flex space-x-2 mt-4 pt-3 border-t">
                  <button 
                    onClick={() => handleLeaveAction(leave.id, 'approved')}
                    className="flex-1 bg-green-600 text-white py-2 px-3 rounded text-sm font-medium hover:bg-green-700"
                  >
                    Approve
                  </button>
                  <button 
                    onClick={() => handleLeaveReject(leave)}
                    className="flex-1 bg-red-600 text-white py-2 px-3 rounded text-sm font-medium hover:bg-red-700"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Period</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Days</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reason</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {leaves.map(leave => {
                const employee = employees.find(e => e.id === leave.employeeId);
                return (
                  <tr key={leave.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img src={employee?.avatar} alt={employee?.name} className="w-8 h-8 rounded-full mr-3" />
                        <span className="text-sm font-medium">{employee?.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{leave.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {leave.startDate} to {leave.endDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{leave.days}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                      <div>
                        <div className="font-medium">{leave.reason}</div>
                        {leave.rejectionReason && (
                          <div className="text-red-600 text-xs mt-1">{leave.rejectionReason}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        leave.status === 'approved' ? 'bg-green-100 text-green-800' : 
                        leave.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {leave.status === 'pending' && (
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleLeaveAction(leave.id, 'approved')}
                            className="text-green-600 hover:text-green-800 text-sm font-medium"
                          >
                            Approve
                          </button>
                          <button 
                            onClick={() => handleLeaveReject(leave)}
                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                      {leave.status !== 'pending' && (
                        <span className="text-gray-400 text-sm">Processed</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const WorkFromHomeManagement = () => {
    const getStatusColor = (status) => {
      switch (status) {
        case 'approved':
          return 'text-green-600 bg-green-50';
        case 'rejected':
          return 'text-red-600 bg-red-50';
        case 'pending':
          return 'text-yellow-600 bg-yellow-50';
        default:
          return 'text-gray-600 bg-gray-50';
      }
    };

    const getStatusIcon = (status) => {
      switch (status) {
        case 'approved':
          return <CheckCircle className="w-4 h-4" />;
        case 'rejected':
          return <XCircle className="w-4 h-4" />;
        case 'pending':
          return <Clock className="w-4 h-4" />;
        default:
          return <AlertCircle className="w-4 h-4" />;
      }
    };

    return (
      <div className="space-y-4 lg:space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h2 className="text-xl lg:text-2xl font-bold text-gray-800">Work From Home Management</h2>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              Total: {wfhRequests.length} | 
              Pending: {wfhRequests.filter(r => r.status === 'pending').length} | 
              Approved: {wfhRequests.filter(r => r.status === 'approved').length} | 
              Rejected: {wfhRequests.filter(r => r.status === 'rejected').length}
            </div>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden space-y-4">
          {wfhRequests.map(request => (
            <div key={request.id} className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center space-x-3 mb-3">
                <img src={request.employeeAvatar} alt={request.employeeName} className="w-10 h-10 rounded-full" />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium text-gray-900 truncate">{request.employeeName}</div>
                  <div className="text-xs text-gray-500">{request.date}</div>
                </div>
                <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                  {getStatusIcon(request.status)}
                  <span className="capitalize">{request.status}</span>
                </span>
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-600">Reason: </span>
                  <span className="text-gray-900">{request.reason}</span>
                </div>
                {request.description && (
                  <div>
                    <span className="text-gray-600">Description: </span>
                    <span className="text-gray-900">{request.description}</span>
                  </div>
                )}
                <div>
                  <span className="text-gray-600">Applied: </span>
                  <span className="text-gray-900">{request.appliedDate}</span>
                </div>
                {request.rejectionReason && (
                  <div className="text-red-600">
                    <span className="font-medium">Rejection reason: </span>
                    <span>{request.rejectionReason}</span>
                  </div>
                )}
              </div>
              {request.status === 'pending' && (
                <div className="flex space-x-2 mt-4 pt-3 border-t">
                  <button 
                    onClick={() => handleWFHAction(request.id, 'approved')}
                    className="flex-1 bg-green-600 text-white py-2 px-3 rounded text-sm font-medium hover:bg-green-700"
                  >
                    Approve
                  </button>
                  <button 
                    onClick={() => handleWFHReject(request)}
                    className="flex-1 bg-red-600 text-white py-2 px-3 rounded text-sm font-medium hover:bg-red-700"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reason</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Applied Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {wfhRequests.map(request => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img src={request.employeeAvatar} alt={request.employeeName} className="w-8 h-8 rounded-full mr-3" />
                        <span className="text-sm font-medium">{request.employeeName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.date}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                      <div>
                        <div className="font-medium">{request.reason}</div>
                        {request.description && (
                          <div className="text-gray-500 text-xs mt-1 truncate">{request.description}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.appliedDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                        {getStatusIcon(request.status)}
                        <span className="capitalize">{request.status}</span>
                      </span>
                      {request.rejectionReason && (
                        <div className="text-red-600 text-xs mt-1">
                          {request.rejectionReason}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {request.status === 'pending' && (
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleWFHAction(request.id, 'approved')}
                            className="text-green-600 hover:text-green-800 text-sm font-medium"
                          >
                            Approve
                          </button>
                          <button 
                            onClick={() => handleWFHReject(request)}
                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                      {request.status !== 'pending' && (
                        <span className="text-gray-400 text-sm">Processed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'employees':
        return <EmployeeList />;
      case 'attendance':
        return <AttendanceView />;
      case 'leaves':
        return <LeaveManagement />;
      case 'workfromhome':
        return <WorkFromHomeManagement />;
      case 'feedback':
        return <FeedbackManagement />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
            <span className="text-2xl font-bold">
              Employee Tracker
            </span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'dashboard' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                <span>Dashboard</span>
              </button>
              
              <button
                onClick={() => setActiveTab('employees')}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'employees' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Employees</span>
              </button>
              
              <button
                onClick={() => setActiveTab('attendance')}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'attendance' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Clock className="w-4 h-4" />
                <span>Attendance</span>
              </button>
              
              <button
                onClick={() => setActiveTab('leaves')}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'leaves' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Leaves</span>
              </button>
              
              <button
                onClick={() => setActiveTab('workfromhome')}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'workfromhome' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Monitor className="w-4 h-4" />
                <span>Work From Home</span>
              </button>
              
              <button
                onClick={() => setActiveTab('feedback')}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'feedback' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>Feedback</span>
              </button>
              
              <div className="border-l border-gray-300 mx-4 h-6"></div>
              
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-600 hover:text-gray-900 p-2"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden border-t border-gray-200 py-4">
              <div className="space-y-2">
                <button
                  onClick={() => {
                    setActiveTab('dashboard');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'dashboard' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <TrendingUp className="w-4 h-4" />
                  <span>Dashboard</span>
                </button>
                
                <button
                  onClick={() => {
                    setActiveTab('employees');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'employees' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>Employees</span>
                </button>
                
                <button
                  onClick={() => {
                    setActiveTab('attendance');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'attendance' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Clock className="w-4 h-4" />
                  <span>Attendance</span>
                </button>
                
                <button
                  onClick={() => {
                    setActiveTab('leaves');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'leaves' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  <span>Leaves</span>
                </button>
                
                <button
                  onClick={() => {
                    setActiveTab('workfromhome');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'workfromhome' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Monitor className="w-4 h-4" />
                  <span>Work From Home</span>
                </button>
                
                <button
                  onClick={() => {
                    setActiveTab('feedback');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'feedback' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Feedback</span>
                </button>
                
                <div className="border-t border-gray-200 my-2"></div>
                
                <div className="px-3 py-2 mb-2">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
                
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-4 lg:py-6 px-4">
        {renderContent()}
      </main>

      {/* Add Employee Modal */}
      {showAddEmployeeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Add New Employee</h3>
              <button
                onClick={() => setShowAddEmployeeModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={(e) => { e.preventDefault(); handleAddEmployee(); }} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    required
                    value={newEmployee.name}
                    onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={newEmployee.email}
                    onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter email address"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <input
                    type="text"
                    required
                    value={newEmployee.department}
                    onChange={(e) => setNewEmployee({...newEmployee, department: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter department"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                  <input
                    type="text"
                    required
                    value={newEmployee.position}
                    onChange={(e) => setNewEmployee({...newEmployee, position: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter position"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Join Date</label>
                  <input
                    type="date"
                    required
                    value={newEmployee.joinDate}
                    onChange={(e) => setNewEmployee({...newEmployee, joinDate: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={newEmployee.phone}
                    onChange={(e) => setNewEmployee({...newEmployee, phone: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter phone number"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Blood Group</label>
                  <select
                    value={newEmployee.bloodGroup}
                    onChange={(e) => setNewEmployee({...newEmployee, bloodGroup: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select blood group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Avatar URL (Optional)</label>
                  <input
                    type="url"
                    value={newEmployee.avatar}
                    onChange={(e) => setNewEmployee({...newEmployee, avatar: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter avatar URL"
                  />
                </div>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  Add Employee
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddEmployeeModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Employee Modal */}
      {showViewEmployeeModal && selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Employee Details</h3>
              <button
                onClick={() => setShowViewEmployeeModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-6">
                <img 
                  src={selectedEmployee.avatar} 
                  alt={selectedEmployee.name}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h4 className="text-xl font-semibold text-gray-900">{selectedEmployee.name}</h4>
                  <p className="text-gray-600">{selectedEmployee.position}</p>
                  <p className="text-sm text-gray-500">{selectedEmployee.employeeId}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500 block mb-1">Email</label>
                  <p className="text-gray-900">{selectedEmployee.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 block mb-1">Department</label>
                  <p className="text-gray-900">{selectedEmployee.department}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 block mb-1">Join Date</label>
                  <p className="text-gray-900">{selectedEmployee.joinDate}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 block mb-1">Leaves Available</label>
                  <p className="text-gray-900">{selectedEmployee.leavesAvailable} days</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 block mb-1">Phone</label>
                  <p className="text-gray-900">{selectedEmployee.phone || 'Not provided'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 block mb-1">Blood Group</label>
                  <p className="text-gray-900">{selectedEmployee.bloodGroup || 'Not provided'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Employee Modal */}
      {showEditEmployeeModal && selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Edit Employee</h3>
              <button
                onClick={() => setShowEditEmployeeModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={(e) => { e.preventDefault(); handleUpdateEmployee(); }} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    required
                    value={newEmployee.name}
                    onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={newEmployee.email}
                    onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <input
                    type="text"
                    required
                    value={newEmployee.department}
                    onChange={(e) => setNewEmployee({...newEmployee, department: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                  <input
                    type="text"
                    required
                    value={newEmployee.position}
                    onChange={(e) => setNewEmployee({...newEmployee, position: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Join Date</label>
                  <input
                    type="date"
                    required
                    value={newEmployee.joinDate}
                    onChange={(e) => setNewEmployee({...newEmployee, joinDate: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={newEmployee.phone}
                    onChange={(e) => setNewEmployee({...newEmployee, phone: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Blood Group</label>
                  <select
                    value={newEmployee.bloodGroup}
                    onChange={(e) => setNewEmployee({...newEmployee, bloodGroup: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select blood group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Leaves Available</label>
                  <input
                    type="number"
                    value={newEmployee.leavesAvailable}
                    onChange={(e) => setNewEmployee({...newEmployee, leavesAvailable: parseInt(e.target.value)})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  Update Employee
                </button>
                <button
                  type="button"
                  onClick={() => setShowEditEmployeeModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <Trash2 className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Delete Employee</h3>
                  <p className="text-sm text-gray-500">This action cannot be undone</p>
                </div>
              </div>
              
              <p className="text-gray-700 mb-6">
                Are you sure you want to delete <strong>{selectedEmployee.name}</strong>? 
                This will permanently remove their record from the system.
              </p>
              
              <div className="flex space-x-3">
                <button
                  onClick={confirmDeleteEmployee}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  Delete Employee
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Response Modal */}
      {showFeedbackResponseModal && selectedFeedback && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">
                Respond to Feedback
              </h3>
              <button
                onClick={() => setShowFeedbackResponseModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <div className="flex items-center space-x-3 mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=100&h=100&fit=crop&crop=face" 
                    alt="Anonymous"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h4 className="font-medium text-gray-900">{selectedFeedback.subject}</h4>
                    <p className="text-sm text-gray-600">by Anonymous</p>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700">{selectedFeedback.message}</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Response
                </label>
                <textarea
                  value={feedbackResponse}
                  onChange={(e) => setFeedbackResponse(e.target.value)}
                  rows="6"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Write your response to this feedback..."
                />
              </div>
              
              <div className="flex space-x-3 pt-6">
                <button
                  onClick={submitFeedbackResponse}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                  disabled={!feedbackResponse.trim()}
                >
                  Send Response
                </button>
                <button
                  onClick={() => setShowFeedbackResponseModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* WFH Rejection Modal */}
      {showWFHRejectModal && selectedWFHRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Reject WFH Request</h3>
              <button
                onClick={() => setShowWFHRejectModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <p className="text-gray-700">
                  Rejecting work from home request for <strong>{selectedWFHRequest.employeeName}</strong> on <strong>{selectedWFHRequest.date}</strong>.
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rejection Reason *
                </label>
                <textarea
                  value={wfhRejectionReason}
                  onChange={(e) => setWfhRejectionReason(e.target.value)}
                  rows="3"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Please provide a reason for rejection..."
                  required
                />
              </div>
              
              <div className="flex space-x-3 pt-6">
                <button
                  onClick={submitWFHRejection}
                  disabled={!wfhRejectionReason.trim()}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Reject Request
                </button>
                <button
                  onClick={() => setShowWFHRejectModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Leave Rejection Modal */}
      {showLeaveRejectModal && selectedLeaveRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Reject Leave Request</h3>
              <button
                onClick={() => setShowLeaveRejectModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <p className="text-gray-700">
                  Rejecting {selectedLeaveRequest.type} leave request from <strong>{selectedLeaveRequest.startDate}</strong> to <strong>{selectedLeaveRequest.endDate}</strong> ({selectedLeaveRequest.days} day{selectedLeaveRequest.days > 1 ? 's' : ''}).
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rejection Reason *
                </label>
                <textarea
                  value={leaveRejectionReason}
                  onChange={(e) => setLeaveRejectionReason(e.target.value)}
                  rows="3"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Please provide a reason for rejection..."
                  required
                />
              </div>
              
              <div className="flex space-x-3 pt-6">
                <button
                  onClick={submitLeaveRejection}
                  disabled={!leaveRejectionReason.trim()}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Reject Request
                </button>
                <button
                  onClick={() => setShowLeaveRejectModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeTracker;