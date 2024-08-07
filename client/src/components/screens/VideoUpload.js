// import React, { useState } from "react";
// import { Modal, Button } from "react-bootstrap";
// import "./Sidebar.css";

// const AdminVideosPage = () => {
//   const [showModal, setShowModal] = useState(false);
//   // const [videoEntries, setVideoEntries] = useState([
//   //   { id: 1, name: "Video 1", videoUrl: "https://www.youtube.com/embed/VIDEO_ID_1" },
//   //   { id: 2, name: "Video 2", videoUrl: "https://www.youtube.com/embed/VIDEO_ID_2" },
//   // ]);

//   const handleShowModal = () => setShowModal(true);
//   const handleCloseModal = () => setShowModal(false);

//   const handleFileUpload = (event) => {
//     console.log("File uploaded:", event.target.files[0]);
//   };

//   // const handleEditEntry = (id) => {
//   //   // Example of handling edit action
//   //   console.log("Edit entry with ID:", id);
//   // };

//   // const handleDeleteEntry = (id) => {
//   //   // Example of handling delete action
//   //   const updatedEntries = videoEntries.filter((entry) => entry.id !== id);
//   //   setVideoEntries(updatedEntries);
//   // };

//   return (
//     <div className="card">
//       <div className="card-header" style={{ background: "#01a3ff" }}>
//         <h4 className="card-title">Video Gallery</h4>
//         <Button variant="primary" onClick={handleShowModal}>Add Video</Button>
//       </div>
//       <div className="card-body">
//         <div className="table-responsive">
//           <table className="table">
//             <thead>
//               <tr>
//                 <th>Id</th>
//                 <th>Name</th>
//                 <th>Video</th>
//                 {/* <th>Actions</th> */}
//               </tr>
//             </thead>
//             <tbody>
//               {videoEntries.map((entry) => (
//                 <tr key={entry.id}>
//                   <td>{entry.id}</td>
//                   <td>{entry.name}</td>
//                   <td>
//                     <iframe
//                       width="150"
//                       height="100"
//                       src={entry.videoUrl}
//                       title={entry.name}
//                       // frameBorder="0"
//                       allowFullScreen
//                     ></iframe>
//                   </td>
//                   <td>
//                     {/* <FaEdit
//                       style={{ cursor: "pointer", color: "rgb(1, 163, 255)", fontSize: 21, marginRight: 5 }}
//                       onClick={() => handleEditEntry(entry.id)}
//                     />
//                     <MdDelete
//                       style={{ cursor: "pointer", color: "red", fontSize: 21, marginLeft: 5 }}
//                       onClick={() => handleDeleteEntry(entry.id)}
//                     /> */}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <Modal show={showModal} onHide={handleCloseModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>Upload Video</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <form>
//             <div className="mb-3">
//               <label htmlFor="title" className="form-label">Title:</label>
//               <input type="text" className="form-control" id="title" />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="video" className="form-label">Video:</label>
//               <input type="file" className="form-control" id="video" onChange={handleFileUpload} />
//             </div>
//           </form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
//           <Button variant="primary" onClick={handleCloseModal}>Upload</Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default AdminVideosPage;