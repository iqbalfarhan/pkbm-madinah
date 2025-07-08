import { Siswa } from '@/types';
import { FC } from 'react';
import SiswaItemCard from '../../siswa/components/siswa-item-card';

type DashboardOrangtuaProps = {
  siswas: Siswa[];
};

const DashboardOrangtua: FC<DashboardOrangtuaProps> = ({ siswas }) => {
  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        {siswas.map((siswa) => (
          <SiswaItemCard key={siswa.id} asLink siswa={siswa} />
        ))}
      </div>
    </>
  );
};

export default DashboardOrangtua;
