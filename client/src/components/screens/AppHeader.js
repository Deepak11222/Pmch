import React from 'react';
import { Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '../screens/AppHeader.css'

const Home = () => <h1>Home Page</h1>;
const Users = () => <h1>Users Page</h1>;
const Products = () => <h1>Products Page</h1>;

const AppHeader = () => {
  return (
    <Router>
      <header className="app-header">
        <nav className="navbar">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/car" className="nav-link">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/users" className="nav-link">
                Users
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/products" className="nav-link">
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <Switch>
        {/* <Route path="/" exact component={Home} /> */}
        {/* <Route path="/users" component={Users} /> */}
        {/* <Route path="/products" component={Products} /> */}
      </Switch>
    </Router>
  );
};

export default AppHeader;