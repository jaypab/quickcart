import { useCart } from '../context/CartContext';

function ProductCard({ product }) {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart(product);
        alert(`${product.name} added to cart!`); // Temporary feedback
    };

    return (
        <div className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p className="price">${product.price}</p>
            <p className="stock">Stock: {product.stock}</p>
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
                Add to Cart
            </button>
        </div>
    );
}

export default ProductCard;