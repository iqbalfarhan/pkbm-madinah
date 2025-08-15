import { Input } from '@/components/ui/input';
import { Kelas } from '@/types';
import { FC } from 'react';
import SiswaItemCard from '../siswa/components/siswa-item-card';
import KelasLayout from './layout/kelas-layout';

type DetailKelasProps = {
  kelas: Kelas;
};

const DetailKelas: FC<DetailKelasProps> = ({ kelas }) => {
  return (
    <KelasLayout kelas={kelas}>
      <Input type="search" placeholder="Cari siswa" />
      <div className="grid grid-cols-4 gap-4">
        {kelas.siswas.map((s) => (
          <SiswaItemCard key={s.id} asLink siswa={s} />
        ))}
      </div>
    </KelasLayout>
  );
};

export default DetailKelas;
