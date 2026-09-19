import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import ProtectedRoute from "./components/common/ProtectedRoute";

import LandingPage from "./app/LandingPage";
import Home from "./app/Home";
import ReportDetail from "./app/ReportDetail";
import CreateReport from "./app/CreateReport";
import EditReport from "./app/EditReport";
import NotFound from "./app/NotFound";
import Login from "./app/Login";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Public landing page */}
        <Route path="/" element={<LandingPage />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />

        {/* Protected report feed */}
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* Create report */}
        <Route
          path="/reports/new"
          element={
            <ProtectedRoute>
              <CreateReport />
            </ProtectedRoute>
          }
        />

        {/* Report details */}
        <Route path="/reports/:id" element={<ReportDetail />} />

        {/* Edit report */}
        <Route
          path="/reports/:id/edit"
          element={
            <ProtectedRoute>
              <EditReport />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
