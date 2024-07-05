import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

function GitHubContributions() {
  const [groupId, setGroupId] = useState('');
  const [contributions, setContributions] = useState([]);

  const handleFetchContributions = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${apiUrl}/api/contributions/github/${groupId}`);
      setContributions(response.data);
    } catch (error) {
      console.error('Error fetching GitHub contributions:', error);
    }
  };

  return (
    <div>
      <h2>GitHub Contributions</h2>
      <form onSubmit={handleFetchContributions}>
        <input
          type="text"
          placeholder="Group ID"
          value={groupId}
          onChange={(e) => setGroupId(e.target.value)}
          required
        />
        <button type="submit">Fetch Contributions</button>
      </form>
      <ul>
        {contributions.map(contributor => (
          <li key={contributor.id}>
            {contributor.login} - {contributor.contributions} contributions
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GitHubContributions;
