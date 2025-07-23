import AppLayout from '@/layouts/app-layout';
import { Pelajaran } from '@/types';
import { FC } from 'react';

type PelajaranDetailProps = {
  pelajaran: Pelajaran;
};

const PelajaranDetail: FC<PelajaranDetailProps> = ({ pelajaran }) => {
  return (
    <AppLayout>
      <pre>{JSON.stringify(pelajaran, null, 2)}</pre>
    </AppLayout>
  );
};

export default PelajaranDetail;
