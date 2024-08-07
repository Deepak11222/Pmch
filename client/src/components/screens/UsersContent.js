import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Form, Button } from 'react-bootstrap';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import { useHistory } from 'react-router-dom';
import './UsersContent.css';


function UsersContent() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editSuccess, setEditSuccess] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [newUser, setNewUser] = useState({ username: "", email: "", password: "" });
  const history = useHistory();

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      history.push('/login');
    } else {
      fetchUserData();
    }
  }, [history]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get("/api/users");
      if (response.data.success) {
        // Assuming the username is stored in local storage
        const loggedInUsername = localStorage.getItem("username");
  
        // Filter the users array to get data for the logged-in user
        const loggedInUser = response.data.data.find(
          (user) => user.username === loggedInUsername
        );
  
        setUsers(loggedInUser ? [loggedInUser] : []);
      }
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  };
  
  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleEditChange = (e, field) => {
    setEditingUser({ ...editingUser, [field]: e.target.value });
  };

  const handleSave = async (user) => {
    try {
      const response = await axios.put(`/api/auth/update/${user._id}`, user);
      if (response.data.success) {
        setUsers((prevUsers) =>
          prevUsers.map((prevUser) =>
            prevUser._id === user._id ? user : prevUser
          )
        );
        setEditingUser(null);

        setEditSuccess(true);

        setTimeout(() => {
          setEditSuccess(false);
        }, 3000);
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this user?");
    if (isConfirmed) {
      try {
        await axios.delete(`/api/auth/delete/${id}`);
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));

        setDeleteSuccess(true);

        setTimeout(() => {
          setDeleteSuccess(false);
        }, 3000);
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const handleNewUserChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleNewUserSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/adduser", newUser);
      if (response.data.success) {
        setUsers([...users, response.data.data]);
        setNewUser({ username: "", email: "", password: "" });
      }
    } catch (error) {
      console.error("Error creating a new user:", error);
    }
  };

  return (
    

    <div className='container'>
      <div className='user-box'>
        <div className='user-box-heading'>
          <h2>User List</h2>
        </div>
      </div>

      {editSuccess && (
        <div className="alert alert-success">User edited successfully!</div>
      )}
      {deleteSuccess && (
        <div className="alert alert-success">User deleted successfully!</div>
      )}

      <table className='table table-bordered table-striped'>
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Username</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <div style={{ display: 'flex' }}>
                  <Button
                    variant="info"
                    onClick={() => handleEdit(user)}
                    style={{
                      width: '40px',
                      height: '40px',
                    }}
                    className="d-flex justify-content-center align-items-center"
                  >
                    <PencilSquare size={24} />
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(user._id)}
                    style={{
                      width: '40px',
                      height: '40px',
                      marginLeft: '5px',
                    }}
                    className="d-flex justify-content-center align-items-center"
                  >
                    <Trash size={24} />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingUser && (
        <Modal show={!!editingUser} onHide={() => setEditingUser(null)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="editUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={editingUser.username}
                  onChange={(e) => handleEditChange(e, 'username')}
                />
              </Form.Group>
              <Form.Group controlId="editEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  value={editingUser.email}
                  onChange={(e) => handleEditChange(e, 'email')}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setEditingUser(null)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => handleSave(editingUser)}
            >
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      <form onSubmit={handleNewUserSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="username"
            value={newUser.username}
            onChange={handleNewUserChange}
            placeholder="Username"
          />
          <input
            type="email"
            name="email"
            value={newUser.email}
            onChange={handleNewUserChange}
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            value={newUser.password}
            onChange={handleNewUserChange}
            placeholder="Password"
          />
          <button type="submit">Add User</button>
        </div>
      </form>
    </div>

  );
}

export default UsersContent;