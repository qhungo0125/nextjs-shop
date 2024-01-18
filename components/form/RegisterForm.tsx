'use client';
import React from 'react';
import Heading from '../Heading';
import Input from './Input';
import { FieldValues, SubmitHandler, set, useForm } from 'react-hook-form';
import Button from '../button/Button';
import Link from 'next/link';
import { AiOutlineGoogle } from 'react-icons/ai';
import axios from 'axios';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { SafeUser } from '@/types';

interface Props {
  currentUser: SafeUser | null;
}

const RegisterForm: React.FC<Props> = (props) => {
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
    axios
      .post('/api/register', data)
      .then(() => {
        toast.success('Account created successfully');
        signIn('credentials', {
          email: data.email,
          password: data.password,
          redirect: false,
        }).then((cb) => {
          if (cb && cb.ok) {
            router.push('/cart');
            router.refresh();
            toast.success('Logged In');
          } else {
            console.log(cb?.error);
            toast.error(cb?.error || 'Something went wrong');
          }
        });
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Something went wrong');
      })
      .finally(() => setIsLoading(false));
    console.log(data);
  };

  if (currentUser) {
    return (
      <p className='text-center'>You are already logged in. Redirecting...</p>
    );
  }

  return (
    <>
      <Heading title='Register' />
      <Button
        outLine
        label='Sign up with Google'
        icon={AiOutlineGoogle}
        onclick={() => {
          signIn('google');
        }}
      />
      <hr className='bg-slate-300 w-full h-px' />
      <Input
        id='name'
        label='Name'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
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
        label={isLoading ? 'Loading' : 'Sign Up'}
        onclick={handleSubmit(onSubmit)}
      />
      <p className='text-sm'>
        Already have an account? <Link href='/login'>Sign In</Link>
      </p>
    </>
  );
};

export default RegisterForm;
