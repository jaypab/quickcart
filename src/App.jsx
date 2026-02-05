import ProductList from './components/ProductList';
import { useCart } from './context/CartContext';

function App() {
  const { cartCount } = useCart();

  return (
    <div className="app">
      <header>
        <h1>🛒 QuickCart</h1>
        <p>Cart Items: {cartCount}</p>
      </header>
      <ProductList />
    </div>
  );
}

export default App;