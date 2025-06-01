import React, { useState } from 'react';
import '../styles/browse.css';
import { FaLayerGroup } from "react-icons/fa";

const SongCategories = ({ onSelectCategory }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    { id: 1, name: 'Pop', color: '#6D9E6F' },
    { id: 2, name: 'Rock', color: '#FFB7B2' },
    { id: 3, name: 'Hip Hop', color: '#FFDAC1' },
    { id: 4, name: 'R&B', color: '#E2F0CB' },
    { id: 5, name: 'Jazz', color: '#B5EAD7' },
    { id: 6, name: 'Classical', color: '#C7CEEA' },
    { id: 7, name: 'Electronic', color: '#F8B195' },
    { id: 8, name: 'Country', color: '#F67280' },
    { id: 9, name: 'Reggae', color: '#6C5B7B' },
    { id: 10, name: 'Metal', color: '#4F8266' },
    { id: 11, name: 'Blues', color: '#A8E6CE' },
    { id: 12, name: 'Folk', color: '#DCEDC2' },
    { id: 13, name: 'Indie', color: '#FFD3B5' },
    { id: 14, name: 'K-Pop', color: '#FFAAA6' },
    { id: 15, name: 'Love', color: '#FF8C94' },
  ];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setIsVisible(false); // Hide after selection
    if (onSelectCategory) {
      onSelectCategory(category);
    }
  };

  return (
    <div className="categories-container">
      <button 
        className="toggle-button"
        onClick={() => setIsVisible(!isVisible)}
      >
        <FaLayerGroup className='browse-btn' onClick={isVisible}/>
      </button>

      {isVisible && (
        <div className="categories-list">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`category-item ${selectedCategory?.id === category.id ? 'selected' : ''}`}
              style={{ backgroundColor: category.color }}
              onClick={() => handleCategoryClick(category)}
            >
              {category.name}
            </div>
          ))}
        </div>
      )}

      {selectedCategory && !isVisible && (
        <div className="selected-category" style={{ backgroundColor: selectedCategory.color }}>
          Selected: {selectedCategory.name}
        </div>
      )}
    </div>
  );
};

export default SongCategories;