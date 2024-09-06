// src/components/TestHistory.js

import React, { useEffect, useState } from 'react';

function TestHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch('/api/lab-tests/history')
      .then(res => res.json())
      .then(data => setHistory(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Test History</h1>
      <ul>
        {history.map(test => (
          <li key={test.id}>
            {test.name} - {test.date} - {test.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TestHistory;