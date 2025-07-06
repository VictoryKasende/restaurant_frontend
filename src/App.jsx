import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import DashboardRestaurateur from './pages/DashboardRestaurateur';
import MenuGestion from './pages/MenuGestion';
import CommandesGestion from './pages/CommandesGestion';
import AvisEtSentiment from './pages/AvisEtSentiment';
import TablesGestion from './pages/TablesGestion';
import LayoutRestaurateur from './components/LayoutRestaurateur';

function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();
  const location = useLocation();
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  return children;
}

function RoleRedirect() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role === 'restaurateur') return <Navigate to="/dashboard" replace />;
  return <Navigate to="/" replace />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <LayoutRestaurateur>
            <DashboardRestaurateur />
          </LayoutRestaurateur>
        }
      />
      <Route
        path="/dashboard/menu"
        element={
          <LayoutRestaurateur>
            <MenuGestion />
          </LayoutRestaurateur>
        }
      />
      <Route
        path="/dashboard/commandes"
        element={
          <LayoutRestaurateur>
            <CommandesGestion />
          </LayoutRestaurateur>
        }
      />
      <Route
        path="/dashboard/avis"
        element={
          <LayoutRestaurateur>
            <AvisEtSentiment />
          </LayoutRestaurateur>
        }
      />
      <Route
        path="/dashboard/tables"
        element={
          <LayoutRestaurateur>
            <TablesGestion />
          </LayoutRestaurateur>
        }
      />
      {/* fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
