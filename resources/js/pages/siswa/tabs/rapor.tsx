import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import RaporCreateDialog from '@/pages/rapor/components/rapor-create-dialog';
import RaporItemCard from '@/pages/rapor/components/rapor-item-card';
import { Rapor, Siswa } from '@/types';
import { ListPlus } from 'lucide-react';
import { FC } from 'react';
import SiswaLayout from '../layout/siswa-layout';

type RaporSiswaProps = {
  siswa: Siswa;
  rapors: Rapor[];
};

const RaporSiswa: FC<RaporSiswaProps> = ({ siswa, rapors }) => {
  return (
    <SiswaLayout siswa={siswa}>
      <HeadingSmall title="E-rapor" description="Data rapor siswa tahun ajaran ini" />
      <div className="flex items-center gap-4">
        <Input placeholder="Pencarian..." />
        <RaporCreateDialog siswa={siswa}>
          <Button>
            <ListPlus />
            Buat rapor
          </Button>
        </RaporCreateDialog>
      </div>
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {rapors.map((rapor) => (
          <RaporItemCard key={rapor.id} rapor={rapor} />
        ))}
      </div>
    </SiswaLayout>
  );
};

export default RaporSiswa;
