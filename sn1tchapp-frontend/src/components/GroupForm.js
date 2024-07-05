import React, { useState } from 'react';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

function GroupForm() {
  const [className, setClassName] = useState('');
  const [period, setPeriod] = useState('');
  const [discipline, setDiscipline] = useState('');
  const [githubRepo, setGithubRepo] = useState('');
  const [googleDocsLink, setGoogleDocsLink] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/api/groups`, {
        class: className,
        period,
        discipline,
        githubRepo,
        googleDocsLink,
      });
      setMessage('Group created successfully!');
      console.log('Group created:', response.data);
      setClassName('');
      setPeriod('');
      setDiscipline('');
      setGithubRepo('');
      setGoogleDocsLink('');
    } catch (error) {
      setMessage('Error creating group.');
      console.error('Error creating group:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Add Group</h2>
        <input type="text" placeholder="Class" value={className} onChange={(e) => setClassName(e.target.value)} required />
        <input type="text" placeholder="Period" value={period} onChange={(e) => setPeriod(e.target.value)} required />
        <input type="text" placeholder="Discipline" value={discipline} onChange={(e) => setDiscipline(e.target.value)} required />
        <input type="text" placeholder="GitHub Repo" value={githubRepo} onChange={(e) => setGithubRepo(e.target.value)} required />
        <input type="text" placeholder="Google Docs Link" value={googleDocsLink} onChange={(e) => setGoogleDocsLink(e.target.value)} required />
        <button type="submit">Add Group</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default GroupForm;
