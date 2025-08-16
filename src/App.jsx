import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginPage from './components/LoginPage';
import EmployeeTracker from './components/EmployeeTracker';
import EmployeeDashboard from './components/employee/EmployeeDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public route */}
      <Route path="/login" element={!user ? <LoginPage /> : <Navigate to={user.role === 'admin' ? '/admin/dashboard' : '/employee/home'} />} />
      
      {/* Protected Admin routes */}
      <Route 
        path="/admin/dashboard" 
        element={
          <ProtectedRoute requireAdmin={true}>
            <EmployeeTracker />
          </ProtectedRoute>
        } 
      />
      
      {/* Protected Employee routes */}
      <Route 
        path="/employee/home" 
        element={
          <ProtectedRoute>
            <EmployeeDashboard />
          </ProtectedRoute>
        } 
      />
      
      {/* Default redirects */}
      <Route 
        path="/Employee_Tracker" 
        element={
          user ? (
            <Navigate to={user.role === 'admin' ? '/admin/dashboard' : '/employee/home'} />
          ) : (
            <Navigate to="/login" />
          )
        } 
      />
      
      {/* Catch all route */}
      <Route 
        path="*" 
        element={
          <Navigate to="/Employee_Tracker" />
        } 
      />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;