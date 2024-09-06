// src/components/TestDetails.js

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function TestDetails() {
  const { id } = useParams();
  const [test, setTest] = useState(null);

  useEffect(() => {
    fetch(`/api/lab-tests/${id}`)
      .then(res => res.json())
      .then(data => setTest(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!test) return <div>Loading...</div>;

  return (
    <div>
      <h1>{test.name}</h1>
      <p>{test.description}</p>
      <p>Price: ${test.price}</p>
      <p>Preparation Instructions: {test.preparationInstructions}</p>
      <Link to={`/test-booking/${test._id}`}>Book This Test</Link>
    </div>
  );
}

export default TestDetails;