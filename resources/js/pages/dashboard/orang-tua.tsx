import { Siswa } from '@/types';
import { FC } from 'react';
import SiswaItemCard from '../siswa/components/siswa-item-card';
import DashboardLayout from './layout/dashboard-layout';

type DashboardOrangtuaProps = {
  siswas: Siswa[];
};

const DashboardOrangtua: FC<DashboardOrangtuaProps> = ({ siswas }) => {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-4 gap-4">
        {siswas.map((siswa) => (
          <SiswaItemCard key={siswa.id} asLink siswa={siswa} />
        ))}
      </div>
    </DashboardLayout>
  );
};

export default DashboardOrangtua;
