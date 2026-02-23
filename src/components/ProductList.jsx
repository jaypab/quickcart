import { useState } from 'react';
import { products, categories } from '../data/products';
import ProductCard from './ProductCard';

function ProductList({ searchQuery = '' }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProducts = products.filter(product => {
    const matchesSearch = searchQuery.trim()
      ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    const matchesCategory = activeCategory === 'All'
      ? true
      : product.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="product-list">
      <h2>
        {searchQuery.trim()
          ? `Search Results for "${searchQuery}"`
          : 'Our Products'}
      </h2>

      {/* Category Filter */}
      <div className="category-filter">
        <button
          className={`category-btn ${activeCategory === 'All' ? 'active' : ''}`}
          onClick={() => setActiveCategory('All')}
        >
          All
        </button>
        {categories.map(category => (
          <button
            key={category}
            className={`category-btn ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

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
          <p>Try searching with different keywords or changing the category filter</p>
        </div>
      )}
    </div>
  );
}

export default ProductList;