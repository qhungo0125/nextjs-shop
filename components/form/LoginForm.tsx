'use client';

import React from 'react';
import Heading from '../Heading';
import Button from '../button/Button';
import Input from './Input';
import { AiOutlineGoogle } from 'react-icons/ai';
import Link from 'next/link';
import { FieldValues, SubmitHandler, set, useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { SafeUser } from '@/types';

interface Props {
  currentUser: SafeUser | null;
}

const LoginForm: React.FC<Props> = (props) => {
  const { currentUser } = props;
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      name: '',
      password: '',
    },
  });

  React.useEffect(() => {
    if (currentUser) {
      router.push('/cart');
      router.refresh();
    }
  }, [currentUser, router]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    console.log(data);
    signIn('credentials', {
      ...data,
      redirect: false,
    })
      .then((cb) => {
        if (cb && cb.ok) {
          router.push('/cart');
          router.refresh();
          toast.success('Logged In');
        } else {
          console.log(cb?.error);
          toast.error(cb?.error || 'Something went wrong');
        }
      })
      .finally(() => setIsLoading(false));
  };

  if (currentUser) {
    return (
      <p className='text-center'>You are already logged in. Redirecting...</p>
    );
  }

  return (
    <>
      <Heading title='Login' />
      <Button
        outLine
        label='Continue with Google'
        icon={AiOutlineGoogle}
        onclick={() => {
          signIn('google');
        }}
      />
      <hr className='bg-slate-300 w-full h-px' />
      <Input
        id='email'
        label='Email'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='password'
        label='Password'
        disabled={isLoading}
        register={register}
        errors={errors}
        type='password'
        required
      />
      <Button
        label={isLoading ? 'Loading' : 'Sign In'}
        onclick={handleSubmit(onSubmit)}
      />
      <p className='text-sm'>
        Do not have an account? <Link href='/register'>Sign Up</Link>
      </p>
    </>
  );
};

export default LoginForm;
