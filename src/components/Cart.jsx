import { useState } from 'react';
import { useCart } from '../context/CartContext';
import ConfirmDialog from './ConfirmDialog';
import { toast } from 'react-toastify';

function Cart({ isOpen, onClose }) {
    const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotals } = useCart();
    const [itemToRemove, setItemToRemove] = useState(null);
    const [showClearDialog, setShowClearDialog] = useState(false);

    const totals = getCartTotals();

    const handleRemoveItem = (productId) => {
        setItemToRemove(productId);
    };

    const confirmRemove = () => {
        if (itemToRemove) {
            removeFromCart(itemToRemove);
            toast.info('Item removed from cart', {
                position: 'top-right',
                autoClose: 2000
            });
            setItemToRemove(null);
        }
    };

    const handleClearCart = () => {
        clearCart();
        toast.info('Cart cleared', {
            position: 'top-right',
            autoClose: 2000
        });
        setShowClearDialog(false);
    };

    const handleCheckout = () => {
        if (cartItems.length === 0) {
            toast.warning('Your cart is empty!', {
                position: 'top-right',
                autoClose: 2000
            });
            return;
        }

        toast.success('Order placed successfully! (Demo)', {
            position: 'top-right',
            autoClose: 3000
        });
        clearCart();
        onClose();
    };

    const handleIncrement = (item) => {
        updateQuantity(item.id, item.quantity + 1);
    };

    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            updateQuantity(item.id, item.quantity - 1);
        } else {
            handleRemoveItem(item.id);
        }
    };

    return (
        <>
            <div className={`cart-overlay ${isOpen ? 'active' : ''}`} onClick={onClose} />

            <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
                <div className="cart-header">
                    <h2>🛒 Shopping Cart</h2>
                    <button className="cart-close" onClick={onClose} aria-label="Close cart">
                        ✕
                    </button>
                </div>

                <div className="cart-body">
                    {cartItems.length === 0 ? (
                        <div className="empty-cart">
                            <div className="empty-cart-icon">🛒</div>
                            <h3>Your cart is empty</h3>
                            <p>Start adding some items to your cart!</p>
                        </div>
                    ) : (
                        <>
                            <div className="cart-items">
                                {cartItems.map(item => (
                                    <div key={item.id} className="cart-item">
                                        <img src={item.image} alt={item.name} className="cart-item-image" />

                                        <div className="cart-item-details">
                                            <h4>{item.name}</h4>
                                            <p className="cart-item-price">${item.price.toFixed(2)}</p>

                                            <div className="quantity-controls">
                                                <button
                                                    className="qty-btn"
                                                    onClick={() => handleDecrement(item)}
                                                    aria-label="Decrease quantity"
                                                >
                                                    −
                                                </button>
                                                <span className="quantity">{item.quantity}</span>
                                                <button
                                                    className="qty-btn"
                                                    onClick={() => handleIncrement(item)}
                                                    aria-label="Increase quantity"
                                                >
                                                    +
                                                </button>
                                            </div>

                                            <p className="cart-item-subtotal">
                                                Subtotal: ${(item.price * item.quantity).toFixed(2)}
                                            </p>
                                        </div>

                                        <button
                                            className="remove-item-btn"
                                            onClick={() => handleRemoveItem(item.id)}
                                            aria-label="Remove item"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="cart-summary">
                                <div className="summary-row">
                                    <span>Subtotal:</span>
                                    <span>${totals.subtotal}</span>
                                </div>
                                <div className="summary-row">
                                    <span>Tax (8%):</span>
                                    <span>${totals.tax}</span>
                                </div>
                                <div className="summary-row total">
                                    <span>Total:</span>
                                    <span>${totals.total}</span>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {cartItems.length > 0 && (
                    <div className="cart-footer">
                        <button
                            className="clear-cart-btn"
                            onClick={() => setShowClearDialog(true)}
                        >
                            Clear Cart
                        </button>
                        <button className="checkout-btn" onClick={handleCheckout}>
                            Checkout
                        </button>
                    </div>
                )}
            </div>

            {itemToRemove && (
                <ConfirmDialog
                    title="Remove Item"
                    message="Are you sure you want to remove this item from your cart?"
                    onConfirm={confirmRemove}
                    onCancel={() => setItemToRemove(null)}
                />
            )}

            {showClearDialog && (
                <ConfirmDialog
                    title="Clear Cart"
                    message="Are you sure you want to clear your entire cart?"
                    onConfirm={handleClearCart}
                    onCancel={() => setShowClearDialog(false)}
                />
            )}
        </>
    );
}

export default Cart;
