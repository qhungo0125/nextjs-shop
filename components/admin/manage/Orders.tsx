'use client';

import Heading from '@/components/Heading';
import { priceFormatter } from '@/utils/text';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Order, User } from '@prisma/client';
import moment from 'moment';
import React from 'react';
import {
  MdAccessTimeFilled,
  MdClose,
  MdDeliveryDining,
  MdDone,
  MdRemoveRedEye,
} from 'react-icons/md';
import Status from '../Status';
import ActionBtn from '../ActionBtn';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

interface Props {
  orders: ExtendedOrder[];
}

type ExtendedOrder = Order & {
  user: User;
};

const Orders: React.FC<Props> = (props) => {
  const { orders } = props;
  const router = useRouter();

  let rows: any = [];

  if (orders) {
    rows = orders.map((order) => ({
      id: order.id,
      customer: order.user.name,
      amount: priceFormatter(order.amount / 100),
      paymentStatus: order.status,
      date: moment(order.createDateTime).fromNow(),
      deliveryStatus: order.deliveryStatus,
    }));
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 220 },
    { field: 'customer', headerName: 'Customer Name', width: 220 },
    {
      field: 'amount',
      headerName: 'Amount',
      width: 100,
      renderCell: (params) => {
        return (
          <div className='font-bold text-slate-800'>{params.row.amount}</div>
        );
      },
    },
    {
      field: 'paymentStatus',
      headerName: 'Payment Status',
      width: 120,
      renderCell: (params) => {
        return (
          <div className='font-bold text-slate-800'>
            {params.row.paymentStatus === 'pending' ? (
              <Status
                text='Pending'
                icon={MdAccessTimeFilled}
                bg='bg-slate-200'
                color='text-slate-800'
              />
            ) : params.row.paymentStatus === 'dispatched' ? (
              <Status
                text='dispatched'
                icon={MdDeliveryDining}
                bg='bg-purple-200'
                color='text-purple-800'
              />
            ) : params.row.paymentStatus === 'completed' ? (
              <Status
                text='completed'
                icon={MdDone}
                bg='bg-teal-200'
                color='text-teal-800'
              />
            ) : (
              <></>
            )}
          </div>
        );
      },
    },

    {
      field: 'deliveryStatus',
      headerName: 'Delivery Status',
      width: 120,
      renderCell: (params) => {
        return (
          <div className='font-bold text-slate-800'>
            {params.row.deliveryStatus === 'pending' ? (
              <Status
                text='Pending'
                icon={MdAccessTimeFilled}
                bg='bg-slate-200'
                color='text-slate-800'
              />
            ) : params.row.deliveryStatus === 'dispatched' ? (
              <Status
                text='dispatched'
                icon={MdDeliveryDining}
                bg='bg-purple-200'
                color='text-purple-800'
              />
            ) : params.row.deliveryStatus === 'delivered' ? (
              <Status
                text='delivered'
                icon={MdDone}
                bg='bg-teal-200'
                color='text-teal-800'
              />
            ) : (
              <></>
            )}
          </div>
        );
      },
    },
    {
      field: 'date',
      headerName: 'Date',
      width: 120,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => {
        return (
          <div className='flex justify-between gap-4 w-full'>
            <ActionBtn
              icon={MdDeliveryDining}
              onClick={() => {
                handleDispatch(params.row.id);
              }}
            />
            <ActionBtn
              icon={MdDone}
              onClick={() => {
                handleDeliveryDone(params.row.id);
              }}
            />
            <ActionBtn
              icon={MdRemoveRedEye}
              onClick={() => {
                router.push(`/order/${params.row.id}`);
              }}
            />
          </div>
        );
      },
    },
  ];

  const handleDispatch = React.useCallback(
    async (id: string) => {
      axios
        .put('/api/order', {
          id,
          deliveryStatus: 'dispatched',
        })
        .then((rs) => {
          toast.success('Dispatched success');
          router.refresh();
        })
        .catch((err) => {
          toast.error('Dispatched failed');
        });
    },
    [router],
  );

  const handleDeliveryDone = React.useCallback(
    async (id: string) => {
      axios
        .put('/api/order', {
          id,
          deliveryStatus: 'delivered',
        })
        .then((rs) => {
          toast.success('Deliver success');
          router.refresh();
        })
        .catch((err) => {
          toast.error('Deliver failed');
        });
    },
    [router],
  );

  return (
    <div className='max-w-[1150px] m-auto text-xl'>
      <div className='mb-4 mt-8 '>
        <Heading title='Manage Orders' center />
      </div>
      <div className='h-[600px] w-full'>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
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

export default Orders;
