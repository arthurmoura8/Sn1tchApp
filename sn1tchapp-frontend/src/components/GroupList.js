import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

function GroupList() {
  const [groups, setGroups] = useState([]);

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

  return (
      <div>
        <h2>Group List</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Classe</th>
              <th>Período</th>
              <th>Disciplina</th>
              <th>Nome</th>
              <th>GitHub</th>
              <th>Docs</th>
            </tr>
          </thead>
          <tbody>
            {groups.map((group) => (
              <tr key={group._id}>
                <td>{group._id}</td>
                <td>{group.class}</td>
                <td>{group.period}</td>
                <td>{group.discipline}</td>
                <td>{group.name}</td>
                <td>{group.githubRepo}</td>
                <td>{group.googleDocsLink}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}

export default GroupList;
