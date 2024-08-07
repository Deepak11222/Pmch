import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";
import "./Sidebar.css";

const Media = () => {
  const [showModal, setShowModal] = useState(false);
  const [imageEntries, setImageEntries] = useState([
    { id: 1, name: "Image 1", imageUrl: "https://via.placeholder.com/150" },
    { id: 2, name: "Image 2", imageUrl: "https://via.placeholder.com/150" },
  ]);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleFileUpload = (event) => {
    console.log("File uploaded:", event.target.files[0]);
  };

  const handleEditEntry = (id) => {
    // Example of handling edit action
    console.log("Edit entry with ID:", id);
  };

  const handleDeleteEntry = (id) => {
    // Example of handling delete action
    const updatedEntries = imageEntries.filter((entry) => entry.id !== id);
    setImageEntries(updatedEntries);
  };

  return (
    <div className="card">
      <div className="card-header" style={{ background: "#01a3ff" }}>
        <h4 className="card-title">Image Gallery</h4>
        <Button variant="primary" onClick={handleShowModal}>Add Image</Button>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {imageEntries.map((entry) => (
                <tr key={entry.id}>
                  <td>{entry.id}</td>
                  <td>{entry.name}</td>
                  <td><img src={entry.imageUrl} alt={entry.name} style={{ width: "50px" }} /></td>
                  <td>
                  <FaEdit style={{cursor:"pointer", color:"rgb(1, 163, 255", fontSize:21, marginRight:5}} onClick={() => handleEditEntry(entry.id)} / >
                  <MdDelete style={{cursor:"pointer", color:"red",  fontSize:21, marginLeft:5}} onClick={() => handleDeleteEntry(entry.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title:</label>
              <input type="text" className="form-control" id="title" />
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">Image:</label>
              <input type="file" className="form-control" id="image" onChange={handleFileUpload} />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
          <Button variant="primary" onClick={handleCloseModal}>Upload</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Media;