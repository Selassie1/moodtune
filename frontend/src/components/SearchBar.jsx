import React from 'react';
import { FaSearch } from 'react-icons/fa';
import '../styles/search.css';

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <div className="searchContainer">
      <form onSubmit={handleSearch} className="searchForm">
        <input
          type="text"
          placeholder="Search songs, artists, or albums..."
          className="searchInput"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="searchButton">
          <FaSearch className="searchIcon" />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;