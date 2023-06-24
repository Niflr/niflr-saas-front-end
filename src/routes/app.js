import { Navigate, useRoutes, Routes, Route } from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/dashboard/DashboardLayout';
// import SimpleLayout from '../layouts/simple';
//
// import BlogPage from '../pages/BlogPage';
// import UserPage from '../pages/UserPage';
import LoginPage from '../pages/LoginPage';
// import Page404 from '../pages/Page404';
// import ProductsPage from '../pages/ProductsPage';
// import DashboardAppPage from '../pages/DashboardAppPage';
import { ProtectedRoute } from '../components/protectedRouter';

import TicketListLayout from '../layouts/dashboard/TicketListLayout';
import UserListLayout from '../layouts/dashboard/UserListLayout';
// ----------------------------------------------------------------------

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
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
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
  // const routes = useRoutes([
  //   {
  //     path: '/dashboard',
  //     element: <DashboardLayout />,
  //     children: [
  //       { element: <Navigate to="/dashboard/app" />, index: true },
  //       { path: 'app', element: <DashboardAppPage /> },
  //       { path: 'user', element: <UserPage /> },
  //       { path: 'products', element: <ProductsPage /> },
  //       { path: 'blog', element: <BlogPage /> },
  //     ],
  //   },
  //   {
  //     path: 'login',
  //     element: <LoginPage />,
  //   },
  //   {
  //     element: <SimpleLayout />,
  //     children: [
  //       { element: <Navigate to="/dashboard/app" />, index: true },
  //       { path: '404', element: <Page404 /> },
  //       { path: '*', element: <Navigate to="/404" /> },
  //     ],
  //   },
  //   {
  //     path: '*',
  //     element: <Navigate to="/404" replace />,
  //   },
  // ]);

  // return routes;
}
