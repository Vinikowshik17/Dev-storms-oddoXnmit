import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Cart: React.FC = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, checkout } = useCart();

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
  };

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      checkout();
      alert('Purchase successful! Thank you for your order.');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
        
        <div className="text-center py-12">
          <div className="text-gray-400 mb-6">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
              <ShoppingCart className="h-12 w-12" />
            </div>
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">Your cart is empty</h3>
          <p className="text-gray-600 mb-6">Start shopping to add items to your cart</p>
          <Link
            to="/"
            className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-md transition-colors"
          >
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map(item => (
            <div key={item.product.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-4">
                {/* Product Image Placeholder */}
                <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">📦</span>
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    <Link 
                      to={`/product/${item.product.id}`}
                      className="hover:text-emerald-600 transition-colors"
                    >
                      {item.product.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">{item.product.description}</p>
                  <div className="flex items-center space-x-4">
                    <span className="text-lg font-bold text-emerald-600">${item.product.price}</span>
                    <span className="text-sm text-gray-500">by {item.product.sellerUsername}</span>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                    className="p-1 text-gray-400 hover:text-emerald-600 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="text-lg font-medium w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                    className="p-1 text-gray-400 hover:text-emerald-600 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  title="Remove from cart"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
            
            <div className="space-y-3 mb-6">
              {cartItems.map(item => (
                <div key={item.product.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {item.product.title} x {item.quantity}
                  </span>
                  <span className="text-gray-900">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span className="text-emerald-600">${getCartTotal().toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-md font-medium transition-colors"
            >
              Checkout
            </button>

            <Link
              to="/"
              className="block text-center text-emerald-600 hover:text-emerald-700 mt-4 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};