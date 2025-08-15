import HeadingSmall from '@/components/heading-small';
import PelajaranItemCard from '@/pages/pelajaran/components/pelajaran-item-card';
import { Pelajaran } from '@/types';
import { FC } from 'react';

type Props = {
  pelajarans: Pelajaran[];
};

const DashboardGuru: FC<Props> = ({ pelajarans }) => {
  return (
    <>
      <HeadingSmall title="Mata pelajaran yang saya ajar" description="List mata pelajaran yang saya ajar" />
      <div className="grid gap-4 md:grid-cols-4">
        {pelajarans.map((m, index) => (
          <PelajaranItemCard asLink key={index} pelajaran={m} />
        ))}
      </div>
    </>
  );
};

export default DashboardGuru;
