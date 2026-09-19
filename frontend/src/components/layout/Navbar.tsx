
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav>
      <Link to="/">Lost & Found</Link>
      <Link to="/reports/new">Create Report</Link>
    </nav>
  );
}