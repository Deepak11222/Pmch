import React, { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import axios from 'axios';

const StoreInfo = () => {
  const [store, setStoreId] = useState("");
  const [storeName, setStoreName] = useState("");

  const fetchStoreData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (token) {
        const decodedToken = jwt.decode(token);

        if (decodedToken && decodedToken.id) {
          const store = decodedToken.id;

          const response = await axios.get(`/api/auth/store/${store}`);

          if (response.data.success) {
            const { name } = response.data.data;
            setStoreId(store);
            setStoreName(name);
          } else {
            console.error("Failed to fetch store data:", response.data.message);
          }

        } else {
          console.error("Decoded token does not contain store ID");
        }
      } else {
        console.error("No token found in local storage");
      }
    } catch (error) {
      console.error("Error fetching store data:", error);
    }
  };

  useEffect(() => {
    fetchStoreData();
  }, []);

  return (
    <div className="store-info">
      <h3>{storeName}</h3>
    </div>
  );
};

export default StoreInfo;