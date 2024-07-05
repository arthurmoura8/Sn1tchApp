import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

function AddUserToGroup() {
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');

  useEffect(() => {
    const fetchUsersAndGroups = async () => {
      try {
        const usersResponse = await axios.get(`${apiUrl}/api/users`);
        setUsers(usersResponse.data);
        const groupsResponse = await axios.get(`${apiUrl}/api/groups`);
        setGroups(groupsResponse.data);
      } catch (error) {
        console.error('Error fetching users or groups:', error);
      }
    };
    fetchUsersAndGroups();
  }, []);

  const handleAddUserToGroup = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiUrl}/api/groups/${selectedGroup}/users/${selectedUser}`);
      console.log('User added to group');
    } catch (error) {
      console.error('Error adding user to group:', error);
    }
  };

  return (
    <form onSubmit={handleAddUserToGroup}>
      <h2>Add User to Group</h2>
      <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)} required>
        <option value="">Select User</option>
        {users.map(user => (
          <option key={user._id} value={user._id}>
            {user.name}
          </option>
        ))}
      </select>
      <select value={selectedGroup} onChange={(e) => setSelectedGroup(e.target.value)} required>
        <option value="">Select Group</option>
        {groups.map(group => (
          <option key={group._id} value={group._id}>
            {group.class} - {group.period} - {group.discipline}
          </option>
        ))}
      </select>
      <button type="submit">Add User to Group</button>
    </form>
  );
}

export default AddUserToGroup;
