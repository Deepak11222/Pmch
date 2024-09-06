import React, { useState, useEffect } from "react";
import axios from "axios";

const TestBookingPage = () => {
  const [tests, setTests] = useState([]); // Available lab tests
  const [cart, setCart] = useState([]); // Tests added to cart
  const [bookingStatus, setBookingStatus] = useState("");

  // Fetch lab tests from the backend
  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axios.get("/lab-tests"); // Adjust the API route as necessary
        setTests(response.data);
      } catch (error) {
        console.error("Error fetching lab tests", error);
      }
    };
    fetchTests();
  }, []);

  // Handle adding test to cart
  const addToCart = (test) => {
    if (!cart.find((item) => item._id === test._id)) {
      setCart([...cart, test]);
    }
  };

  // Handle booking the selected tests
  const handleBooking = async () => {
    try {
      const response = await axios.post("/api/bookings", {
        tests: cart.map((test) => ({
          testId: test._id,
          testName: test.name,
        })),
      });
      setBookingStatus("Booking successful!");
      setCart([]); // Clear the cart after booking
    } catch (error) {
      console.error("Error booking tests", error);
      setBookingStatus("Booking failed. Please try again.");
    }
  };

  return (
    <div className="container">
      <h1>Book Lab Tests</h1>

      {/* Display available lab tests */}
      <div className="tests-list">
        <h2>Available Tests</h2>
        <ul>
          {tests.map((test) => (
            <li key={test._id}>
              <span>{test.name}</span>
              <button onClick={() => addToCart(test)}>Add to Cart</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Display selected tests (cart) */}
      <div className="cart">
        <h2>Your Cart</h2>
        <ul>
          {cart.map((test) => (
            <li key={test._id}>{test.name}</li>
          ))}
        </ul>
        {cart.length > 0 && (
          <button onClick={handleBooking}>Book Selected Tests</button>
        )}
      </div>

      {/* Display booking status */}
      {bookingStatus && <p>{bookingStatus}</p>}
    </div>
  );
};

export default TestBookingPage;