import { getUser } from '@/actions/getUser';
import Container from '@/components/container/Container';
import FormWrap from '@/components/form/FormWrap';
import RegisterForm from '@/components/form/RegisterForm';
import React from 'react';

const RegisterPage = async () => {
  const currentUser = await getUser();

  return (
    <Container>
      <FormWrap>
        <RegisterForm currentUser={currentUser} />
      </FormWrap>
    </Container>
  );
};

export default RegisterPage;
