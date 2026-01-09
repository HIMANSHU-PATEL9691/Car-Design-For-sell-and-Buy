import { useState, useEffect } from "react";
import {
  Trash2,
  Plus,
  Loader2,
  CarFront,
  HandCoins,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const { toast } = useToast();
  const token = localStorage.getItem("token");

  /* ================= BUY CARS ================= */
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    year: "",
    km: "",
    fuel: "Petrol",
    transmission: "Automatic",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  const fetchCars = async () => {
    const res = await fetch("http://localhost:5000/api/cars");
    const data = await res.json();
    setCars(data);
  };

  /* ================= SELL REQUESTS ================= */
  const [sellRequests, setSellRequests] = useState<any[]>([]);

  const fetchSellRequests = async () => {
    if (!token) return;
    const res = await fetch("http://localhost:5000/api/sell-cars", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setSellRequests(data);
  };

  useEffect(() => {
    fetchCars();
    fetchSellRequests();
  }, []);

  /* ================= ADD BUY CAR ================= */
  const handleAddCar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return alert("Admin not logged in");

    if (
      !formData.name ||
      !formData.brand ||
      !formData.price ||
      !formData.year ||
      !formData.km ||
      !imageFile
    ) {
      alert("Fill all fields");
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([k, v]) => data.append(k, v));
      data.append("image", imageFile);

      const res = await fetch("http://localhost:5000/api/cars", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: data,
      });

      if (!res.ok) throw new Error();

      toast({ title: "Buy car added successfully" });
      fetchCars();

      setFormData({
        name: "",
        brand: "",
        price: "",
        year: "",
        km: "",
        fuel: "Petrol",
        transmission: "Automatic",
      });
      setImageFile(null);
    } catch {
      alert("Failed to add car");
    } finally {
      setLoading(false);
    }
  };

  /* ================= STATUS UPDATE ================= */
  const updateStatus = async (id: string, status: string) => {
    await fetch(`http://localhost:5000/api/sell-cars/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    fetchSellRequests();
  };

  /* ================= DELETE ================= */
  const deleteCar = async (id: string) => {
    await fetch(`http://localhost:5000/api/cars/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchCars();
  };

  const deleteSellRequest = async (id: string) => {
    await fetch(`http://localhost:5000/api/sell-cars/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchSellRequests();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto pt-28 px-4">

        {/* HEADER */}
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          <div className="glass p-6 rounded-xl flex justify-between">
            <div>
              <p className="text-muted-foreground">Total Buy Cars</p>
              <h2 className="text-3xl font-bold">{cars.length}</h2>
            </div>
            <CarFront className="w-10 h-10 text-primary" />
          </div>

          <div className="glass p-6 rounded-xl flex justify-between">
            <div>
              <p className="text-muted-foreground">Sell Requests</p>
              <h2 className="text-3xl font-bold">{sellRequests.length}</h2>
            </div>
            <HandCoins className="w-10 h-10 text-primary" />
          </div>
        </div>

        {/* BUY CARS */}
        <section className="mb-20">
          <h2 className="text-2xl font-semibold mb-4">Buy Cars</h2>

          <form
            onSubmit={handleAddCar}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10 p-6 glass rounded-xl"
          >
            <Input placeholder="Car Name" value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })} />

            <Input placeholder="Brand" value={formData.brand}
              onChange={(e) => setFormData({ ...formData, brand: e.target.value })} />

            <Input type="number" placeholder="Price" value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })} />

            <Input type="number" placeholder="Year" value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })} />

            <Input type="number" placeholder="KM" value={formData.km}
              onChange={(e) => setFormData({ ...formData, km: e.target.value })} />

            <Input type="file" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />

            <Button type="submit" disabled={loading} className="md:col-span-4">
              {loading ? <Loader2 className="animate-spin mr-2" /> : <Plus className="mr-2" />}
              Add Buy Car
            </Button>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cars.map((c) => (
              <div key={c._id} className="glass p-4 rounded-xl space-y-2">
                <img
                  src={`http://localhost:5000/uploads/${c.image}`}
                  className="h-40 w-full object-cover rounded-lg"
                />
                <h3 className="font-semibold">{c.name} ({c.year})</h3>
                <p className="text-sm text-muted-foreground">
                  {c.brand} • {c.km} km
                </p>
                <p className="font-bold text-primary">₹{c.price}</p>
                <Button size="sm" variant="destructive" onClick={() => deleteCar(c._id)}>
                  <Trash2 size={16} /> Delete
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* SELL REQUESTS */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Sell Car Requests</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sellRequests.map((r) => (
              <div key={r._id} className="glass p-6 rounded-xl space-y-4">

                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">
                      {r.brand} {r.model} ({r.year})
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {r.fuel} • {r.km} km
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium
                      ${r.status === "pending" && "bg-yellow-500/20 text-yellow-600"}
                      ${r.status === "approved" && "bg-green-500/20 text-green-600"}
                      ${r.status === "rejected" && "bg-red-500/20 text-red-600"}
                    `}
                  >
                    {r.status.toUpperCase()}
                  </span>
                </div>

                <p className="text-xl font-bold text-primary">
                  ₹{r.expectedPrice}
                </p>

                <div className="text-sm">
                  <p><b>Name:</b> {r.name}</p>
                  <p><b>Phone:</b> {r.phone}</p>
                  {r.city && <p><b>City:</b> {r.city}</p>}
                </div>

                <div className="flex gap-2">
                  <Button size="sm" onClick={() => updateStatus(r._id, "approved")}>
                    Approve
                  </Button>

                  <Button size="sm" variant="outline"
                    onClick={() => updateStatus(r._id, "rejected")}>
                    Reject
                  </Button>

                  <Button size="sm" variant="destructive"
                    onClick={() => deleteSellRequest(r._id)}>
                    <Trash2 size={16} />
                  </Button>
                </div>

              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default AdminDashboard;
