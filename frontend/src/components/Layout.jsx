import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const Layout = ({ children, showSidebar = true }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-tr from-gray-950 via-gray-900 to-gray-950 text-white">
      
      {/* Top Navbar */}
      <Navbar />

      <div className="flex flex-1">
        {/* Left Sidebar (optional) */}
        {showSidebar && (
          <aside className="w-64 hidden md:block border-r border-gray-700 bg-gray-900">
            <Sidebar />
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Footer always shown */}
      <Footer />
    </div>
  );
};

export default Layout;
