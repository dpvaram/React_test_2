import React, { useState, useEffect } from "react";

const TRANSACTION_DATA = [
  { id: 1, customer: "John Doe", date: "2021-01-01", amount: 120 },
  { id: 2, customer: "Jane Smith", date: "2021-01-05", amount: 75 },
  { id: 3, customer: "John Doe", date: "2021-02-10", amount: 50 },
  { id: 4, customer: "Jane Smith", date: "2021-02-15", amount: 200 },
  { id: 5, customer: "John Doe", date: "2021-03-20", amount: 150 },
  { id: 6, customer: "Jane Smith", date: "2021-03-25", amount: 80 },
];


const calculatePoints = (purchaseAmount) => {
  let rewardPoints = 0;
  
  if (purchaseAmount <= 50) {
    rewardPoints = 0;
  } else if (purchaseAmount <= 100) {
    rewardPoints = (purchaseAmount - 50) * 1;
  } else {
    rewardPoints = (purchaseAmount - 100) * 2 + 50;
  }
  
  return rewardPoints;
}


const calculateMonthlyPoints = (transactions) => {
  const monthlyPoints = {};
  for (let i = 0; i < transactions.length; i++) {
    const { customer, date, amount } = transactions[i];
    const month = date.slice(0, 7);
    const points = calculatePoints(amount);
    if (!monthlyPoints[customer]) {
      monthlyPoints[customer] = {};
    }
    if (!monthlyPoints[customer][month]) {
      monthlyPoints[customer][month] = 0;
    }
    monthlyPoints[customer][month] += points;
  }
  return monthlyPoints;
};

const calculateTotalPoints = (transactions) => {
  const totalPoints = {};
  for (let i = 0; i < transactions.length; i++) {
    const { customer, amount } = transactions[i];
    const points = calculatePoints(amount);
    if (!totalPoints[customer]) {
      totalPoints[customer] = 0;
    }
    totalPoints[customer] += points;
  }
  return totalPoints;
};

const fetchTransactions = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(TRANSACTION_DATA);
    }, 1000);
  });
};

function App() {
  const [monthlyPoints, setMonthlyPoints] = useState({});
  const [totalPoints, setTotalPoints] = useState({});
  

  useEffect(() => {
    fetchTransactions().then((data) => {
      console.log(data)
      setMonthlyPoints(calculateMonthlyPoints(data));
      setTotalPoints(calculateTotalPoints(data));
    });
  }, []);
  
  return (
    <div>
      <h2>Monthly Points</h2>
      <table>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Month</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
         
          
          {Object.keys(monthlyPoints).map((customer) =>
            Object.keys(monthlyPoints[customer]).map((month) => (
              
              <tr key={`${customer}-${month}`}>
                <td>{customer}</td>
                <td>{month}</td>
                <td>{monthlyPoints[customer][month]}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <h2>Total Points</h2>
      <table>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(totalPoints).map((customer) => (
            <tr key={customer}>
              <td>{customer}</td>
              <td>{totalPoints[customer]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;