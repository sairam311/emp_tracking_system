import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Monitor, Plus, Clock, CheckCircle, XCircle, AlertCircle, Send, X } from 'lucide-react';

const EmployeeWorkFromHome = () => {
  const { user } = useAuth();
  const [showWFHForm, setShowWFHForm] = useState(false);
  const [wfhRequests, setWfhRequests] = useState([]);
  const [formData, setFormData] = useState({
    date: '',
    reason: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const mockWFHRequests = [
      {
        id: 1,
        date: '2024-08-20',
        reason: 'Avoid traffic congestion',
        description: 'Working from home to avoid heavy traffic due to road construction',
        status: 'approved',
        appliedDate: '2024-08-15',
        approvedDate: '2024-08-16'
      },
      {
        id: 2,
        date: '2024-08-25',
        reason: 'Home maintenance',
        description: 'Need to be present for scheduled home repairs',
        status: 'pending',
        appliedDate: '2024-08-20'
      },
      {
        id: 3,
        date: '2024-07-30',
        reason: 'Personal appointment',
        description: 'Medical appointment that requires work from home',
        status: 'rejected',
        appliedDate: '2024-07-25',
        rejectedDate: '2024-07-26',
        rejectionReason: 'Important client meeting scheduled in office'
      }
    ];
    setWfhRequests(mockWFHRequests);
  }, []);

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
      status: 'pending',
      appliedDate: new Date().toISOString().split('T')[0]
    };

    // Simulate API call - replace with actual API endpoint
    setTimeout(() => {
      setWfhRequests(prev => [newRequest, ...prev]);
      setShowWFHForm(false);
      setFormData({
        date: '',
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

  const pendingRequests = wfhRequests.filter(req => req.status === 'pending').length;
  const approvedRequests = wfhRequests.filter(req => req.status === 'approved').length;
  const rejectedRequests = wfhRequests.filter(req => req.status === 'rejected').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Work From Home</h1>
          <p className="text-gray-600 mt-1">
            Manage your work from home requests and track your remote work days
          </p>
        </div>
        <button
          onClick={() => setShowWFHForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New WFH Request</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Requests</p>
              <p className="text-2xl font-bold text-blue-600">{wfhRequests.length}</p>
            </div>
            <Monitor className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Approved</p>
              <p className="text-2xl font-bold text-green-600">{approvedRequests}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{pendingRequests}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Rejected</p>
              <p className="text-2xl font-bold text-red-600">{rejectedRequests}</p>
            </div>
            <XCircle className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* WFH Requests */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Work From Home Requests</h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {wfhRequests.length === 0 ? (
            <div className="p-8 text-center">
              <Monitor className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No work from home requests found</p>
              <button
                onClick={() => setShowWFHForm(true)}
                className="mt-2 text-blue-600 hover:text-blue-700"
              >
                Create your first WFH request
              </button>
            </div>
          ) : (
            wfhRequests.map((request) => (
              <div key={request.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-medium text-gray-900">Work From Home Request</h3>
                      <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                        {getStatusIcon(request.status)}
                        <span className="capitalize">{request.status}</span>
                      </span>
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>
                        <span className="font-medium">Date:</span> {request.date}
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

      {/* WFH Request Form Modal */}
      {showWFHForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">New Work From Home Request</h3>
              <button
                onClick={() => setShowWFHForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason
                </label>
                <input
                  type="text"
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  placeholder="Brief reason for work from home"
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
                  placeholder="Additional details about your work from home request"
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
                  onClick={() => setShowWFHForm(false)}
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

export default EmployeeWorkFromHome;