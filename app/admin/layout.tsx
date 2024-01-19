import AdminNav from '@/components/admin/nav/AdminNav';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Admin page',
  description: 'Admin description',
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <AdminNav />
      {children}
    </div>
  );
};

export default AdminLayout;
