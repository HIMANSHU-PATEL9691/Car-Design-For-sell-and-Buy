import Navbar from "@/components/Navbar";
import { NavLink, Outlet } from "react-router-dom";
import { LayoutDashboard, CarFront, HandCoins } from "lucide-react";

const AdminLayout = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `
    flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition
    ${
      isActive
        ? "bg-primary text-primary-foreground shadow"
        : "text-muted-foreground hover:bg-muted"
    }
  `;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="flex pt-24">
        {/* ================= SIDEBAR (STICKY) ================= */}
        <aside
          className="w-64 border-r bg-card p-6 sticky top-24 h-[calc(100vh-6rem)] overflow-hidden"
          aria-label="Admin sidebar"
        >
          <h2 className="text-lg font-bold mb-6">Admin Panel</h2>

          <nav className="space-y-2">
            <NavLink to="/admin" end className={linkClass}>
              <LayoutDashboard size={18} />
              Dashboard
            </NavLink>

            <NavLink to="/admin/buy-cars" className={linkClass}>
              <CarFront size={18} />
              Buy Cars
            </NavLink>

            <NavLink to="/admin/sell-requests" className={linkClass}>
              <HandCoins size={18} />
              Sell Requests
            </NavLink>
          </nav>
        </aside>

        {/* ================= MAIN CONTENT ================= */}
        <main className="flex-1 bg-muted/40 p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
