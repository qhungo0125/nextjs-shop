'use client';

import React from 'react';
import Heading from '../Heading';
import Button from '../button/Button';
import Input from './Input';
import { AiOutlineGoogle } from 'react-icons/ai';
import Link from 'next/link';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

const LoginForm = () => {
  const [isLoading, setIsLoading] = React.useState(false);
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

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    console.log(data);
  };

  return (
    <>
      <Heading title='Login' />
      <Button
        outLine
        label='Continue with Google'
        icon={AiOutlineGoogle}
        onclick={() => {}}
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
