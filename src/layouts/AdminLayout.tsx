import { Outlet } from "react-router-dom";
import AdminSidebar from "@/components/AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <main className="pl-64 transition-all duration-300">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
