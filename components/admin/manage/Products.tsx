'use client';
import React from 'react';
import { Product } from '@prisma/client';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { priceFormatter } from '@/utils/text';
import Heading from '@/components/Heading';
import Status from '../Status';
import { MdCached, MdDelete, MdDone, MdRemoveRedEye } from 'react-icons/md';
import ActionBtn from '../ActionBtn';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { deleteObject, getStorage, ref } from 'firebase/storage';
import firebaseApp from '@/libs/firebase';

interface Props {
  products: Product[];
}

const Products: React.FC<Props> = (props) => {
  const { products } = props;
  const router = useRouter();
  const storage = getStorage(firebaseApp);

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
        return (
          <div className='flex justify-between gap-4 w-full'>
            <ActionBtn
              icon={MdCached}
              onClick={() => {
                onChangeStock(params.row.id, !params.row.inStock);
              }}
            />
            <ActionBtn
              icon={MdDelete}
              onClick={() => {
                onDeleteProduct(params.row.id, params.row.images);
              }}
            />
            <ActionBtn icon={MdRemoveRedEye} onClick={() => {}} />
          </div>
        );
      },
    },
  ];

  const onChangeStock = React.useCallback(
    (id: string, inStock: boolean) => {
      // toast.loading('Updating product instock...');
      axios
        .put('/api/product', {
          id,
          inStock,
        })
        .then((rs) => {
          toast.success('Update success');
          router.refresh();
        })
        .catch((err) => {
          toast.error('Update failed');
        });
    },
    [router],
  );

  const onDeleteProduct = React.useCallback(
    async (id: string, images: any[]) => {
      toast('Deleting product instock...');

      const deleteFireBaseImg = async () => {
        try {
          for (const item of images) {
            if (item.image) {
              const imgRef = ref(storage, item.image);
              await deleteObject(imgRef);
              console.log('delete image success');
            }
          }
        } catch (error) {
          console.log(error);
        }
      };

      await deleteFireBaseImg();

      axios
        .delete(`/api/product/${id}`)
        .then((rs) => {
          toast.success('Delete success');
          router.refresh();
        })
        .catch((err) => {
          toast.error('Delete failed');
        });
    },
    [router, storage],
  );

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
