import { getUser } from '@/actions/getUser';
import Container from '@/components/container/Container';
import FormWrap from '@/components/form/FormWrap';
import LoginForm from '@/components/form/LoginForm';
import React from 'react';

const LoginPage = async () => {
  const currentUser = await getUser();
  return (
    <Container>
      <FormWrap>
        <LoginForm currentUser={currentUser} />
      </FormWrap>
    </Container>
  );
};

export default LoginPage;
