import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import ConfirmDialog from './ConfirmDialog';
import { toast } from 'react-toastify';

function Header({ onCartToggle, isCartOpen }) {
    const { currentUser, logout } = useAuth();
    const { cartCount } = useCart();
    const navigate = useNavigate();
    const [showLogoutDialog, setShowLogoutDialog] = useState(false);

    const handleLogout = () => {
        logout();
        toast.info('You have been logged out', {
            position: 'top-right',
            autoClose: 2000
        });
        navigate('/login');
        setShowLogoutDialog(false);
    };

    const getInitials = (username) => {
        return username ? username.substring(0, 2).toUpperCase() : 'U';
    };

    return (
        <>
            <header className="main-header">
                <div className="header-content">
                    <div className="header-left">
                        <h1 className="logo">🛒 QuickCart</h1>
                        <nav className="breadcrumb">
                            <span>Home</span> / <span className="active">Shop</span>
                        </nav>
                    </div>

                    <div className="header-right">
                        <div className="user-info">
                            <div className="user-avatar">
                                {getInitials(currentUser?.username)}
                            </div>
                            <div className="user-details">
                                <span className="user-name">{currentUser?.username}</span>
                                <span className="user-email">{currentUser?.email}</span>
                            </div>
                        </div>

                        <button
                            className="cart-button"
                            onClick={onCartToggle}
                            aria-label="Toggle cart"
                        >
                            🛒 Cart
                            {cartCount > 0 && (
                                <span className="cart-badge">{cartCount}</span>
                            )}
                        </button>

                        <button
                            className="logout-button"
                            onClick={() => setShowLogoutDialog(true)}
                            aria-label="Logout"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            {showLogoutDialog && (
                <ConfirmDialog
                    title="Confirm Logout"
                    message="Are you sure you want to logout?"
                    onConfirm={handleLogout}
                    onCancel={() => setShowLogoutDialog(false)}
                />
            )}
        </>
    );
}

export default Header;
