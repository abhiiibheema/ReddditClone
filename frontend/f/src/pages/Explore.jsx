import { useState, useEffect } from 'react';
import axios from 'axios';
import './Explore.css';

function Explore() {
  const [groupedOrgs, setGroupedOrgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await axios.get('http://localhost:4000/test/orgs/organizations-by-tags');
        setGroupedOrgs(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching organizations:', err);
        setError('Failed to load organizations. Please try again.');
        setLoading(false);
      }
    };

    fetchOrganizations();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="explore-container">
      <header className="header">
        <h1>Explore</h1>
      </header>
      <main className="main-content">
        {groupedOrgs.map((group) => (
          <section key={group._id} className="tag-section">
            <h1 className="tag-title">{group._id}</h1>
            <ul className="organization-list">
              {group.organizations.map((org) => (
                <li key={org._id} className="organization-item">
                  <strong>{org.name}</strong>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </main>
    </div>
  );
}

export default Explore;
