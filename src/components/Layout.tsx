import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Leaf, ShoppingCart, User, Package, LogOut, Home, Plus } from 'lucide-react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const isActive = (path: string) => location.pathname === path;

  if (!user) {
    return <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-emerald-600" />
              <span className="text-xl font-bold text-emerald-700">EcoFinds</span>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${
                  isActive('/') ? 'text-emerald-700 bg-emerald-50' : 'text-gray-600 hover:text-emerald-600'
                }`}
              >
                <Home className="h-4 w-4" />
                <span>Browse</span>
              </Link>
              <Link
                to="/add-product"
                className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${
                  isActive('/add-product') ? 'text-emerald-700 bg-emerald-50' : 'text-gray-600 hover:text-emerald-600'
                }`}
              >
                <Plus className="h-4 w-4" />
                <span>Sell</span>
              </Link>
              <Link
                to="/my-listings"
                className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${
                  isActive('/my-listings') ? 'text-emerald-700 bg-emerald-50' : 'text-gray-600 hover:text-emerald-600'
                }`}
              >
                <Package className="h-4 w-4" />
                <span>My Listings</span>
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Link
                to="/cart"
                className="relative p-2 text-gray-600 hover:text-emerald-600 transition-colors"
              >
                <ShoppingCart className="h-6 w-6" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
              
              <div className="relative group">
                <button className="flex items-center space-x-2 p-2 text-gray-600 hover:text-emerald-600 transition-colors">
                  <User className="h-6 w-6" />
                  <span className="hidden md:block">{user.username}</span>
                </button>
                
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-1">
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/purchases"
                      className="block px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                    >
                      Purchase History
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors flex items-center space-x-2"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <div className="md:hidden bg-white border-t border-gray-200">
        <div className="flex justify-around py-2">
          <Link
            to="/"
            className={`flex flex-col items-center p-2 ${
              isActive('/') ? 'text-emerald-600' : 'text-gray-500'
            }`}
          >
            <Home className="h-5 w-5" />
            <span className="text-xs mt-1">Browse</span>
          </Link>
          <Link
            to="/add-product"
            className={`flex flex-col items-center p-2 ${
              isActive('/add-product') ? 'text-emerald-600' : 'text-gray-500'
            }`}
          >
            <Plus className="h-5 w-5" />
            <span className="text-xs mt-1">Sell</span>
          </Link>
          <Link
            to="/my-listings"
            className={`flex flex-col items-center p-2 ${
              isActive('/my-listings') ? 'text-emerald-600' : 'text-gray-500'
            }`}
          >
            <Package className="h-5 w-5" />
            <span className="text-xs mt-1">Listings</span>
          </Link>
          <Link
            to="/dashboard"
            className={`flex flex-col items-center p-2 ${
              isActive('/dashboard') ? 'text-emerald-600' : 'text-gray-500'
            }`}
          >
            <User className="h-5 w-5" />
            <span className="text-xs mt-1">Profile</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};