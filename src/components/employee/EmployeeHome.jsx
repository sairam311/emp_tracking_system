import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Calendar, Clock, User, Mail, MapPin, Badge, TrendingUp, Award, Edit, Save, X, Phone, Heart, Star, Trophy, Target } from 'lucide-react';

const EmployeeHome = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    phone: user?.phone || '',
    bloodGroup: user?.bloodGroup || ''
  });

  const handleEditToggle = () => {
    if (isEditing) {
      setEditedProfile({
        phone: user?.phone || '',
        bloodGroup: user?.bloodGroup || ''
      });
    }
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    // Here you would typically make an API call to update the user profile
    console.log('Saving profile:', editedProfile);
    // For now, we'll just simulate the save
    setIsEditing(false);
    // You would update the user context here with the new data
  };

  const handleInputChange = (field, value) => {
    if (field === 'phone') {
      // Only allow numbers and limit to 10 digits
      const phoneValue = value.replace(/\D/g, '').slice(0, 10);
      setEditedProfile(prev => ({
        ...prev,
        [field]: phoneValue
      }));
    } else {
      setEditedProfile(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const calculateTenure = (joinDate) => {
    const join = new Date(joinDate);
    const now = new Date();
    const diffTime = Math.abs(now - join);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);
    
    if (years > 0) {
      return `${years} year${years > 1 ? 's' : ''} ${months > 0 ? `${months} month${months > 1 ? 's' : ''}` : ''}`;
    }
    return `${months} month${months > 1 ? 's' : ''}`;
  };

  const leaveStats = [
    {
      label: 'Total Leaves',
      value: user?.totalLeaves || 0,
      color: 'bg-blue-500',
      icon: Calendar
    },
    {
      label: 'Used Leaves',
      value: user?.usedLeaves || 0,
      color: 'bg-red-500',
      icon: Clock
    },
    {
      label: 'Available Leaves',
      value: user?.leavesAvailable || 0,
      color: 'bg-green-500',
      icon: TrendingUp
    }
  ];


  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-4">
          <img 
            src={user?.avatar} 
            alt={user?.name}
            className="w-16 h-16 rounded-full border-3 border-white/20"
          />
          <div>
            <h1 className="text-2xl font-bold">
              {getTimeOfDay()}, {user?.name?.split(' ')[0]}!
            </h1>
            <p className="text-blue-100 mt-1">
              Welcome back to your dashboard
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Details Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
              </div>
              <div className="flex items-center space-x-2">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="flex items-center space-x-1 px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save</span>
                    </button>
                    <button
                      onClick={handleEditToggle}
                      className="flex items-center space-x-1 px-3 py-1 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
                    >
                      <X className="w-4 h-4" />
                      <span>Cancel</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleEditToggle}
                    className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500 block mb-1">Full Name</label>
                  <p className="text-gray-900 font-medium">{user?.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 block mb-1">Employee ID</label>
                  <p className="text-gray-900 font-medium">{user?.employeeId}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 block mb-1">Email Address</label>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-900">{user?.email}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 block mb-1">Phone Number</label>
                  {isEditing ? (
                    <div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <input
                          type="tel"
                          value={editedProfile.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="Enter 10-digit phone number"
                          className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm ${
                            editedProfile.phone && editedProfile.phone.length !== 10
                              ? 'border-red-300 focus:ring-red-500'
                              : 'border-gray-300 focus:ring-blue-500'
                          }`}
                        />
                      </div>
                      {editedProfile.phone && editedProfile.phone.length !== 10 && (
                        <p className="text-red-600 text-xs mt-1">
                          Phone number must be exactly 10 digits ({editedProfile.phone.length}/10)
                        </p>
                      )}
                      {editedProfile.phone && editedProfile.phone.length === 10 && (
                        <p className="text-green-600 text-xs mt-1">✓ Valid phone number</p>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <p className="text-gray-900">{user?.phone || editedProfile.phone || 'Not provided'}</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500 block mb-1">Position</label>
                  <div className="flex items-center space-x-2">
                    <Badge className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-900 font-medium">{user?.position}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 block mb-1">Department</label>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-900">{user?.department}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 block mb-1">Join Date</label>
                  <p className="text-gray-900">{user?.joinDate}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {calculateTenure(user?.joinDate)} with company
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 block mb-1">Blood Group</label>
                  {isEditing ? (
                    <div className="flex items-center space-x-2">
                      <Heart className="w-4 h-4 text-gray-400" />
                      <select
                        value={editedProfile.bloodGroup}
                        onChange={(e) => handleInputChange('bloodGroup', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
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
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Heart className="w-4 h-4 text-gray-400" />
                      <p className="text-gray-900">{user?.bloodGroup || editedProfile.bloodGroup || 'Not provided'}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - Leave Summary */}
        <div className="space-y-6">
          {/* Leave Balance Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Calendar className="w-5 h-5 text-green-600" />
              <h2 className="text-xl font-semibold text-gray-900">Leave Balance</h2>
            </div>
            
            <div className="space-y-4">
              {leaveStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 ${stat.color} rounded-lg`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-medium text-gray-700">{stat.label}</span>
                    </div>
                    <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                  </div>
                );
              })}
            </div>

            {/* Leave Balance Progress */}
            <div className="mt-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Leave Utilization</span>
                <span>{Math.round((user?.usedLeaves / user?.totalLeaves) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(user?.usedLeaves / user?.totalLeaves) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeHome;