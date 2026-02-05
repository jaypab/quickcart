import { products } from '../data/products';
import ProductCard from './ProductCard';

function ProductList() {
  return (
    <div className="product-list">
      <h2>Our Products</h2>
      <div className="product-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;