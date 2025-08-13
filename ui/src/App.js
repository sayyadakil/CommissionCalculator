import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [fcamaraCommission, setFcamaraCommission] = useState(0);
  const [competitorCommission, setCompetitorCommission] = useState(0);

  const calculate = async (e) => {
    e.preventDefault();
    debugger;
    const formData = new FormData(e.target);
    const data = {
      localSalesCount: formData.get("localSalesCount"),
      foreignSalesCount: formData.get("foreignSalesCount"),
      averageSaleAmount: formData.get("averageSaleAmount"),
    };

    try {
      const response = await fetch("https://localhost:5000/Commision", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const result = await response.json();
      setFcamaraCommission(result.fCamaraCommissionAmount || 0);
      setCompetitorCommission(result.competitorCommissionAmount || 0);
    } catch (error) {
      console.error("Error calling API:", error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <form className="commission-form" onSubmit={calculate}>
          <label htmlFor="localSalesCount">Local Sales Count</label>
          <input name="localSalesCount" /><br />

          <label htmlFor="foreignSalesCount">Foreign Sales Count</label>
          <input name="foreignSalesCount" /><br />

          <label htmlFor="averageSaleAmount">Average Sale Amount</label>
          <input name="averageSaleAmount" /><br />

          <button type="submit">Calculate</button>
        </form>
      </header>

      <div>
        <h3>Results</h3>
        <p>Total FCamara commission: £{fcamaraCommission}</p>
        <p>Total Competitor commission: £{competitorCommission}</p>
      </div>
    </div>
  );
}

export default App;