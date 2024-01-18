import Container from '@/components/container/Container';
import FormWrap from '@/components/form/FormWrap';
import LoginForm from '@/components/form/LoginForm';
import React from 'react';

const LoginPage = () => {
  return (
    <Container>
      <FormWrap>
        <LoginForm />
      </FormWrap>
    </Container>
  );
};

export default LoginPage;
