import React from "react";
import NavigationBar from "../components/NavigationBar";
import AppRoutes from "../routes/AppRoutes";

const MainLayout: React.FC = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <NavigationBar />

      <main className="flex-grow-1">
        <AppRoutes />
      </main>
    </div>
  );
};

export default MainLayout;
