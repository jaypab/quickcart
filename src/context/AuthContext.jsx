import { createContext, useContext, useState, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const AuthContext = createContext();

// Simple encryption for demo purposes (not production-ready)
const encryptPassword = (password) => btoa(password);
const decryptPassword = (encrypted) => atob(encrypted);

export function AuthProvider({ children }) {
  const [users, setUsers] = useLocalStorage('quickcart_users', []);
  const [currentUser, setCurrentUser] = useLocalStorage('quickcart_current_user', null);
  const [rememberMe, setRememberMe] = useLocalStorage('quickcart_remember', false);

  // Validate email format
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Check password strength
  const checkPasswordStrength = (password) => {
    const hasLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const score = [hasLength, hasUppercase, hasLowercase, hasNumber, hasSpecial].filter(Boolean).length;

    if (score <= 2) return { strength: 'weak', isValid: false };
    if (score === 3) return { strength: 'medium', isValid: true };
    if (score === 4) return { strength: 'good', isValid: true };
    return { strength: 'strong', isValid: true };
  };

  // Register new user
  const register = ({ username, email, password, confirmPassword }) => {
    // Validation
    if (!username || !email || !password || !confirmPassword) {
      return { success: false, error: 'All fields are required' };
    }

    if (username.length < 3) {
      return { success: false, error: 'Username must be at least 3 characters' };
    }

    if (!isValidEmail(email)) {
      return { success: false, error: 'Invalid email format' };
    }

    const passwordStrength = checkPasswordStrength(password);
    if (!passwordStrength.isValid) {
      return { success: false, error: 'Password is too weak. Use at least 8 characters with uppercase, lowercase, and numbers.' };
    }

    if (password !== confirmPassword) {
      return { success: false, error: 'Passwords do not match' };
    }

    // Check if user already exists
    if (users.find(u => u.email === email || u.username === username)) {
      return { success: false, error: 'User already exists with this email or username' };
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      username,
      email,
      password: encryptPassword(password),
      createdAt: new Date().toISOString()
    };

    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    return { success: true, user: { ...newUser, password: undefined } };
  };

  // Login user
  const login = ({ emailOrUsername, password, remember }) => {
    if (!emailOrUsername || !password) {
      return { success: false, error: 'Email/Username and password are required' };
    }

    const user = users.find(u => 
      u.email === emailOrUsername || u.username === emailOrUsername
    );

    if (!user) {
      return { success: false, error: 'Invalid credentials' };
    }

    try {
      const decrypted = decryptPassword(user.password);
      if (decrypted !== password) {
        return { success: false, error: 'Invalid credentials' };
      }
    } catch {
      return { success: false, error: 'Invalid credentials' };
    }

    setCurrentUser(user);
    setRememberMe(remember || false);
    return { success: true, user: { ...user, password: undefined } };
  };

  // Logout user
  const logout = () => {
    if (!rememberMe) {
      setCurrentUser(null);
    }
    setRememberMe(false);
    return { success: true };
  };

  // Get current user without password
  const getCurrentUser = () => {
    if (currentUser) {
      return { ...currentUser, password: undefined };
    }
    return null;
  };

  const isAuthenticated = () => {
    return currentUser !== null;
  };

  return (
    <AuthContext.Provider 
      value={{ 
        register, 
        login, 
        logout, 
        currentUser: getCurrentUser(), 
        isAuthenticated: isAuthenticated(),
        checkPasswordStrength,
        isValidEmail
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
