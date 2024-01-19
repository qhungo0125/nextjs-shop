'use client';
import React from 'react';
import { Product } from '@prisma/client';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { priceFormatter } from '@/utils/text';
import Heading from '@/components/Heading';
import Status from '../Status';
import { MdDone } from 'react-icons/md';

interface Props {
  products: Product[];
}

const Products: React.FC<Props> = (props) => {
  const { products } = props;

  let rows: any = [];

  if (products) {
    rows = products.map((product) => ({
      id: product.id,
      name: product.name,
      price: priceFormatter(product.price),
      category: product.category,
      brand: product.brand,
      inStock: product.inStock,
      images: product.images,
    }));
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 220 },
    { field: 'name', headerName: 'Name', width: 220 },
    {
      field: 'price',
      headerName: 'Price',
      width: 100,
      renderCell: (params) => {
        return (
          <div className='font-bold text-slate-800'>{params.row.price}</div>
        );
      },
    },
    { field: 'category', headerName: 'Category', width: 100 },
    { field: 'brand', headerName: 'Brand', width: 100 },
    {
      field: 'inStock',
      headerName: 'In Stock',
      width: 120,
      renderCell: (params) => {
        return (
          <div className='font-bold text-slate-800'>
            {params.row.inStock ? (
              <Status
                text='In Stock'
                icon={MdDone}
                bg='bg-teal-200'
                color='text-teal-800'
              />
            ) : (
              <Status
                text='Out of Stock'
                icon={MdDone}
                bg='bg-red-200'
                color='text-red-800'
              />
            )}
          </div>
        );
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => {
        return <div className='font-bold text-slate-800'>action</div>;
      },
    },
  ];

  return (
    <div className='max-w-[1150px] m-auto text-xl'>
      <div className='mb-4 mt-8 '>
        <Heading title='Manage Products' center />
      </div>
      <div className='h-[600px] w-full'>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </div>
    </div>
  );
};

export default Products;
