import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";

const StoreAdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');

  // Card counts
  const [newOrdersCount, setNewOrdersCount] = useState(0);
  const [salesData, setSalesData] = useState({ totalSales: 0, todaysSales: 0 });
  const [pendingOrdersCount, setPendingOrdersCount] = useState(0);
  const [completedOrdersCount, setCompletedOrdersCount] = useState(0);
  const [canceledOrdersCount, setCanceledOrdersCount] = useState(0);
  const [newCustomersCount, setNewCustomersCount] = useState(0);
  const [recentOrders, setRecentOrders] = useState([]);
  const [recentCustomers, setRecentCustomers] = useState([]);

  useEffect(() => {
    async function fetchSalesData() {
      try {
        const response = await axios.get('/total-sales'); // Change this to the correct endpoint
        // Ensure response.data has the expected structure
        setSalesData({
          totalSales: response.data.totalSales || 0,
          todaysSales: response.data.todaysSales || 0,
        });
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    }
  
    fetchSalesData();
  }, []);
  

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch orders and customers
        const ordersResponse = await axios.get('http://localhost:3000/orders');
        const orders = ordersResponse.data;
        const customersResponse = await axios.get('http://localhost:3000/customers');
        const customers = customersResponse.data.data;

        // Update orders and customers state
        setOrders(orders);
        setCustomers(customers);

        // Count orders by status
        const newOrdersToday = orders.filter((order) => {
          const orderDate = new Date(order.createdAt);
          const today = new Date();
          return orderDate.toDateString() === today.toDateString();
        });

        const pendingOrders = orders.filter(order => order.status === 'pending');
        const completedOrders = orders.filter(order => order.status === 'completed');
        const canceledOrders = orders.filter(order => order.status === 'canceled');

        // Count new customers (for example, those created today)
        const newCustomersToday = customers.filter((customer) => {
          const customerDate = new Date(customer.createdAt);
          const today = new Date();
          return customerDate.toDateString() === today.toDateString();
        });

        // Set card counts
        setNewOrdersCount(newOrdersToday.length);
        setPendingOrdersCount(pendingOrders.length);
        setCompletedOrdersCount(completedOrders.length);
        setCanceledOrdersCount(canceledOrders.length);
        setNewCustomersCount(newCustomersToday.length);

        // Set recent orders
        setRecentOrders(orders.slice(-5).reverse()); // Show the last 5 orders and reverse to display the most recent first

        // Set recent customers
        setRecentCustomers(customers.slice(-5).reverse()); // Show the last 5 customers and reverse to display the most recent first
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();

    // Set an interval to fetch dashboard data every minute
    const intervalId = setInterval(fetchDashboardData, 60000); // 60000 ms = 1 minute

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(orders.map(order => order._id));
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

  const filteredOrders = orders.filter(order => {
    return (
      order._id.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      (order.purchasePoint && order.purchasePoint.toLowerCase().includes(searchKeyword.toLowerCase())) ||
      (order.phone && order.phone.toLowerCase().includes(searchKeyword.toLowerCase())) ||
      (order.firstName && order.firstName.toLowerCase().includes(searchKeyword.toLowerCase())) ||
      (new Date(order.purchaseDate).toLocaleString().toLowerCase().includes(searchKeyword.toLowerCase())) ||
      (order.billToName && order.billToName.toLowerCase().includes(searchKeyword.toLowerCase())) ||
      (order.shipToName && order.shipToName.toLowerCase().includes(searchKeyword.toLowerCase())) ||
      (order.grandTotal && order.grandTotal.toString().toLowerCase().includes(searchKeyword.toLowerCase())) ||
      (order.status && order.status.toLowerCase().includes(searchKeyword.toLowerCase()))
    );
  });

  return (
    <div className="superadmin-dashboard">
    <div className="row">
      <div className="col-md-3">
        <Link to="/new-orders">
          <div className="card mini-stats-wid">
            <div className="card-body">
              <div className="media">
                <div className="media-body">
                  <p className="text-muted font-weight-medium">New Orders</p>
                  <h4 className="new-status mb-0">{newOrdersCount}</h4>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
      <div className="col-md-3">
        <Link to="/pending-orders">
          <div className="card mini-stats-wid">
            <div className="card-body">
              <div className="media">
                <div className="media-body">
                  <p className="text-muted font-weight-medium">Pending Orders</p>
                  <h4 className="pending-status mb-0">{pendingOrdersCount}</h4>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
      <div className="col-md-3">
        <Link to="/completed-orders">
          <div className="card mini-stats-wid">
            <div className="card-body">
              <div className="media">
                <div className="media-body">
                  <p className="text-muted font-weight-medium">Completed Orders</p>
                  <h4 className="completed-status mb-0">{completedOrdersCount}</h4>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
      <div className="col-md-3">
        <Link to="/canceled-orders">
          <div className="card mini-stats-wid">
            <div className="card-body">
              <div className="media">
                <div className="media-body">
                  <p className="text-muted font-weight-medium">Canceled Orders</p>
                  <h4 className="canceled-status mb-0">{canceledOrdersCount}</h4>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
    <div className="row">
      <div className="col-md-3">
        <Link to="/new-customers">
          <div className="card mini-stats-wid">
            <div className="card-body">
              <div className="media">
                <div className="media-body">
                  <p className="text-muted font-weight-medium">New Customers</p>
                  <h4 className="new-customers-status mb-0">{newCustomersCount}</h4>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>

                   {/* New Sales Card */}
                   <div className="col-md-3">
<div className="card mini-stats-wid">
  <div className="card-body">
    <div className="media">
      <div className="media-body">
        <div className="d-flex flex-column">
          <div className="sales-section d-flex justify-content-between">
            <p>Today's Sales:- </p>
            <p className="todays-sales-value">${salesData.todaysSales?.toFixed(2) || '0.00'}</p>
          </div>
          <div className="sales-section d-flex justify-content-between mt-2">
            <p>Total Sales:- </p>
            <p className="total-sales-value">${salesData.totalSales?.toFixed(2) || '0.00'}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>


      
    </div>

    <div className="recent-orders-section">
<h2 className="section-title">New Orders</h2>
<div className="recent-orders-table">
  <table className="table table-bordered">
    <thead className="table-dark">
      <tr>
        <th>#</th> {/* Serial number column header */}
        <th>Order ID</th>
        <th>Customer Name</th>
        <th>Phone</th>
        <th>Date</th>
        <th>Status</th>
        <th>Total</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {recentOrders.map((order, index) => (
        <tr key={order._id}>
          <td>{index + 1}</td> {/* Serial number */}
          <td>{order.orderId}</td>
          <td>{order.userId?.firstName || 'N/A'}</td>
          <td>{order.userId?.phone || 'N/A'}</td>
          <td>{new Date(order.createdAt).toLocaleDateString()}</td>
          <td>
            <span className={`status-label ${order.status.toLowerCase()}`}>
              {order.status}
            </span>
          </td>
          <td>${order.grandTotal.toFixed(2)}</td>
          <td>
            <Link to={`/admin/orderinfo/${order._id}`} className="btn btn-info btn-sm">View Details</Link>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
</div>
</div>
  );
};

export default StoreAdminDashboard;