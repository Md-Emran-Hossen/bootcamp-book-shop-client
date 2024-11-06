import { Outlet } from "react-router-dom";
import DashboardSidebarContent from "../components/DashboardSidebarContent";
import { Helmet } from "react-helmet-async";


const DashboardLayout = () => {
  return (
    <>
      <Helmet>
        <title> Book Shop | Dashboard </title>
      </Helmet>
      <div>
        <div className="block lg:flex">
          <div className="min-w-64 shadow-md bg-slate-100">
            <DashboardSidebarContent />
          </div>
          <div className="w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};
export default DashboardLayout;