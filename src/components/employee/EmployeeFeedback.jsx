import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { MessageSquare, Send, Star, ThumbsUp, CheckCircle2 } from 'lucide-react';

const EmployeeFeedback = () => {
  const { user } = useAuth();
  const [newFeedback, setNewFeedback] = useState({
    subject: '',
    message: '',
    category: 'general',
    priority: 'medium'
  });
  const [loading, setLoading] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const categories = [
    { value: 'general', label: 'General Feedback', icon: MessageSquare },
    { value: 'workplace', label: 'Workplace Environment', icon: ThumbsUp },
    { value: 'facilities', label: 'Facilities & Equipment', icon: Star },
    { value: 'management', label: 'Management & Leadership', icon: Star },
    { value: 'benefits', label: 'Benefits & Compensation', icon: Star },
    { value: 'suggestion', label: 'Suggestions & Ideas', icon: Star }
  ];

  const priorities = [
    { value: 'low', label: 'Low Priority', color: 'text-green-600' },
    { value: 'medium', label: 'Medium Priority', color: 'text-yellow-600' },
    { value: 'high', label: 'High Priority', color: 'text-red-600' }
  ];

  const handleInputChange = (field, value) => {
    setNewFeedback(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    setLoading(true);

    const feedback = {
      id: Date.now(),
      ...newFeedback,
      date: new Date().toISOString().split('T')[0],
      employeeId: user?.id,
      employeeName: user?.name
    };

    // Simulate API call
    setTimeout(() => {
      console.log('Feedback submitted:', feedback);
      setNewFeedback({
        subject: '',
        message: '',
        category: 'general',
        priority: 'medium'
      });
      setLoading(false);
      setSubmissionSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSubmissionSuccess(false);
      }, 3000);
    }, 1000);
  };


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Share Your Feedback</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Your thoughts and suggestions help us improve. Share your feedback with management and let us know how we can make your experience better.
        </p>
      </div>

      {/* Success Message */}
      {submissionSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <p className="text-green-800 font-medium">Feedback submitted successfully!</p>
          </div>
          <p className="text-green-700 text-sm mt-1">Thank you for your input. Management will review your feedback.</p>
        </div>
      )}

      {/* Feedback Form */}
      <div className="bg-white rounded-lg shadow-sm p-8 max-w-3xl mx-auto">
        <form onSubmit={handleSubmitFeedback} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
            <input
              type="text"
              required
              value={newFeedback.subject}
              onChange={(e) => handleInputChange('subject', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Brief subject for your feedback"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={newFeedback.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>{category.label}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <select
                value={newFeedback.priority}
                onChange={(e) => handleInputChange('priority', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {priorities.map(priority => (
                  <option key={priority.value} value={priority.value}>{priority.label}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Your Feedback</label>
            <textarea
              required
              rows="8"
              value={newFeedback.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Please share your detailed feedback, suggestions, or concerns. The more specific you are, the better we can address your input."
            />
          </div>
          
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 min-w-[200px] justify-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Submit Feedback</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="bg-blue-50 rounded-lg p-6 text-center">
          <MessageSquare className="w-8 h-8 text-blue-600 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">General Feedback</h3>
          <p className="text-sm text-gray-600">Share your overall experience and general thoughts about the workplace.</p>
        </div>
        
        <div className="bg-green-50 rounded-lg p-6 text-center">
          <Star className="w-8 h-8 text-green-600 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">Suggestions</h3>
          <p className="text-sm text-gray-600">Have ideas to improve processes, facilities, or work environment? We'd love to hear them.</p>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-6 text-center">
          <ThumbsUp className="w-8 h-8 text-purple-600 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">Appreciation</h3>
          <p className="text-sm text-gray-600">Recognize great work, celebrate achievements, or express gratitude.</p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeFeedback;