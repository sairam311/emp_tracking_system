import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password, role) => {
    try {
      const response = await mockLogin(email, password, role);
      if (response.success) {
        setUser(response.user);
        localStorage.setItem('user', JSON.stringify(response.user));
        return { success: true };
      } else {
        return { success: false, message: response.message };
      }
    } catch (error) {
      return { success: false, message: 'Login failed. Please try again.' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isEmployee: user?.role === 'employee'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

const mockLogin = async (email, password, role) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const users = [
        {
          id: 'admin1',
          email: 'admin@company.com',
          password: 'admin123',
          role: 'admin',
          name: 'Admin',
          department: 'Administration'
        },
        {
          id: 'emp1',
          email: 'john.doe@company.com',
          password: 'employee123',
          role: 'employee',
          name: 'John Doe',
          department: 'Engineering',
          position: 'Senior Developer',
          joinDate: '2023-01-15',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
          employeeId: 'EMP001',
          leavesAvailable: 18,
          totalLeaves: 25,
          usedLeaves: 7,
          phone: '+1 (555) 123-4567',
          bloodGroup: 'O+'
        },
        {
          id: 'emp2',
          email: 'sarah.wilson@company.com',
          password: 'employee123',
          role: 'employee',
          name: 'Sarah Wilson',
          department: 'Marketing',
          position: 'Marketing Manager',
          joinDate: '2022-08-20',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
          employeeId: 'EMP002',
          leavesAvailable: 22,
          totalLeaves: 25,
          usedLeaves: 3,
          phone: '+1 (555) 234-5678',
          bloodGroup: 'A+'
        },
        {
          id: 'emp3',
          email: 'mike.johnson@company.com',
          password: 'employee123',
          role: 'employee',
          name: 'Mike Johnson',
          department: 'Sales',
          position: 'Sales Representative',
          joinDate: '2023-05-10',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
          employeeId: 'EMP003',
          leavesAvailable: 15,
          totalLeaves: 25,
          usedLeaves: 10,
          phone: '+1 (555) 345-6789',
          bloodGroup: 'B+'
        }
      ];

      const user = users.find(u => 
        u.email === email && 
        u.password === password && 
        u.role === role
      );

      if (user) {
        const { password, ...userWithoutPassword } = user;
        resolve({
          success: true,
          user: userWithoutPassword
        });
      } else {
        resolve({
          success: false,
          message: 'Invalid email, password, or role selected.'
        });
      }
    }, 1000);
  });
};