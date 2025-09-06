import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { ProductDetail } from './pages/ProductDetail';
import { AddProduct } from './pages/AddProduct';
import { EditProduct } from './pages/EditProduct';
import { MyListings } from './pages/MyListings';
import { Cart } from './pages/Cart';
import { Dashboard } from './pages/Dashboard';
import { Purchases } from './pages/Purchases';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" />;
};

const AppRoutes: React.FC = () => {
  const { user } = useAuth();

  return (
    <Layout>
      <Routes>
        <Route 
          path="/login" 
          element={user ? <Navigate to="/" /> : <Login />} 
        />
        <Route path="/" element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } />
        <Route path="/product/:id" element={
          <PrivateRoute>
            <ProductDetail />
          </PrivateRoute>
        } />
        <Route path="/add-product" element={
          <PrivateRoute>
            <AddProduct />
          </PrivateRoute>
        } />
        <Route path="/edit-product/:id" element={
          <PrivateRoute>
            <EditProduct />
          </PrivateRoute>
        } />
        <Route path="/my-listings" element={
          <PrivateRoute>
            <MyListings />
          </PrivateRoute>
        } />
        <Route path="/cart" element={
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        } />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        <Route path="/purchases" element={
          <PrivateRoute>
            <Purchases />
          </PrivateRoute>
        } />
      </Routes>
    </Layout>
  );
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppRoutes />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;