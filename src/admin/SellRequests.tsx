import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const SellRequests = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const token = localStorage.getItem("token");

  const fetchData = async () => {
    const res = await fetch("http://localhost:5000/api/sell-cars", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setRequests(await res.json());
  };

  const updateStatus = async (id: string, status: string) => {
    await fetch(`http://localhost:5000/api/sell-cars/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });
    fetchData();
  };

  useEffect(() => { fetchData(); }, []);

  return (
    <>
      <h2 className="text-2xl font-bold mb-6">Sell Car Requests</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {requests.map((r) => (
          <div key={r._id} className="glass p-6 rounded-xl space-y-3">
            <h3 className="font-semibold">
              {r.brand} {r.model} ({r.year})
            </h3>

            <p>₹{r.expectedPrice}</p>

            <span className={`px-3 py-1 rounded-full text-xs
              ${r.status === "pending" && "bg-yellow-200"}
              ${r.status === "approved" && "bg-green-200"}
              ${r.status === "rejected" && "bg-red-200"}
            `}>
              {r.status}
            </span>

            <div className="flex gap-2">
              <Button size="sm" onClick={() => updateStatus(r._id, "approved")}>
                Approve
              </Button>
              <Button size="sm" variant="outline"
                onClick={() => updateStatus(r._id, "rejected")}>
                Reject
              </Button>
              <Button size="sm" variant="destructive">
                <Trash2 size={16} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SellRequests;
