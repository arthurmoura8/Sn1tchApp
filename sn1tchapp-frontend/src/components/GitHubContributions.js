import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

function GitHubContributions() {
  const [groups, setGroups] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState('');
  const [contributions, setContributions] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/groups`);
        setGroups(response.data);
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };
    fetchGroups();
  }, []);

  const handleFetchContributions = async (e) => {
    e.preventDefault();
    if (!selectedGroupId) {
      return alert('Please select a group');
    }
    try {
      const response = await axios.get(`${apiUrl}/api/contributions/github/${selectedGroupId}`);
      setContributions(response.data);
    } catch (error) {
      console.error('Error fetching GitHub contributions:', error);
    }
  };

  return (
    <div>
      <h2>GitHub Contributions</h2>
      <select value={selectedGroupId} onChange={(e) => setSelectedGroupId(e.target.value)}>
        <option value="">Select Group</option>
        {groups.map(group => (
          <option key={group._id} value={group._id}>
            {group.name} - {group.discipline} - {group.class} - {group.period}
          </option>
        ))}
      </select>
      <button type="button" onClick={handleFetchContributions} disabled={!selectedGroupId}>
        Fetch Contributions
      </button>
      <table>
        <thead>
          <tr>
            <th>Contributor</th>
            <th>Contributions</th>
          </tr>
        </thead>
        <tbody>
          {contributions.map(contributor => (
            <tr key={contributor.id}>
              <td>{contributor.login}</td>
              <td>{contributor.contributions}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GitHubContributions;
