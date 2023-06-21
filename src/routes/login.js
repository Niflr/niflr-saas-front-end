import { Navigate, useRoutes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';

// ----------------------------------------------------------------------

export default function Login() {
  const routes = useRoutes([
    {
      path: '/',
      element: <LoginPage />,
       children: [
        { element: <Navigate to="/login" />, index: true }
      ]
    }
  ]);

  return routes;
}
