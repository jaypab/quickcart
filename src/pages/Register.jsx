import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

function Register() {
    const navigate = useNavigate();
    const { register, checkPasswordStrength, isValidEmail } = useAuth();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});
    const [passwordStrength, setPasswordStrength] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Real-time validation
        const newErrors = { ...errors };

        if (name === 'username') {
            if (value.length > 0 && value.length < 3) {
                newErrors.username = 'Username must be at least 3 characters';
            } else {
                delete newErrors.username;
            }
        }

        if (name === 'email') {
            if (value && !isValidEmail(value)) {
                newErrors.email = 'Invalid email format';
            } else {
                delete newErrors.email;
            }
        }

        if (name === 'password') {
            if (value) {
                const strength = checkPasswordStrength(value);
                setPasswordStrength(strength);
                if (!strength.isValid) {
                    newErrors.password = 'Password is too weak';
                } else {
                    delete newErrors.password;
                }
            } else {
                setPasswordStrength(null);
            }
        }

        if (name === 'confirmPassword') {
            if (value && value !== formData.password) {
                newErrors.confirmPassword = 'Passwords do not match';
            } else {
                delete newErrors.confirmPassword;
            }
        }

        setErrors(newErrors);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const result = register(formData);

        if (result.success) {
            toast.success('Registration successful! Welcome aboard!', {
                position: 'top-right',
                autoClose: 3000
            });
            navigate('/shop');
        } else {
            toast.error(result.error, {
                position: 'top-right',
                autoClose: 5000
            });
        }
    };

    const getStrengthColor = () => {
        if (!passwordStrength) return '';
        switch (passwordStrength.strength) {
            case 'weak': return '#ef4444';
            case 'medium': return '#f59e0b';
            case 'good': return '#3b82f6';
            case 'strong': return '#10b981';
            default: return '';
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h1>🛒 QuickCart</h1>
                    <h2>Create Account</h2>
                    <p>Join us and start shopping!</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className={errors.username ? 'error' : ''}
                            placeholder="Enter your username"
                            required
                        />
                        {errors.username && <span className="error-message">{errors.username}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={errors.email ? 'error' : ''}
                            placeholder="Enter your email"
                            required
                        />
                        {errors.email && <span className="error-message">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={errors.password ? 'error' : ''}
                            placeholder="Create a strong password"
                            required
                        />
                        {passwordStrength && (
                            <div className="password-strength">
                                <div className="strength-indicator">
                                    <div
                                        className="strength-bar"
                                        style={{
                                            width: `${(passwordStrength.strength === 'weak' ? 25 : passwordStrength.strength === 'medium' ? 50 : passwordStrength.strength === 'good' ? 75 : 100)}%`,
                                            backgroundColor: getStrengthColor()
                                        }}
                                    />
                                </div>
                                <span style={{ color: getStrengthColor() }}>
                                    Strength: {passwordStrength.strength.toUpperCase()}
                                </span>
                            </div>
                        )}
                        {errors.password && <span className="error-message">{errors.password}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={errors.confirmPassword ? 'error' : ''}
                            placeholder="Re-enter your password"
                            required
                        />
                        {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                    </div>

                    <button
                        type="submit"
                        className="auth-button"
                        disabled={Object.keys(errors).length > 0}
                    >
                        Create Account
                    </button>
                </form>

                <div className="auth-footer">
                    <p>
                        Already have an account? <Link to="/login">Sign In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;
