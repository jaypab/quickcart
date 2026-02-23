import { useState } from 'react';
import Header from '../components/Header';
import ProductList from '../components/ProductList';
import Cart from '../components/Cart';
import { useAuth } from '../context/AuthContext';

function Shop() {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { currentUser } = useAuth();

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    return (
        <div className="shop-page">
            <Header
                onCartToggle={toggleCart}
                isCartOpen={isCartOpen}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
            />

            <main className="shop-content">
                <div className="welcome-section">
                    <h2>Welcome, {currentUser?.username}! 👋</h2>
                    <p>Discover amazing products and add them to your cart</p>
                </div>

                <ProductList searchQuery={searchQuery} />
            </main>

            <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </div>
    );
}

export default Shop;
