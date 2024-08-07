import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';

const MedicinePurchaseForm = () => {
  const [medicines, setMedicines] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [customerInfo, setCustomerInfo] = useState({
    billToName: '',
    shipToName: '',
    billingAddress: {
      address1: '',
      city: '',
      state: '',
      postalCode: '',
      country: ''
    },
    shippingAddress: {
      address1: '',
      city: '',
      state: '',
      postalCode: '',
      country: ''
    }
  });

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      const token = localStorage.getItem('storeAuthToken');
      const decodedToken = jwt.decode(token);
      if (decodedToken && decodedToken.store) {
        const storeId = decodedToken.store;
        const response = await axios.get(`/api/auth/medicines/${storeId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.success) {
          setMedicines(response.data.data);
        } else {
          setError('Failed to fetch medicines');
        }
      } else {
        setError('Decoded token does not contain store ID');
      }
    } catch (error) {
      console.error('Error fetching medicines:', error);
      setError('Failed to fetch medicines');
    }
  };

  const handleMedicineChange = (e) => {
    const selectedId = e.target.value;
    const medicine = medicines.find(med => med._id === selectedId);
    setSelectedMedicine(medicine);
  };

  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo({
      ...customerInfo,
      [name]: value
    });
  };

  const handleAddressChange = (e, type) => {
    const { name, value } = e.target;
    setCustomerInfo({
      ...customerInfo,
      [type]: {
        ...customerInfo[type],
        [name]: value
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMedicine) {
      setError('Please select a medicine.');
      return;
    }

    try {
      const token = localStorage.getItem('storeAuthToken');
      const decodedToken = jwt.decode(token);
      const userId = decodedToken ? decodedToken.userId : null;

      const response = await axios.post('/api/auth/order', {
        userId,
        storeId: decodedToken.store,
        items: [{
          medicineId: selectedMedicine._id,
          medicineName: selectedMedicine.medicineName,
          quantity,
          price: selectedMedicine.price,
          total: selectedMedicine.price * quantity
        }],
        billToName: customerInfo.billToName,
        shipToName: customerInfo.shipToName,
        grandTotal: selectedMedicine.price * quantity,
        status: 'pending',
        billingAddress: customerInfo.billingAddress,
        shippingAddress: customerInfo.shippingAddress
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setSuccess('Order placed successfully.');
        // Optionally, clear the form or redirect the user
        setSelectedMedicine(null);
        setQuantity(1);
        setCustomerInfo({
          billToName: '',
          shipToName: '',
          billingAddress: {
            address1: '',
            city: '',
            state: '',
            postalCode: '',
            country: ''
          },
          shippingAddress: {
            address1: '',
            city: '',
            state: '',
            postalCode: '',
            country: ''
          }
        });
      } else {
        setError('Failed to place the order.');
      }
    } catch (error) {
      console.error('Error making purchase:', error);
      setError('Error making purchase.');
    }
  };

  return (
    <div>
      <h2>Purchase Medicine</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="medicine">Select Medicine</label>
          <select id="medicine" className="form-control" onChange={handleMedicineChange} value={selectedMedicine ? selectedMedicine._id : ''}>
            <option value="">Select...</option>
            {medicines.map(med => (
              <option key={med._id} value={med._id}>{med.medicineName}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            className="form-control"
            value={quantity}
            onChange={handleQuantityChange}
            min="1"
          />
        </div>
        <div className="form-group">
          <label htmlFor="billToName">Bill To Name</label>
          <input
            type="text"
            id="billToName"
            className="form-control"
            name="billToName"
            value={customerInfo.billToName}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="shipToName">Ship To Name</label>
          <input
            type="text"
            id="shipToName"
            className="form-control"
            name="shipToName"
            value={customerInfo.shipToName}
            onChange={handleInputChange}
          />
        </div>
        <h3>Billing Address</h3>
        <div className="form-group">
          <label htmlFor="billingAddress1">Address 1</label>
          <input
            type="text"
            id="billingAddress1"
            className="form-control"
            name="address1"
            value={customerInfo.billingAddress.address1}
            onChange={(e) => handleAddressChange(e, 'billingAddress')}
          />
        </div>
        <div className="form-group">
          <label htmlFor="billingCity">City</label>
          <input
            type="text"
            id="billingCity"
            className="form-control"
            name="city"
            value={customerInfo.billingAddress.city}
            onChange={(e) => handleAddressChange(e, 'billingAddress')}
          />
        </div>
        <div className="form-group">
          <label htmlFor="billingState">State</label>
          <input
            type="text"
            id="billingState"
            className="form-control"
            name="state"
            value={customerInfo.billingAddress.state}
            onChange={(e) => handleAddressChange(e, 'billingAddress')}
          />
        </div>
        <div className="form-group">
          <label htmlFor="billingPostalCode">Postal Code</label>
          <input
            type="text"
            id="billingPostalCode"
            className="form-control"
            name="postalCode"
            value={customerInfo.billingAddress.postalCode}
            onChange={(e) => handleAddressChange(e, 'billingAddress')}
          />
        </div>
        <div className="form-group">
          <label htmlFor="billingCountry">Country</label>
          <input
            type="text"
            id="billingCountry"
            className="form-control"
            name="country"
            value={customerInfo.billingAddress.country}
            onChange={(e) => handleAddressChange(e, 'billingAddress')}
          />
        </div>
        <h3>Shipping Address</h3>
        <div className="form-group">
          <label htmlFor="shippingAddress1">Address 1</label>
          <input
            type="text"
            id="shippingAddress1"
            className="form-control"
            name="address1"
            value={customerInfo.shippingAddress.address1}
            onChange={(e) => handleAddressChange(e, 'shippingAddress')}
          />
        </div>
        <div className="form-group">
          <label htmlFor="shippingCity">City</label>
          <input
            type="text"
            id="shippingCity"
            className="form-control"
            name="city"
            value={customerInfo.shippingAddress.city}
            onChange={(e) => handleAddressChange(e, 'shippingAddress')}
          />
        </div>
        <div className="form-group">
          <label htmlFor="shippingState">State</label>
          <input
            type="text"
            id="shippingState"
            className="form-control"
            name="state"
            value={customerInfo.shippingAddress.state}
            onChange={(e) => handleAddressChange(e, 'shippingAddress')}
          />
        </div>
        <div className="form-group">
          <label htmlFor="shippingPostalCode">Postal Code</label>
          <input
            type="text"
            id="shippingPostalCode"
            className="form-control"
            name="postalCode"
            value={customerInfo.shippingAddress.postalCode}
            onChange={(e) => handleAddressChange(e, 'shippingAddress')}
          />
        </div>
        <div className="form-group">
          <label htmlFor="shippingCountry">Country</label>
          <input
            type="text"
            id="shippingCountry"
            className="form-control"
            name="country"
            value={customerInfo.shippingAddress.country}
            onChange={(e) => handleAddressChange(e, 'shippingAddress')}
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default MedicinePurchaseForm;
