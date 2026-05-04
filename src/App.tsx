import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import LoadingSpinner from './components/LoadingSpinner';
import Dashboard from './pages/Dashboard';
import Cobranza from './pages/Cobranza';
import Inventario from './pages/Inventario';
import Ventas from './pages/Ventas';
import Clientes from './pages/Clientes';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';
import { useBilling } from './context/BillingContext';
import { useInventory } from './context/InventoryContext';
import { useSales } from './context/SalesContext';

const App: React.FC = () => {
  const { isLoading: authLoading } = useAuth();
  const { isLoading: inventoryLoading } = useInventory();
  const { isLoading: salesLoading } = useSales();
  const { isLoading: billingLoading } = useBilling();

  const isAppLoading = authLoading || inventoryLoading || salesLoading || billingLoading;

  if (isAppLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(96,165,250,0.18),_transparent_28%),linear-gradient(180deg,_#f8fafc_0%,_#eef6ff_100%)] px-4">
        <LoadingSpinner message="Cargando Cercotec ERP..." />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="cobranza" element={<Cobranza />} />
        <Route
          path="inventario"
          element={
            <ProtectedRoute requiredRole="admin">
              <Inventario />
            </ProtectedRoute>
          }
        />
        <Route path="ventas" element={<Ventas />} />
        <Route path="clientes" element={<Clientes />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
