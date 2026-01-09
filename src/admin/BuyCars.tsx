import { useEffect, useState } from "react";
import { Trash2, Plus, Loader2, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const BuyCars = () => {
  const { toast } = useToast();
  const token = localStorage.getItem("token");

  /* ================= STATE ================= */
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // 🔍 FILTER STATE
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [yearFilter, setYearFilter] = useState("");

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

  /* ================= FETCH BUY CARS ================= */
  const fetchCars = async () => {
    const res = await fetch("http://localhost:5000/api/cars");
    const data = await res.json();
    setCars(data);
  };

  useEffect(() => {
    fetchCars();
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
      alert("Please fill all fields");
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

  /* ================= DELETE BUY CAR ================= */
  const deleteCar = async (id: string) => {
    if (!token) return;
    await fetch(`http://localhost:5000/api/cars/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchCars();
  };

  /* ================= FILTER LOGIC ================= */
  const filteredCars = cars.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.brand.toLowerCase().includes(search.toLowerCase());

    const matchesMin =
      !minPrice || Number(c.price) >= Number(minPrice);

    const matchesMax =
      !maxPrice || Number(c.price) <= Number(maxPrice);

    const matchesYear =
      !yearFilter || c.year === yearFilter;

    return matchesSearch && matchesMin && matchesMax && matchesYear;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto pt-28 px-4 max-w-7xl">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Buy Cars Management</h1>
          <p className="text-muted-foreground">
            Add, search and manage cars
          </p>
        </div>

        {/* ================= FILTER BAR ================= */}
        <div className="glass rounded-2xl p-4 mb-10 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or brand"
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <Input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />

          <Input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />

          <Input
            type="number"
            placeholder="Year"
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
          />
        </div>

        {/* ================= ADD FORM ================= */}
        <div className="glass rounded-2xl p-6 mb-14">
          <h2 className="text-lg font-semibold mb-4">Add New Car</h2>

          <form
            onSubmit={handleAddCar}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <Input placeholder="Car Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />

            <Input placeholder="Brand"
              value={formData.brand}
              onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
            />

            <Input type="number" placeholder="Price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />

            <Input type="number" placeholder="Year"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
            />

            <Input type="number" placeholder="KM Driven"
              value={formData.km}
              onChange={(e) => setFormData({ ...formData, km: e.target.value })}
            />

            <Input type="file"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            />

            <Button type="submit" disabled={loading} className="md:col-span-3">
              {loading ? <Loader2 className="animate-spin mr-2" /> : <Plus className="mr-2" />}
              Add Buy Car
            </Button>
          </form>
        </div>

        {/* ================= BUY CARS LIST ================= */}
        <h2 className="text-xl font-semibold mb-4">
          Available Cars ({filteredCars.length})
        </h2>

        {filteredCars.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            No cars match the filters
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCars.map((c) => (
              <div key={c._id} className="glass rounded-2xl overflow-hidden">
                <img
                  src={`http://localhost:5000/uploads/${c.image}`}
                  className="h-44 w-full object-cover"
                />

                <div className="p-4 space-y-2">
                  <h3 className="font-semibold text-lg">
                    {c.name} ({c.year})
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    {c.brand} • {c.km} km
                  </p>

                  <div className="flex justify-between items-center">
                    <p className="font-bold text-primary">₹{c.price}</p>
                    <Button size="sm" variant="destructive"
                      onClick={() => deleteCar(c._id)}>
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default BuyCars;
