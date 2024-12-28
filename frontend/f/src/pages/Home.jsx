import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HomePage.css';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.trim()) {
        fetchSearchResults(searchTerm);
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const fetchSearchResults = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:4000/test/orgs/search-organisations/${searchTerm}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="homepage-container">
      <div className="search-box">
        <h1>Search Organizations</h1>
        <input
          type="text"
          className="search-input"
          placeholder="Search organizations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {loading && <p className="loading-text">Loading...</p>}
        {searchResults.length > 0 && (
          <ul className="results-list">
            {searchResults.map((org) => (
              <li key={org._id} className="result-item">{org.name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default HomePage;
