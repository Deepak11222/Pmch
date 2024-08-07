// UpdateUser.js

import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateUser = ({ match }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/auth/update/${match.params.id}`);
        setUser(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [match.params.id]);

  const handleUpdate = async () => {
    try {
      await axios.put(`/api/auth/update/${user._id}`, user);
      alert("User information updated successfully!");
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Edit User Information</h2>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </div>
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default UpdateUser;