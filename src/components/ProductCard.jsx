import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

function ProductCard({ product }) {
    const { addToCart } = useCart();
    const [isAdding, setIsAdding] = useState(false);

    const handleAddToCart = () => {
        if (product.stock === 0) return;

        setIsAdding(true);
        addToCart(product);

        toast.success(`${product.name} added to cart!`, {
            position: 'top-right',
            autoClose: 2000
        });

        // Reset animation
        setTimeout(() => setIsAdding(false), 300);
    };

    const getStockStatus = () => {
        if (product.stock === 0) {
            return { text: 'Out of Stock', className: 'out-of-stock' };
        } else if (product.stock <= 5) {
            return { text: `Low Stock (${product.stock} left)`, className: 'low-stock' };
        } else {
            return { text: `In Stock (${product.stock})`, className: 'in-stock' };
        }
    };

    const stockStatus = getStockStatus();

    return (
        <div className={`product-card ${isAdding ? 'adding' : ''}`}>
            <div className="product-image-container">
                <img src={product.image} alt={product.name} />
                {product.stock === 0 && <div className="out-of-stock-overlay">Out of Stock</div>}
            </div>

            <div className="product-info">
                <span className="product-category">{product.category}</span>
                <h3>{product.name}</h3>
                <p className="product-description">{product.description}</p>

                <div className="product-footer">
                    <p className="price">${product.price.toFixed(2)}</p>
                    <p className={`stock ${stockStatus.className}`}>{stockStatus.text}</p>
                </div>

                <button
                    className="add-to-cart-btn"
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                >
                    {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
            </div>
        </div>
    );
}

export default ProductCard;