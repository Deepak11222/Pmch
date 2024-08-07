// import React, { useState } from "react";
// import "./Adminabout.css";
// // import "./Sidebar.css";

// const Adminabout = () => {
//     // const [showModal, setShowModal] = useState(false);
//     const [imageEntries, setImageEntries] = useState([
//         { id: 1, name: "Image 1", imageUrl: "https://via.placeholder.com/150" },
//         { id: 2, name: "Image 2", imageUrl: "https://via.placeholder.com/150" },
//     ]);

//     // const handleShowModal = () => setShowModal(true);
//     // const handleCloseModal = () => setShowModal(false);

//     const handleFileUpload = (event) => {
//         console.log("File uploaded:", event.target.files[0]);
//     };

//     const handleEditEntry = (id) => {
//         // Example of handling edit action
//         console.log("Edit entry with ID:", id);
//     };

//     const handleDeleteEntry = (id) => {
//         // Example of handling delete action
//         const updatedEntries = imageEntries.filter((entry) => entry.id !== id);
//         setImageEntries(updatedEntries);
//     };

//     return (
//         <div className="card">
//             <div className="card-header">
//                 <h4 className="card-title">Table Filtering</h4>
//             </div>
//             <div className="card-body">
//                 <div className="table-responsive">
//                 <div>
//                     <div style={{marginRight: "91%"}}>Search :</div>
//                       <input className="ml-2 input-search form-control" value="" style={{ width: "20%" }} /></div>

//                     <table role="table" className="table dataTable display">
//                         <thead style={{backgroundColor:"blue"}}>
//                             <tr role="row">
//                                 <th colspan="1" role="columnheader">Id<div><input className="form-control input-search" value="" /></div></th>
//                                 <th colspan="1" role="columnheader">First Name<div><input className="form-control input-search" value="" /></div></th>
//                                 <th colspan="1" role="columnheader">Last Name<div><input className="form-control input-search" value="" /></div></th>
//                                 <th colspan="1" role="columnheader">Email Id<div><input className="form-control input-search" value="" /></div></th>
//                                 <th colspan="1" role="columnheader">Date of Birth<div><input className="form-control input-search" value="" /></div></th>
//                                 <th colspan="1" role="columnheader">Country<div><input className="form-control input-search" value="" /></div></th>
//                                 <th colspan="1" role="columnheader">Phone<div><input className="form-control input-search" value="" /></div></th>
//                             </tr>
//                         </thead>
//                         <tbody role="rowgroup" className="">
//                         <tr role="row"><td role="cell"> 1 </td><td role="cell"> Aldous </td><td role="cell"> Drissell </td><td role="cell"> adrissell0@edublogs.org </td><td role="cell"> 05/48/2015 </td><td role="cell"> Malaysia </td><td role="cell"> 8898927667 </td></tr>
//                             {/* Additional rows go here */}
//                         </tbody>
//                     </table>
//                     <div class="d-flex justify-content-between"><span>Page <strong>1 of 20</strong></span><span class="table-index">Go to page :  <input type="number" class="ml-2" value="1"/></span></div>
//                     <div class="text-center mb-3"><div class="filter-pagination  mt-3"><button class=" previous-button" disabled="">&lt;&lt;</button><button class="previous-button" disabled="">Previous</button><button class="next-button">Next</button><button class=" next-button">&gt;&gt;</button></div></div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Adminabout;
