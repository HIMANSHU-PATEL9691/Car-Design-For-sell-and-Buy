import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const AdminSellRequests = () => {
  const [requests, setRequests] = useState<any[]>([]);

  const fetchRequests = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/sell-cars", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setRequests(data);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token");

    await fetch(`http://localhost:5000/api/sell-cars/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchRequests();
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Sell Car Requests</h1>

      <table className="w-full border">
        <thead>
          <tr>
            <th>Car</th>
            <th>KM</th>
            <th>Fuel</th>
            <th>Owner</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((r) => (
            <tr key={r._id}>
              <td>{r.brand} {r.model} ({r.year})</td>
              <td>{r.km}</td>
              <td>{r.fuel}</td>
              <td>{r.name}</td>
              <td>{r.phone}</td>
              <td>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(r._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminSellRequests;
