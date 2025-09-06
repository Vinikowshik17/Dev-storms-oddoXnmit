import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ShoppingBag, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Purchases: React.FC = () => {
  const { purchases } = useCart();

  if (purchases.length === 0) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Purchase History</h1>
        
        <div className="text-center py-12">
          <div className="text-gray-400 mb-6">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
              <ShoppingBag className="h-12 w-12" />
            </div>
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">No purchases yet</h3>
          <p className="text-gray-600 mb-6">Start shopping to see your purchase history</p>
          <Link
            to="/"
            className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-md transition-colors"
          >
            <span>Start Shopping</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Purchase History</h1>

      <div className="space-y-6">
        {purchases.map(purchase => (
          <div key={purchase.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Purchase Header */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {new Date(purchase.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Package className="h-5 w-5 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      Order #{purchase.id}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-emerald-600">
                    ${purchase.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Purchase Items */}
            <div className="p-6">
              <div className="space-y-4">
                {purchase.products.map(item => (
                  <div key={item.product.id} className="flex items-center space-x-4">
                    {/* Product Image Placeholder */}
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-xl">📦</span>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-lg font-medium text-gray-900 mb-1">
                        <Link 
                          to={`/product/${item.product.id}`}
                          className="hover:text-emerald-600 transition-colors"
                        >
                          {item.product.title}
                        </Link>
                      </h4>
                      <p className="text-sm text-gray-600 mb-1">{item.product.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Sold by {item.product.sellerUsername}</span>
                        <span>Qty: {item.quantity}</span>
                      </div>
                    </div>

                    {/* Item Price */}
                    <div className="text-right">
                      <span className="text-lg font-semibold text-gray-900">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                      <div className="text-sm text-gray-500">
                        ${item.product.price} each
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};