import { CartProductType } from '@/types/CartProduct';
import React from 'react';
type CartContextType = {
  cartTotalQty: number;
  products: CartProductType[] | null;
  addToCart: (product: CartProductType) => void;
};

export const CartContext = React.createContext<CartContextType | null>(null);

interface Props {
  [propName: string]: any;
}

export const CartContextProvider = (props: Props) => {
  const [cartTotalQty, setCartTotalQty] = React.useState(0);
  const [products, setProducts] = React.useState<CartProductType[] | null>(
    null,
  );

  const addToCart = React.useCallback((product: CartProductType) => {
    setProducts((prev) => {
      if (!prev) {
        return [product];
      }
      const productIndex = prev.findIndex((p) => p.id === product.id);
      if (productIndex === -1) {
        return [...prev, product];
      }
      const newProducts = [...prev];
      newProducts[productIndex] = product;
      return newProducts;
    });
  }, []);
  const value = {
    cartTotalQty,
    products,
    addToCart,
  };

  return <CartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
  const context = React.useContext(CartContext);
  if (!context || context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
