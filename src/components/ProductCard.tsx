import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.sellerId !== user?.id) {
      addToCart(product);
    }
  };

  const isOwnProduct = product.sellerId === user?.id;

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 overflow-hidden group">
      <Link to={`/product/${product.id}`}>
        <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
          <div className="text-gray-400 text-center">
            <div className="w-16 h-16 mx-auto mb-2 bg-gray-300 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📦</span>
            </div>
            <p className="text-sm">Product Image</p>
          </div>
          <div className="absolute top-2 right-2 bg-emerald-100 text-emerald-700 px-2 py-1 rounded-md text-xs font-medium">
            {product.category}
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{product.title}</h3>
          <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-emerald-600">${product.price}</span>
            <span className="text-sm text-gray-500">by {product.sellerUsername}</span>
          </div>
        </div>
      </Link>
      
      {!isOwnProduct && (
        <div className="px-4 pb-4">
          <button
            onClick={handleAddToCart}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-md flex items-center justify-center space-x-2 transition-colors duration-200"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Add to Cart</span>
          </button>
        </div>
      )}
    </div>
  );
};