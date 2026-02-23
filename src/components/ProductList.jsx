import { useState } from 'react';
import { products, categories } from '../data/products';
import ProductCard from './ProductCard';

function ProductList({ searchQuery = '' }) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [appliedCategories, setAppliedCategories] = useState([]);

  const handleCategoryToggle = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleApply = () => {
    setAppliedCategories([...selectedCategories]);
  };

  const handleReset = () => {
    setSelectedCategories([]);
    setAppliedCategories([]);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = searchQuery.trim()
      ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    const matchesCategory = appliedCategories.length === 0
      ? true
      : appliedCategories.includes(product.category);

    return matchesSearch && matchesCategory;
  });

  // Count products per category
  const categoryCounts = {};
  categories.forEach(cat => {
    categoryCounts[cat] = products.filter(p => p.category === cat).length;
  });

  return (
    <div className="product-list-layout">
      {/* Sidebar Filter Panel */}
      <aside className="filter-sidebar">
        <div className="filter-sidebar-header">
          <div className="filter-title">
            <span className="filter-icon">☰</span>
            <h3>Filters</h3>
          </div>
          <button className="filter-apply-btn" onClick={handleApply}>
            ✓ Apply
          </button>
        </div>

        <div className="filter-section">
          <div className="filter-section-title">
            <span className="filter-section-icon">🏷️</span>
            <h4>Category</h4>
          </div>
          <div className="filter-options">
            {categories.map(category => (
              <label key={category} className="filter-checkbox-label">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryToggle(category)}
                />
                <span className="custom-checkbox"></span>
                <span className="filter-option-text">{category}</span>
                <span className="filter-option-count">({categoryCounts[category]})</span>
              </label>
            ))}
          </div>
        </div>

        <div className="filter-sidebar-footer">
          <button className="filter-reset-btn" onClick={handleReset}>
            ↻ Reset Filters
          </button>
        </div>
      </aside>

      {/* Products Section */}
      <div className="product-list">
        <h2>
          {searchQuery.trim()
            ? `Search Results for "${searchQuery}"`
            : 'Our Products'}
        </h2>

        {appliedCategories.length > 0 && (
          <div className="active-filters">
            <span className="active-filters-label">Active:</span>
            {appliedCategories.map(cat => (
              <span key={cat} className="active-filter-tag">
                {cat}
                <button onClick={() => {
                  const updated = appliedCategories.filter(c => c !== cat);
                  setAppliedCategories(updated);
                  setSelectedCategories(updated);
                }}>×</button>
              </span>
            ))}
          </div>
        )}

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
    </div>
  );
}

export default ProductList;