import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [joinedOrgs, setJoinedOrgs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch the list of joined organizations on page load
    const fetchJoinedOrgs = async () => {
      const token = localStorage.getItem('token')
      try {
        const response = await axios.get('/api/user/joined-orgs', token);
        setJoinedOrgs(response.data);
      } catch (error) {
        console.error('Error fetching joined organizations:', error);
      }
    };
    fetchJoinedOrgs();
  }, []);

  useEffect(() => {
    // Debouncing search input
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.trim()) {
        fetchSearchResults(searchTerm);
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const fetchSearchResults = async (query) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`/api/organisations/search?query=${query}`, token);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Home Page</h1>
      <div>
        <input
          type="text"
          placeholder="Search organizations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '300px', padding: '10px', fontSize: '16px' }}
        />
        {loading && <p>Loading...</p>}
        {searchResults.length > 0 && (
          <ul>
            {searchResults.map((org) => (
              <li key={org._id}>{org.name}</li>
            ))}
          </ul>
        )}
      </div>
      <h2>Joined Organizations</h2>
      <ul>
        {joinedOrgs.map((org) => (
          <li key={org._id}>{org.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;

