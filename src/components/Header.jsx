import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import ConfirmDialog from './ConfirmDialog';
import { toast } from 'react-toastify';

function Header({ onCartToggle, isCartOpen, searchQuery, onSearchChange }) {
    const { currentUser, logout } = useAuth();
    const { cartCount } = useCart();
    const navigate = useNavigate();
    const [showLogoutDialog, setShowLogoutDialog] = useState(false);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const searchRef = useRef(null);

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

    // Filter products based on search query
    const filteredProducts = searchQuery.trim()
        ? products.filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : [];

    const showDropdown = isSearchFocused && searchQuery.trim().length > 0;

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setIsSearchFocused(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleResultClick = (productName) => {
        onSearchChange(productName);
        setIsSearchFocused(false);
        // Scroll to the product grid
        const productGrid = document.querySelector('.product-grid');
        if (productGrid) {
            productGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const clearSearch = () => {
        onSearchChange('');
        setIsSearchFocused(false);
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

                    <div className="header-search" ref={searchRef}>
                        <div className="search-input-wrapper">
                            <span className="search-icon">🔍</span>
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => onSearchChange(e.target.value)}
                                onFocus={() => setIsSearchFocused(true)}
                                aria-label="Search products"
                            />
                            {searchQuery && (
                                <button
                                    className="search-clear"
                                    onClick={clearSearch}
                                    aria-label="Clear search"
                                >
                                    ✕
                                </button>
                            )}
                        </div>

                        {showDropdown && (
                            <div className="search-dropdown">
                                {filteredProducts.length > 0 ? (
                                    <>
                                        <div className="search-dropdown-header">
                                            {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''} found
                                        </div>
                                        {filteredProducts.map(product => (
                                            <div
                                                key={product.id}
                                                className="search-result-item"
                                                onClick={() => handleResultClick(product.name)}
                                            >
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="search-result-image"
                                                />
                                                <div className="search-result-info">
                                                    <span className="search-result-name">{product.name}</span>
                                                    <span className="search-result-category">{product.category}</span>
                                                </div>
                                                <span className="search-result-price">
                                                    ${product.price.toFixed(2)}
                                                </span>
                                            </div>
                                        ))}
                                    </>
                                ) : (
                                    <div className="search-no-results">
                                        <span>😕</span>
                                        <p>No products found for "<strong>{searchQuery}</strong>"</p>
                                    </div>
                                )}
                            </div>
                        )}
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

