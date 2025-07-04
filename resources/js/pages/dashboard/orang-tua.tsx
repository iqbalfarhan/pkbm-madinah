import AppLayout from '@/layouts/app-layout';
import { Siswa } from '@/types';
import { FC } from 'react';
import SiswaItemCard from '../siswa/components/siswa-item-card';

type DashboardOrangtuaProps = {
  siswas: Siswa[];
};

const DashboardOrangtua: FC<DashboardOrangtuaProps> = ({ siswas }) => {
  return (
    <AppLayout title="List data peserta didik">
      <div className="grid grid-cols-4 gap-6">
        {siswas.map((siswa) => (
          <SiswaItemCard key={siswa.id} asLink siswa={siswa} />
        ))}
      </div>
    </AppLayout>
  );
};

export default DashboardOrangtua;
