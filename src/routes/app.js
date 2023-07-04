import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import { ProtectedRoute } from '../components/protectedRouter';
import DashboardLayout from '../layouts/dashboard/DashboardLayout';
import UserListLayout from '../layouts/dashboard/UserListLayout';
import TicketListLayout from '../layouts/dashboard/TicketListLayout';

// ----------------------------------------------------------------------

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/dashboard/tickets"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/users"
        element={
          <ProtectedRoute>
            <UserListLayout />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/ticket"
        element={
          <ProtectedRoute>
            <TicketListLayout />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
