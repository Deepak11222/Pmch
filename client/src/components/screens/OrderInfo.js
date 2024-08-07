import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Style.css'; // Ensure this file includes necessary styles

const OrderInfo = ({ setPageTitle }) => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [activeTab, setActiveTab] = useState('information'); // 'information' or 'invoices'
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track errors

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/orders/${orderId}`);
        setOrder(response.data);
        setLoading(false); // Update loading state
        setPageTitle(`# ${response.data.orderId}`); // Update the page title with orderId
      } catch (error) {
        console.error('Error fetching order:', error);
        setError('Error fetching order. Please try again.'); // Update error state
        setLoading(false); // Update loading state
      }
    };

    fetchOrder();
  }, [orderId, setPageTitle]);

  if (loading) {
    return <div className="order-info__loading">Loading...</div>;
  }

  if (error) {
    return <div className="order-info__error">{error}</div>;
  }

  if (!order) {
    return <div className="order-info__error">Order not found.</div>;
  }

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="order-info-container">
      <aside className="order-info-sidebar">
        <ul className="nav flex-column">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'information' ? 'active' : ''}`}
              onClick={() => handleTabClick('information')}
            >
              Information
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'invoices' ? 'active' : ''}`}
              onClick={() => handleTabClick('invoices')}
            >
              Invoices
            </button>
          </li>
        </ul>
      </aside>
      <main className="order-info-main-content">
        {activeTab === 'information' && (
          <div className="order-details">
            <h2 className="order-details-title">Order Information</h2>
            <div className="order-details-table">
              <table className="table">
                <tbody>
                  <tr>
                    <th>Order ID</th>
                    <td>{order.orderId}</td>
                  </tr>
                  <tr>
                    <th>Order Date</th>
                    <td>{new Date(order.purchaseDate).toLocaleString()}</td>
                  </tr>
                  <tr>
                    <th>Order Status</th>
                    <td>{order.status}</td>
                  </tr>
                  <tr>
                    <th>Purchased From</th>
                    <td>{order.purchasePoint}</td>
                  </tr>
                  <tr>
                    <th>Customer Name</th>
                    <td>{`${order.userId.firstName} ${order.userId.lastName}`}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td><a href={`mailto:${order.userId.email}`}>{order.userId.email}</a></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="order-details-title">Billing Address</h2>
            <div className="order-details-table">
              <table className="table">
                <tbody>
                  <tr>
                    <th>Address 1</th>
                    <td>{order.billingAddress.address1}</td>
                  </tr>
                  <tr>
                    <th>Address 2</th>
                    <td>{order.billingAddress.address2}</td>
                  </tr>
                  <tr>
                    <th>City</th>
                    <td>{order.billingAddress.city}</td>
                  </tr>
                  <tr>
                    <th>State</th>
                    <td>{order.billingAddress.state}</td>
                  </tr>
                  <tr>
                    <th>Postal Code</th>
                    <td>{order.billingAddress.postalCode}</td>
                  </tr>
                  <tr>
                    <th>Country</th>
                    <td>{order.billingAddress.country}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="order-details-title">Shipping Address</h2>
            <div className="order-details-table">
              <table className="table">
                <tbody>
                  <tr>
                    <th>Address 1</th>
                    <td>{order.shippingAddress.address1}</td>
                  </tr>
                  <tr>
                    <th>Address 2</th>
                    <td>{order.shippingAddress.address2}</td>
                  </tr>
                  <tr>
                    <th>City</th>
                    <td>{order.shippingAddress.city}</td>
                  </tr>
                  <tr>
                    <th>State</th>
                    <td>{order.shippingAddress.state}</td>
                  </tr>
                  <tr>
                    <th>Postal Code</th>
                    <td>{order.shippingAddress.postalCode}</td>
                  </tr>
                  <tr>
                    <th>Country</th>
                    <td>{order.shippingAddress.country}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="order-details-title">Order Items</h2>
            <div className="order-details-table">
              <table className="table">
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item, index) => (
                    <tr key={index}>
                      <td>{item.medicineName}</td>
                      <td>{item.quantity}</td>
                      <td>{item.price}</td>
                      <td>{item.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 className="order-details-title">Order Summary</h2>
            <div className="order-details-summary">
              <p><strong>Grand Total:</strong> {order.grandTotal}</p>
              <p><strong>Status:</strong> {order.status}</p>
            </div>
          </div>
        )}
        {activeTab === 'invoices' && (
          <div className="invoices">
            <h2 className="invoices-title">Invoices</h2>
            <div className="invoices-list">
              <p>Display invoices related to the order here.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default OrderInfo;