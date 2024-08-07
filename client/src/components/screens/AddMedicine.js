import React, { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const AddOrUpdateMedicineData = () => {
    const [medicineName, setMedicineName] = useState('');
    const [potency, setPotency] = useState('');
    const [company, setCompany] = useState('');
    const [issueUnit, setIssueUnit] = useState('');
    const [purchaseUnit, setPurchaseUnit] = useState('');
    const [itemTypeKey, setItemmType] = useState('');
    const [conversion, setConversion] = useState('');
    const [drugForm, setDrugForm] = useState('');
    const [uom, setUom] = useState('');
    const [packing_1, setPacking1] = useState('');
    const [packing_2, setPacking2] = useState('');
    const [patientDiscount, setPatientDiscount] = useState('');
    const [supplierName, setSupplierName] = useState('');
    const [batchNumber, setBatchNumber] = useState('');
    const [paymentMode, setPaymentMode] = useState('');
    const [paymentStatus, setPaymentStatus] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [packing, setPacking] = useState('');
    const [unit, setUnit] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [manufacturers, setManufacturers] = useState([]);
    const [qty, setQty] = useState('');
    const [perboxStrips, setPerboxStrips] = useState('');
    const [mrpPrice, setMrpPrice] = useState('');
    const [supplierDiscount, setSupplierDiscount] = useState('');
    const [supplierPrice, setSupplierPrice] = useState('');
    const [discount, setDiscount] = useState('');
    const [netSP, setNetSP] = useState('');
    const [gst, setGst] = useState('');
    const [salesPrice, setSalesPrice] = useState('');
    const [actStatus, setActStatus] = useState('');
    const [delStatus, setDelStatus] = useState('');
    const [category, setCategory] = useState('');
    const [hsnCode, setHsnCode] = useState('');
    const [genericName, setGenericName] = useState('');
    const [genericNames, setGenericNames] = useState([]);
    const [medicineType, setMedicineType] = useState('');
    const [medicineTypes, setMedicineTypes] = useState([]);
    const [medicineCategories, setMedicineCategories] = useState([]);
    const [error, setError] = useState(null);
    const history = useHistory();

    useEffect(() => {
      fetchMedicineTypes();
      fetchManufacturers();
      fetchMedicineCategories();
      fetchGenericNames();
  }, []);

  const fetchMedicineTypes = async () => {
    try {
      const response = await axios.get('/api/auth/medicineTypes');
      setMedicineTypes(response.data); // Assuming response.data is an array
    } catch (error) {
      console.error('Error fetching medicine types:', error);
      setError('Failed to fetch medicine types');
    }
  };

  
  const fetchManufacturers = async () => {
    try {
      const response = await axios.get('/api/auth/manufacturers');
      setManufacturers(response.data); // Assuming response.data is an array
    } catch (error) {
      console.error('Error fetching medicine types:', error);
      setError('Failed to fetch medicine types');
    }
  };

  const fetchMedicineCategories = async () => {
      try {
      const response = await axios.get('/api/auth/medicineCategories'); // Replace with your backend endpoint
      setMedicineCategories(response.data); // Assuming response.data is an array
    } catch (error) {
      console.error('Error fetching medicine types:', error);
      setError('Failed to fetch medicine types');
    }
  };

  const fetchGenericNames = async () => {
    try {
        const response = await axios.get('/api/auth/genericNames'); // Adjust endpoint as per your backend
        setGenericNames(response.data);
    } catch (error) {
        console.error('Error fetching generic names:', error);
        setError('Failed to fetch generic names');
    }
};

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "packing_1") setPacking1(value);
        else if (name === "packing_2") setPacking2(value);
        else if (name === "medicineType") setMedicineType(value);
        else if (name === "genericName") setGenericName(value);};

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("storeAuthToken");
            const decodedToken = jwt.decode(token);
            const storeId = decodedToken.store;

            // Create the packing format (e.g., 1X10)
            const packingFormat = `${packing_1}x${packing_2}`;

            const response = await axios.post('/api/auth/medicines', {
                storeId,
                medicineName,
                itemTypeKey,
                drugForm,
                issueUnit,
                purchaseUnit,
                conversion,
                patientDiscount,
                supplierName,
                batchNumber,
                paymentMode,
                paymentStatus,
                expiryDate,
                packing_1, // Ensure packing_1 is sent
                packing_2, // Ensure packing_2 is sent
                packing: packingFormat, // Send packing in 1X10 format
                unit,
                qty,
                perboxStrips,
                mrpPrice,
                supplierDiscount,
                supplierPrice,
                discount,
                netSP,
                gst,
                salesPrice,
                category,
                hsn_code: hsnCode,
                genericName,
                medicineType,
                manufacturer,
                potency,
                company,
                uom,
                createdBy: 'admin', // Placeholder, replace with actual user or fetch from token
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.success) {
                history.push('/storeadmin/manage-medicine-data');
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            console.error('Error adding or updating medicine data:', error);
            setError('Failed to add or update medicine data');
        }
    };

    return (
        <div className="card">
            <div className="card-body">
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6">
                            {/* First Column */}
                            <div className="form-group">
                                <label>Medicine Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={medicineName}
                                    onChange={(e) => setMedicineName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Supplier Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={supplierName}
                                    onChange={(e) => setSupplierName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Batch Number</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={batchNumber}
                                    onChange={(e) => setBatchNumber(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Payment Mode</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={paymentMode}
                                    onChange={(e) => setPaymentMode(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Payment Status</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={paymentStatus}
                                    onChange={(e) => setPaymentStatus(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Expiry Date</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={expiryDate}
                                    onChange={(e) => setExpiryDate(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            {/* Second Column */}
                            <div className="form-group">
                                <label>Unit</label>
                                <select
                                    className="form-control"
                                    value={unit}
                                    onChange={(e) => setUnit(e.target.value)}
                                    required
                                >
                                    <option value="">Select Unit</option>
                                    <option value="Strip">Strip</option>
                                    <option value="Miligram">Miligram</option>
                                    <option value="Piece">Piece</option>
                                    <option value="Box">Box</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Quantity</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={qty}
                                    onChange={(e) => setQty(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Packing (per strips)</label>
                                <div className="form-group bmd-form-group">
                                    <input
                                        type="number"
                                        id="packing_1"
                                        name="packing_1"
                                        value={packing_1}
                                        onChange={(e) => setPacking1(e.target.value)}
                                        className="form-control"
                                        style={{ width: '30%' }}
                                        required
                                    />
                                    <label className="col-form-label text-center"><i className="bx bx-x"></i></label>
                                    <input
                                        type="number"
                                        id="packing_2"
                                        name="packing_2"
                                        value={packing_2}
                                        onChange={(e) => setPacking2(e.target.value)}
                                        className="form-control"
                                        style={{ width: '55%' }}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Patient Discount</label>
                                <inputs
                                    type="number"
                                    className="form-control"
                                    value={patientDiscount}
                                    onChange={(e) => setPatientDiscount(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Per Box Strips</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={perboxStrips}
                                    onChange={(e) => setPerboxStrips(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>MRP Price</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={mrpPrice}
                                    onChange={(e) => setMrpPrice(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Third Row */}
                    <div className="row">
                        <div className="col-md-6">
                            {/* Third Column */}
                            <div className="form-group">
                                <label>Supplier Discount</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={supplierDiscount}
                                    onChange={(e) => setSupplierDiscount(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Supplier Price</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={supplierPrice}
                                    onChange={(e) => setSupplierPrice(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Discount</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={discount}
                                    onChange={(e) => setDiscount(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Net Sales Price</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={netSP}
                                    onChange={(e) => setNetSP(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>GST</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={gst}
                                    onChange={(e) => setGst(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Sales Price</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={salesPrice}
                                    onChange={(e) => setSalesPrice(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                         <div className="form-group">
                  <label>Medicine Category</label>
                  <select
                    className="form-control"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    <option value="">Select Medicine Category</option>
                    {medicineCategories.map((category) => (
                      <option key={category._id} value={category.medicineCategory}>
                        {category.category}
                      </option>
                    ))}
                  </select>
                </div>
                            <div className="form-group">
                                <label>HSN Code</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={hsnCode}
                                    onChange={(e) => setHsnCode(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Generic Name</label>
                                <select
                                    className="form-control"
                                    value={genericName} // This should be changed to selectedGenericName
                                    onChange={(e) => setGenericName(e.target.value)}
                                    name="genericName"
                                    required
                                >
                                    <option value="">Select Generic Name</option>
                                    {genericNames.map((name) => (
                                        <option key={name._id} value={name.genericName}>
                                            {name.genericName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                        <label>Potency</label>
                        <input
                            type="text"
                            className="form-control"
                            value={potency}
                            onChange={(e) => setPotency(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Company</label>
                        <input
                            type="text"
                            className="form-control"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>UOM</label>
                        <input
                            type="text"
                            className="form-control"
                            value={uom}
                            onChange={(e) => setUom(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>ItemTypeKey</label>
                        <input
                            type="text"
                            className="form-control"
                            value={itemTypeKey}
                            onChange={(e) => setItemmType(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>IssueUnit</label>
                        <input
                            type="text"
                            className="form-control"
                            value={issueUnit}
                            onChange={(e) => setIssueUnit(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Purchase Unit</label>
                        <input
                            type="text"
                            className="form-control"
                            value={purchaseUnit}
                            onChange={(e) => setPurchaseUnit(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Conversion</label>
                        <input
                            type="text"
                            className="form-control"
                            value={conversion}
                            onChange={(e) => setConversion(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Drug Form</label>
                        <input
                            type="text"
                            className="form-control"
                            value={drugForm}
                            onChange={(e) => setDrugForm(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
              <label>Medicine Type</label>
              <select
                className="form-control"
                value={medicineType}
                onChange={(e) => setMedicineType(e.target.value)}
                required
              >
                <option value="">Select Medicine Type</option>
                {medicineTypes.map((type) => (
                  <option key={type._id} value={type._id}>
                    {type.medicineType}
                  </option>
                ))}
              </select>
            </div>

            
            <div className="form-group">
                    <label>Manufacturer</label>
                    <select
                        className="form-control"
                        value={manufacturer}
                        onChange={(e) => setManufacturer(e.target.value)}
                        required
                    >
                        <option value="">Select Manufacturer</option>
                        {manufacturers.map((manufacturer) => (
                            <option key={manufacturer._id} value={manufacturer._id}>
                                {manufacturer.manufacturer}
                            </option>
                        ))}
                    </select>
                </div>
                        {/* </div> */}
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddOrUpdateMedicineData;