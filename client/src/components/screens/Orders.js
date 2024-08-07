import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoSearch } from "react-icons/io5";
import './Style.css';
import { Link } from 'react-router-dom';

const Orders = () => {
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3000/orders');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(data.map(row => row._id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleInputChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Escape') {
      setSearchKeyword('');
    }
  };

  const filteredData = data.filter(row => {
    return (
      row._id.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      (row.purchasePoint && row.purchasePoint.toLowerCase().includes(searchKeyword.toLowerCase())) ||
      (new Date(row.purchaseDate).toLocaleString().toLowerCase().includes(searchKeyword.toLowerCase())) ||
      (row.billToName && row.billToName.toLowerCase().includes(searchKeyword.toLowerCase())) ||
      (row.shipToName && row.shipToName.toLowerCase().includes(searchKeyword.toLowerCase())) ||
      (row.grandTotal && row.grandTotal.toString().toLowerCase().includes(searchKeyword.toLowerCase())) ||
      (row.status && row.status.toLowerCase().includes(searchKeyword.toLowerCase()))
    );
  });

  console.log('Filtered Data:', filteredData);

  return (
    <div className="card">
      <div className="card-header">
        <Link to="/admin/add-store" className="btns btn-primary">Create New Orders</Link>
        <div className="data-grid-search-control-wrap">
          <label 
            className="data-grid-search-label" 
            title="Search" 
            htmlFor="fulltext"
            onClick={() => document.getElementById('fulltext').focus()}
          ></label>
          <input 
            className="admin__control-text data-grid-search-control" 
            type="text" 
            id="fulltext" 
            placeholder="Search by keyword"
            value={searchKeyword}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
          />
          <button 
            className="action-submit" 
            type="button" 
            onClick={() => document.getElementById('fulltext').focus()}
          >
            <IoSearch />
          </button>
        </div>
      </div>
      <div className="admin__data-grid-wrap">
        <table className="data-grid">
          <thead>
            <tr>
              <th className="data-grid-multicheck-cell">
                <div className="action-multicheck-wrap">
                  <input 
                    type="checkbox" 
                    id="selectAll" 
                    onChange={handleSelectAll} 
                    checked={selectedRows.length === data.length}
                  />
                  <label htmlFor="selectAll"></label>
                </div>
              </th>
              <th className="data-grid-th">ID</th>
              <th className="data-grid-th">Purchase Point</th>
              <th className="data-grid-th">Purchase Date</th>
              <th className="data-grid-th">Bill-to Name</th>
              <th className="data-grid-th">Ship-to Name</th>
              <th className="data-grid-th">Grand Total</th>
              <th className="data-grid-th">Status</th>
              <th className="data-grid-th">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => (
              <tr key={index} className={index % 2 === 0 ? '_odd-row' : ''}>
                <td className="data-grid-checkbox-cell">
                  <label className="data-grid-checkbox-cell-inner">
                    <input 
                      type="checkbox" 
                      id={`idscheck${index}`} 
                      value={row._id} 
                      checked={selectedRows.includes(row._id)}
                      onChange={() => handleSelectRow(row._id)}
                    />
                    <label htmlFor={`idscheck${index}`}></label>
                  </label>
                </td>
                <td>{row.orderId}</td>
                <td>{row.purchasePoint}</td>
                <td>{new Date(row.purchaseDate).toLocaleString()}</td>
                <td>{row.billToName}</td>
                <td>{row.shipToName}</td>
                <td>{row.grandTotal}</td>
                <td>{row.status}</td>
                <td className="data-grid-actions-cell">
                  <Link to={`/admin/orderinfo/${row._id}`} className="action-menu-item">View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;