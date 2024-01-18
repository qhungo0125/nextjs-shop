import { CartProductType } from '@/types/CartProduct';
import React from 'react';
import toast from 'react-hot-toast';
type CartContextType = {
  cartTotalQty: number;
  cartTotal: number;
  products: CartProductType[] | null;
  paymentIntent: string | null;
  addToCart: (product: CartProductType) => void;
  removeFromCart: (product: CartProductType) => void;
  increaseQty: (product: CartProductType) => void;
  decreaseQty: (product: CartProductType) => void;
  clearCart: () => void;
  onSavePaymentIntent: (value: string | null) => void;
};

export const CartContext = React.createContext<CartContextType | null>(null);

interface Props {
  [propName: string]: any;
}

export const CartContextProvider = (props: Props) => {
  const [cartTotalQty, setCartTotalQty] = React.useState(0);
  const [cartTotal, setCartTotal] = React.useState(0);
  const [products, setProducts] = React.useState<CartProductType[] | null>(
    null,
  );
  const [paymentIntent, setPaymentIntent] = React.useState<string | null>(null);

  React.useEffect(() => {
    console.log('products effect');
    const cart = localStorage.getItem('cart');
    if (cart) {
      setProducts(JSON.parse(cart));
    }

    const savedPaymentIntent: any = localStorage.getItem('paymentIntent');
    const paymentIntent: string | null = JSON.parse(savedPaymentIntent);
    setPaymentIntent(paymentIntent);
  }, []);

  React.useEffect(() => {
    if (products) {
      const { total, qty } = products.reduce(
        (acc, curr) => {
          const total = curr.price * curr.quantity;
          const qty = curr.quantity;
          acc.total += total;
          acc.qty += qty;
          return acc;
        },
        {
          total: 0,
          qty: 0,
        },
      );
      setCartTotalQty(qty);
      setCartTotal(total);
    }
  }, [products]);

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

  const onSavePaymentIntent = React.useCallback((value: string | null) => {
    localStorage.setItem('paymentIntent', JSON.stringify(value));
  }, []);

  const value = {
    cartTotalQty,
    cartTotal,
    products,
    paymentIntent,

    addToCart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart,
    onSavePaymentIntent,
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
