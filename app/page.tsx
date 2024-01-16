import Container from '@/components/container/Container';
import Banner from '@/components/homebanner/Banner';
import React from 'react';

const Home = () => {
  return (
    <div className='p-8'>
      <Container>
        <div>
          <Banner />
        </div>
      </Container>
    </div>
  );
};

export default Home;
