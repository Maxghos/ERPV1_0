import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { GlobalProvider } from './context/GlobalContext';
import { AuthProvider } from './context/AuthContext';
import { InventoryProvider } from './context/InventoryContext';
import { BillingProvider } from './context/BillingContext';
import { SalesProvider } from './context/SalesContext';
import { NotificationProvider } from './context/NotificationContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalProvider>
        <AuthProvider>
          <NotificationProvider>
            <BillingProvider>
              <InventoryProvider>
                <SalesProvider>
                  <App />
                </SalesProvider>
              </InventoryProvider>
            </BillingProvider>
          </NotificationProvider>
        </AuthProvider>
      </GlobalProvider>
    </BrowserRouter>
  </React.StrictMode>
);
