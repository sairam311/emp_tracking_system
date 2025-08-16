import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Calendar, Plus, Clock, CheckCircle, XCircle, AlertCircle, Send, X } from 'lucide-react';

const EmployeeLeaves = () => {
  const { user } = useAuth();
  const [showLeaveForm, setShowLeaveForm] = useState(false);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [formData, setFormData] = useState({
    type: 'Annual',
    startDate: '',
    endDate: '',
    reason: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);

  // Get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  // Mock data for all employees - in real app, this would come from API
  const mockAllEmployees = [
    { id: 1, name: 'John Doe', position: 'Senior Developer', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face' },
    { id: 2, name: 'Sarah Wilson', position: 'Marketing Manager', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face' },
    { id: 3, name: 'Mike Johnson', position: 'Sales Representative', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face' },
    { id: 4, name: 'Emily Davis', position: 'HR Specialist', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face' }
  ];

  useEffect(() => {
    const mockLeaveRequests = [
      {
        id: 1,
        type: 'Annual',
        startDate: '2024-08-15',
        endDate: '2024-08-17',
        days: 3,
        reason: 'Family vacation',
        description: 'Planning a family trip to the mountains',
        status: 'approved',
        appliedDate: '2024-08-01',
        approvedDate: '2024-08-02'
      },
      {
        id: 2,
        type: 'Sick',
        startDate: '2024-07-22',
        endDate: '2024-07-22',
        days: 1,
        reason: 'Medical appointment',
        description: 'Annual health checkup with doctor',
        status: 'pending',
        appliedDate: '2024-07-20'
      },
      {
        id: 3,
        type: 'Personal',
        startDate: '2024-06-10',
        endDate: '2024-06-11',
        days: 2,
        reason: 'Personal matters',
        description: 'Need to handle some personal documentation work',
        status: 'rejected',
        appliedDate: '2024-06-01',
        rejectedDate: '2024-06-02',
        rejectionReason: 'Busy project timeline'
      }
    ];
    setLeaveRequests(mockLeaveRequests);
  }, []);

  const leaveTypes = [
    'Annual',
    'Sick',
    'Personal',
    'Emergency',
    'Maternity/Paternity',
    'Study'
  ];

  const calculateDays = (startDate, endDate) => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newRequest = {
      id: Date.now(),
      ...formData,
      days: calculateDays(formData.startDate, formData.endDate),
      status: 'pending',
      appliedDate: new Date().toISOString().split('T')[0]
    };

    setTimeout(() => {
      setLeaveRequests(prev => [newRequest, ...prev]);
      setShowLeaveForm(false);
      setFormData({
        type: 'Annual',
        startDate: '',
        endDate: '',
        reason: '',
        description: ''
      });
      setLoading(false);
    }, 1000);
  };

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

  const pendingRequests = leaveRequests.filter(req => req.status === 'pending').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leave Management</h1>
          <p className="text-gray-600 mt-1">
            Manage your leave requests and track your balance
          </p>
        </div>
        <button
          onClick={() => setShowLeaveForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Leave Request</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Available Leaves</p>
              <p className="text-2xl font-bold text-green-600">{user?.leavesAvailable}</p>
            </div>
            <Calendar className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Used Leaves</p>
              <p className="text-2xl font-bold text-red-600">{user?.usedLeaves}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-red-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Requests</p>
              <p className="text-2xl font-bold text-yellow-600">{pendingRequests}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Leaves</p>
              <p className="text-2xl font-bold text-blue-600">{user?.totalLeaves}</p>
            </div>
            <Calendar className="w-8 h-8 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Leave Requests */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Leave Requests</h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {leaveRequests.length === 0 ? (
            <div className="p-8 text-center">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No leave requests found</p>
              <button
                onClick={() => setShowLeaveForm(true)}
                className="mt-2 text-blue-600 hover:text-blue-700"
              >
                Create your first leave request
              </button>
            </div>
          ) : (
            leaveRequests.map((request) => (
              <div key={request.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-medium text-gray-900">{request.type} Leave</h3>
                      <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                        {getStatusIcon(request.status)}
                        <span className="capitalize">{request.status}</span>
                      </span>
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>
                        <span className="font-medium">Period:</span> {request.startDate} to {request.endDate} ({request.days} day{request.days > 1 ? 's' : ''})
                      </p>
                      <p>
                        <span className="font-medium">Reason:</span> {request.reason}
                      </p>
                      {request.description && (
                        <p>
                          <span className="font-medium">Description:</span> {request.description}
                        </p>
                      )}
                      <p>
                        <span className="font-medium">Applied on:</span> {request.appliedDate}
                      </p>
                      {request.approvedDate && (
                        <p className="text-green-600">
                          <span className="font-medium">Approved on:</span> {request.approvedDate}
                        </p>
                      )}
                      {request.rejectedDate && (
                        <p className="text-red-600">
                          <span className="font-medium">Rejected on:</span> {request.rejectedDate}
                        </p>
                      )}
                      {request.rejectionReason && (
                        <p className="text-red-600">
                          <span className="font-medium">Rejection reason:</span> {request.rejectionReason}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Leave Request Form Modal */}
      {showLeaveForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">New Leave Request</h3>
              <button
                onClick={() => setShowLeaveForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Leave Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  {leaveTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    min={formData.startDate || new Date().toISOString().split('T')[0]}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              
              {formData.startDate && formData.endDate && (
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-blue-700">
                    Total days: {calculateDays(formData.startDate, formData.endDate)} day{calculateDays(formData.startDate, formData.endDate) > 1 ? 's' : ''}
                  </p>
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason
                </label>
                <input
                  type="text"
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  placeholder="Brief reason for leave"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description (Optional)
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Additional details about your leave request"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Request</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setShowLeaveForm(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeLeaves;