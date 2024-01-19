'use client';
import { useCart } from '@/hooks/useCart';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';
import { StripeElementsOptions, loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import Button from '../button/Button';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHA as string,
);

const CheckoutDetail = () => {
  const { products, paymentIntent, onSavePaymentIntent } = useCart();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [clientSecret, setClientSecret] = React.useState('');
  const [paymentSuccess, setPaymentSuccess] = React.useState(false);

  React.useEffect(() => {
    if (products) {
      setLoading(true);
      setError(false);

      axios({
        method: 'POST',
        url: '/api/create-payment-intent',
        headers: { 'Content-Type': 'application/json' },
        data: {
          items: products,
          payment_intent_id: paymentIntent,
        },
      })
        .then((rs) => {
          if (rs.status === 401) {
            return router.push('/login');
          }
          console.log(rs);
          return rs.data;
        })
        .then((data) => {
          onSavePaymentIntent(data.paymentIntent.id);
          setClientSecret(data.paymentIntent.client_secret);
        })
        .catch((err) => {
          setError(true);
          toast.error(err.response.data.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [products, router, onSavePaymentIntent, paymentIntent]);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: 'stripe',
      labels: 'floating',
    },
  };

  const onSuccessPayment = React.useCallback((value: boolean) => {
    setPaymentSuccess(value);
  }, []);

  return (
    <div className='w-full'>
      {clientSecret && products && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm
            onSuccessPayment={onSuccessPayment}
            clientSecret={clientSecret}
          />
        </Elements>
      )}
      {loading && <div className='text-center'>Loading checkout...</div>}
      {error && <div className='text-center text-red-500'>Error occurs</div>}
      {paymentSuccess && (
        <div className='flex items-center flex-col gap-4'>
          <div className='text-teal-500 text-center'>Payment success</div>
          <div className='max-w-[220px] w-full'>
            <Button
              label='View order'
              onclick={() => {
                router.push('/orders');
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutDetail;
