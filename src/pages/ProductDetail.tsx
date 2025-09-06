import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, User, Calendar } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart } = useCart();
  const { user } = useAuth();

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
        <button
          onClick={() => navigate('/')}
          className="text-emerald-600 hover:text-emerald-700"
        >
          Back to browse
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (product.sellerId !== user?.id) {
      addToCart(product);
    }
  };

  const isOwnProduct = product.sellerId === user?.id;

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 text-gray-600 hover:text-emerald-600 transition-colors"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Back</span>
      </button>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
          {/* Product Image */}
          <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
            <div className="text-gray-400 text-center">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-300 rounded-lg flex items-center justify-center">
                <span className="text-4xl">📦</span>
              </div>
              <p className="text-lg">Product Image</p>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
                <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
                  {product.category}
                </span>
              </div>
              <p className="text-3xl font-bold text-emerald-600 mb-4">${product.price}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            <div className="border-t border-gray-200 pt-4 space-y-3">
              <div className="flex items-center space-x-2 text-gray-600">
                <User className="h-5 w-5" />
                <span>Sold by {product.sellerUsername}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Calendar className="h-5 w-5" />
                <span>Listed on {new Date(product.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            {!isOwnProduct && (
              <div className="pt-4">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-6 rounded-md font-medium flex items-center justify-center space-x-2 transition-colors duration-200"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Add to Cart</span>
                </button>
              </div>
            )}

            {isOwnProduct && (
              <div className="pt-4">
                <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-md">
                  This is your listing
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};