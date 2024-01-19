import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { IconType } from 'react-icons';
import queryString from 'query-string';
interface Props {
  label: string;
  icon: IconType;
  selected?: boolean;
}

const CategoryItem: React.FC<Props> = (props) => {
  const { label, icon: Icon, selected } = props;
  const router = useRouter();
  const params = useSearchParams();

  const onCLick = React.useCallback(() => {
    if (label === 'all') {
      router.push('/');
      return;
    }

    let currentQuery = {};

    if (params) {
      currentQuery = queryString.parse(params.toString());
    }

    const updatedQuery = {
      ...currentQuery,
      category: label,
    };

    const url = queryString.stringifyUrl(
      {
        url: '/',
        query: updatedQuery,
      },
      {
        skipNull: true,
      },
    );

    router.push(url);
  }, [router, label, params]);
  return (
    <div
      onClick={() => onCLick()}
      className={`flex items-center justify-center text-center gap-1 p-2 border-b-2 hover:text-slate-800 transistion cursor-pointer
  ${
    selected
      ? 'text-slate-800 border-slate-800'
      : 'text-slate-400 border-transparent'
  }
  `}
    >
      <Icon size={20} />
      <div className='font-medium text-sm'>{label}</div>
    </div>
  );
};

export default CategoryItem;
