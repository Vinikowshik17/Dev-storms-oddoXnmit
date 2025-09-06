import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useAuth } from '../context/AuthContext';

export const MyListings: React.FC = () => {
  const { products, deleteProduct, getProductsByUser } = useProducts();
  const { user } = useAuth();

  const myProducts = user ? getProductsByUser(user.id) : [];

  const handleDelete = (productId: string) => {
    if (confirm('Are you sure you want to delete this listing?')) {
      deleteProduct(productId);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">My Listings</h1>
        <Link
          to="/add-product"
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md flex items-center space-x-2 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Product</span>
        </Link>
      </div>

      {myProducts.length > 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="divide-y divide-gray-200">
            {myProducts.map(product => (
              <div key={product.id} className="p-6">
                <div className="flex items-center space-x-6">
                  {/* Product Image Placeholder */}
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">📦</span>
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          <Link 
                            to={`/product/${product.id}`}
                            className="hover:text-emerald-600 transition-colors"
                          >
                            {product.title}
                          </Link>
                        </h3>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="bg-gray-100 px-2 py-1 rounded">{product.category}</span>
                          <span>${product.price}</span>
                          <span>Listed {new Date(product.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-2 ml-4">
                        <Link
                          to={`/edit-product/${product.id}`}
                          className="p-2 text-gray-400 hover:text-emerald-600 transition-colors"
                          title="Edit product"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                          title="Delete product"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-6">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
              <Plus className="h-12 w-12" />
            </div>
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">No listings yet</h3>
          <p className="text-gray-600 mb-6">Start selling by adding your first product</p>
          <Link
            to="/add-product"
            className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-md transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Add Your First Product</span>
          </Link>
        </div>
      )}
    </div>
  );
};