import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CommnetsSection = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get('http://localhost:3000/comments');
        setComments(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  if (loading) return <p>Loading comments...</p>;
  if (error) return <p>Error fetching comments: {error.message}</p>;

  return (
    <div className="superadmin-dashboard">
      {/* <h1>Super Admin Dashboard</h1> */}
      {/* Other dashboard sections/components */}
      
      <div className="comments-section">
  <h2 className='section-title'>Comments</h2>
  <table className="table table-bordered">
    <thead className="table-dark">
      <tr>
        <th>#</th> {/* Serial number column header */}
        <th>Customer Name</th>
        <th>Medicine Name</th>
        <th>Comment</th>
        <th>Rating</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
      {comments.map((comment, index) => (
        <tr key={comment._id}>
          <td>{index + 1}</td> {/* Serial number */}
          <td>{comment.customerId && comment.customerId.firstName ? `${comment.customerId.firstName} ${comment.customerId.lastName}` : 'N/A'}</td>
          <td>{comment.medicineId && comment.medicineId.medicineName ? comment.medicineId.medicineName : 'N/A'}</td>
          <td>{comment.comment}</td>
          <td>{comment.rating}</td>
          <td>{new Date(comment.createdAt).toLocaleDateString()}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
    </div>
  );
};

export default CommnetsSection;
