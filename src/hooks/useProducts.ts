import { useState, useEffect } from 'react';
import { Product } from '../types';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  const addProduct = (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setProducts(prev => {
      const updated = [...prev, newProduct];
      localStorage.setItem('products', JSON.stringify(updated));
      return updated;
    });

    return newProduct;
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => {
      const updated = prev.map(product =>
        product.id === id
          ? { ...product, ...updates, updatedAt: new Date().toISOString() }
          : product
      );
      localStorage.setItem('products', JSON.stringify(updated));
      return updated;
    });
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => {
      const updated = prev.filter(product => product.id !== id);
      localStorage.setItem('products', JSON.stringify(updated));
      return updated;
    });
  };

  const getProductsByUser = (userId: string) => {
    return products.filter(product => product.sellerId === userId);
  };

  return {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductsByUser
  };
};