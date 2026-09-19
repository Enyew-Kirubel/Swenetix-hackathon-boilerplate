import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import ProtectedRoute from './components/common/ProtectedRoute';
import Home from './app/Home';
import ReportDetail from './app/ReportDetail';
import CreateReport from './app/CreateReport';
import EditReport from './app/EditReport';
import NotFound from './app/NotFound';
import Login from './app/Login';

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/reports/new"
          element={
            <ProtectedRoute>
              <CreateReport />
            </ProtectedRoute>
          }
        />
        <Route path="/reports/:id" element={<ReportDetail />} />
        <Route
          path="/reports/:id/edit"
          element={
            <ProtectedRoute>
              <EditReport />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}