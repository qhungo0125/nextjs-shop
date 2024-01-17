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

  React.useEffect(() => {
    const cart = localStorage.getItem('cart');
    if (cart) {
      setProducts(JSON.parse(cart));
    }
  }, []);

  const addToCart = React.useCallback((product: CartProductType) => {
    setProducts((prev) => {
      let updated;
      if (!prev) {
        updated = [product];
      } else {
        updated = [...prev, product];
      }
      localStorage.setItem('cart', JSON.stringify(updated));
      return updated;
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
