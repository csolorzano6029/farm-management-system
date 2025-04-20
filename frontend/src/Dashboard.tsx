import React, { useEffect, useState } from 'react';
import { getDashboardData } from './services/dashboardService';
import { DashboardData, ExpenseSummary, SaleSummary, WorkerSummary } from './types/dashboardTypes';
import './App.css';

const Dashboard: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dashboardData = await getDashboardData();
        setData(dashboardData);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch dashboard data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      {/* Worker Summary */}
      <section>
        <h2>Worker Summary</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Total Days Worked</th>
              <th>Total Pay ($)</th>
            </tr>
          </thead>
          <tbody>
            {data?.workerSummary?.map((worker: WorkerSummary) => (
              <tr key={worker.worker.id}>
                <td>{worker.worker.name}</td>
                <td>{worker.totalDaysWorked}</td>
                <td>{worker.totalPay?.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Sales Summary */}
      <section>
        <h2>Sales Summary</h2>
        <p><strong>Total Sales:</strong> ${data?.salesSummary.totalSales.toFixed(2)}</p>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {data?.salesSummary.sales.map((sale: SaleSummary) => (
              <tr key={sale.id}>
                <td>{sale.product}</td>
                <td>{sale.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Expense Summary */}
      <section>
        <h2>Expense Summary</h2>
        <p><strong>Total Expenses:</strong> ${data?.expenseSummary.totalExpenses.toFixed(2)}</p>
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Amount ($)</th>
            </tr>
          </thead>
          <tbody>
            {data?.expenseSummary.expenses.map((expense: ExpenseSummary) => (
              <tr key={expense.id}>
                <td>{expense.description}</td>
                <td>{expense.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Dashboard;
