'use client';
import { useCart } from '@/hooks/useCart';
import { priceFormatter } from '@/utils/text';
import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import React from 'react';
import toast from 'react-hot-toast';
import Heading from '../Heading';
import Button from '../button/Button';

interface Props {
  clientSecret: string;
  onSuccessPayment: (value: boolean) => void;
}

const CheckoutForm: React.FC<Props> = (props) => {
  const { clientSecret, onSuccessPayment } = props;
  const { cartTotal, clearCart, onSavePaymentIntent } = useCart();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = React.useState(false);
  const formatedTotal = priceFormatter(cartTotal);
  React.useEffect(() => {
    if (!stripe || !clientSecret) {
      return;
    }
    onSuccessPayment(false);
  }, [stripe, clientSecret, onSuccessPayment]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setLoading(true);

    stripe
      .confirmPayment({
        elements,
        redirect: 'if_required',
      })
      .then((rs) => {
        if (!rs.error) {
          toast.success('Checkout success');
          clearCart();
          onSuccessPayment(true);
          onSavePaymentIntent(null);
          return;
        }
        setLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} id='payment-form'>
      <div className='mb-6'>
        <Heading title='Enter detail for checking out' />
      </div>
      <h2 className='font-semibold mt-4 mb-2'>Address information</h2>
      <AddressElement
        options={{
          mode: 'shipping',
          allowedCountries: ['VN', 'US'],
        }}
      />
      <h2 className='font-semibold mt-4 mb-2'>Payment information</h2>
      <PaymentElement id='payment-element' options={{ layout: 'tabs' }} />
      <div className='py-4 text-center text-slate-700 text-2xl font-bold'>
        Total: {formatedTotal}
      </div>
      <Button
        label={loading ? 'Loading...' : 'Pay now'}
        disabled={loading || !stripe || !elements}
        onclick={() => {}}
      />
    </form>
  );
};

export default CheckoutForm;
