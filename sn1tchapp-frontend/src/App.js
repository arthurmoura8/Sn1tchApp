import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import UserForm from './components/UserForm';
import GroupForm from './components/GroupForm';
import GroupList from './components/GroupList';
import AddUserToGroup from './components/AddUserToGroup';
import GitHubContributions from './components/GitHubContributions';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Sn1tchApp</h1>
        <nav>
          <ul>
            <li><Link to="/add-user">Add User</Link></li>
            <li><Link to="/add-group">Add Group</Link></li>
            <li><Link to="/groups">Group List</Link></li>
            <li><Link to="/add-user-to-group">Add User to Group</Link></li>
            <li><Link to="/github-contributions">GitHub Contributions</Link></li>
          </ul>
        </nav>
        <Switch>
          <Route path="/add-user" component={UserForm} />
          <Route path="/add-group" component={GroupForm} />
          <Route path="/groups" component={GroupList} />
          <Route path="/add-user-to-group" component={AddUserToGroup} />
          <Route path="/github-contributions" component={GitHubContributions} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
