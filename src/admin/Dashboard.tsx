import { CarFront, HandCoins } from "lucide-react";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [buyCount, setBuyCount] = useState(0);
  const [sellCount, setSellCount] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5000/api/cars")
      .then(res => res.json())
      .then(data => setBuyCount(data.length));

    fetch("http://localhost:5000/api/sell-cars", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then(res => res.json())
      .then(data => setSellCount(data.length));
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass p-6 rounded-xl flex justify-between">
          <div>
            <p>Total Buy Cars</p>
            <h2 className="text-3xl font-bold">{buyCount}</h2>
          </div>
          <CarFront className="w-10 h-10 text-primary" />
        </div>

        <div className="glass p-6 rounded-xl flex justify-between">
          <div>
            <p>Sell Requests</p>
            <h2 className="text-3xl font-bold">{sellCount}</h2>
          </div>
          <HandCoins className="w-10 h-10 text-primary" />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
