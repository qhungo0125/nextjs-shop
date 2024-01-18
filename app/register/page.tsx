import Container from '@/components/container/Container';
import FormWrap from '@/components/form/FormWrap';
import RegisterForm from '@/components/form/RegisterForm';
import React from 'react';

const RegisterPage = () => {
  return (
    <Container>
      <FormWrap>
        <RegisterForm />
      </FormWrap>
    </Container>
  );
};

export default RegisterPage;
