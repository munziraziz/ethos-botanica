import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiGrid, FiList, FiChevronDown, FiX } from 'react-icons/fi';
import ProductCard from '../components/products/ProductCard';
import { products, categories } from '../data/products';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const cat = searchParams.get('category');
    const search = searchParams.get('search');
    if (cat) setSelectedCategory(cat);
    if (search) setSearchQuery(search);
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      );
    }

    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return filtered;
  }, [selectedCategory, searchQuery, sortBy, priceRange]);

  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    if (catId === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', catId);
    }
    setSearchParams(searchParams);
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSortBy('featured');
    setPriceRange([0, 100]);
    setSearchParams({});
  };

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-outfit text-4xl md:text-5xl font-black mb-2 text-brand-900">
            Our <span className="gradient-text">Products</span>
          </h1>
          <p className="text-brand-200">
            Explore our complete collection of premium organic & pharmacy products
          </p>
        </motion.div>

        {/* Search & Controls Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-200/50" size={18} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-11"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-200 hover:text-neon-green"
              >
                <FiX size={16} />
              </button>
            )}
          </div>

          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input-field appearance-none pr-10 cursor-pointer min-w-[180px]"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low → High</option>
              <option value="price-high">Price: High → Low</option>
              <option value="rating">Top Rated</option>
              <option value="name">Name A-Z</option>
            </select>
            <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-200 pointer-events-none" />
          </div>

          <div className="flex gap-1 bg-surface-300 rounded-xl p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2.5 rounded-lg transition-all ${
                viewMode === 'grid' ? 'bg-neon-green/15 text-neon-green' : 'text-brand-200 hover:text-brand-700'
              }`}
            >
              <FiGrid size={18} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2.5 rounded-lg transition-all ${
                viewMode === 'list' ? 'bg-neon-green/15 text-neon-green' : 'text-brand-200 hover:text-brand-700'
              }`}
            >
              <FiList size={18} />
            </button>
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`btn-outline flex items-center gap-2 md:hidden ${showFilters ? '!bg-neon-green/10' : ''}`}
          >
            <FiFilter size={16} />
            Filters
          </button>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-64 flex-shrink-0`}>
            <div className="glass-card p-5 sticky top-24 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-outfit font-bold text-lg text-brand-900">Filters</h3>
                <button onClick={clearFilters} className="text-xs text-neon-green hover:underline">
                  Clear All
                </button>
              </div>

              <div>
                <h4 className="font-outfit font-semibold text-sm text-brand-900 mb-3">Category</h4>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryChange(cat.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2
                               transition-all duration-200 ${
                                 selectedCategory === cat.id
                                   ? 'bg-neon-green/10 text-neon-green border border-neon-green/20'
                                   : 'text-brand-700 hover:text-brand-900 hover:bg-surface-300'
                               }`}
                    >
                      <span>{cat.icon}</span>
                      <span>{cat.name}</span>
                      <span className="ml-auto text-xs opacity-50">
                        {cat.id === 'all' ? products.length : products.filter(p => p.category === cat.id).length}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-outfit font-semibold text-sm text-brand-900 mb-3">Price Range</h4>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-neon-green"
                  />
                  <div className="flex items-center justify-between text-sm text-brand-200">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-brand-200">
                Showing <span className="text-brand-900 font-medium">{filteredProducts.length}</span> products
              </p>
              {(selectedCategory !== 'all' || searchQuery) && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-neon-green hover:underline flex items-center gap-1"
                >
                  <FiX size={14} /> Clear
                </button>
              )}
            </div>

            {filteredProducts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <span className="text-6xl mb-4 block">🔍</span>
                <p className="text-brand-700 text-xl mb-2">No products found</p>
                <p className="text-brand-200 mb-6">Try adjusting your filters or search term</p>
                <button onClick={clearFilters} className="btn-primary">
                  Clear Filters
                </button>
              </motion.div>
            ) : (
              <div className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'
                  : 'flex flex-col gap-4'
              }>
                {filteredProducts.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
