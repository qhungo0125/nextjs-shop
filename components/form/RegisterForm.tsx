'use client';
import React from 'react';
import Heading from '../Heading';
import Input from './Input';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Button from '../button/Button';
import Link from 'next/link';
import { AiOutlineGoogle } from 'react-icons/ai';

const RegisterForm = () => {
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
      <Heading title='Register' />
      <Button
        outLine
        label='Sign up with Google'
        icon={AiOutlineGoogle}
        onclick={() => {}}
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
