import { CartProductType } from '@/types/CartProduct';
import React from 'react';
import toast from 'react-hot-toast';
type CartContextType = {
  cartTotalQty: number;
  products: CartProductType[] | null;
  addToCart: (product: CartProductType) => void;
  removeFromCart: (product: CartProductType) => void;
  increaseQty: (product: CartProductType) => void;
  decreaseQty: (product: CartProductType) => void;
  clearCart: () => void;
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
    console.log('products effect');
    const cart = localStorage.getItem('cart');
    if (cart) {
      setProducts(JSON.parse(cart));
    }
    return () => {
      console.log('products cleanup');
    };
  }, []);

  const addToCart = React.useCallback((product: CartProductType) => {
    setProducts((prev) => {
      let updated;
      if (!prev) {
        updated = [product];
      } else {
        updated = [...prev, product];
      }
      toast.success('Added to cart');
      localStorage.setItem('cart', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const clearCart = React.useCallback(() => {
    setCartTotalQty(0);
    setProducts(null);
    localStorage.setItem('cart', JSON.stringify(null));
  }, []);

  const removeFromCart = React.useCallback((product: CartProductType) => {
    setProducts((prev) => {
      let updated = prev;
      if (prev) {
        updated = prev.filter((p) => p.id !== product.id);
      }
      toast.success('Removed from cart');
      localStorage.setItem('cart', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const increaseQty = React.useCallback((product: CartProductType) => {
    setProducts((prev) => {
      let updated = prev;
      if (prev) {
        updated = prev.map((p) => {
          if (p.id === product.id && p.quantity + 1 <= 5) {
            toast.success('Increased success');
            return {
              ...p,
              quantity: p.quantity + 1,
            };
          }
          return p;
        });
      }
      localStorage.setItem('cart', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const decreaseQty = React.useCallback((product: CartProductType) => {
    setProducts((prev) => {
      let updated = prev;
      if (prev) {
        updated = prev.map((p) => {
          if (p.id === product.id && p.quantity - 1 >= 1) {
            toast.success('Decreased success');
            return {
              ...p,
              quantity: p.quantity - 1,
            };
          }
          return p;
        });
      }
      localStorage.setItem('cart', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const value = {
    cartTotalQty,
    products,
    addToCart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart,
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
