import { products } from '../data/products';
import ProductCard from './ProductCard';

function ProductList({ searchQuery = '' }) {
  const filteredProducts = searchQuery.trim()
    ? products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : products;

  return (
    <div className="product-list">
      <h2>
        {searchQuery.trim()
          ? `Search Results for "${searchQuery}"`
          : 'Our Products'}
      </h2>
      {filteredProducts.length > 0 ? (
        <div className="product-grid">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="no-results">
          <span className="no-results-icon">🔍</span>
          <h3>No products found</h3>
          <p>Try searching with different keywords</p>
        </div>
      )}
    </div>
  );
}

export default ProductList;