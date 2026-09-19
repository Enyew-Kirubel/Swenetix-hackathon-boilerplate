
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './app/Home';
import ReportDetail from './app/ReportDetail';
import CreateReport from './app/CreateReport';
import EditReport from './app/EditReport';
import NotFound from './app/NotFound';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reports/new" element={<CreateReport />} />
        {/* <Route path="/reports/:id" element={<ReportDetail />} /> */}
        <Route path="/reports/:id/edit" element={<EditReport />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}