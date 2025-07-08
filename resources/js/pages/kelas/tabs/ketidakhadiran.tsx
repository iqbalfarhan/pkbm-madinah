import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import KetidakhadiranCreateSheet from '@/pages/ketidakhadiran/components/ketidakhadiran-create-sheet';
import KetidakhadiranTable from '@/pages/ketidakhadiran/components/ketidakhadiran-table';
import { Kelas, Ketidakhadiran } from '@/types';
import { Plus } from 'lucide-react';
import { FC } from 'react';
import KelasLayout from '../layout/kelas-layout';

type KetidakhadiranListProps = {
  kelas: Kelas;
  ketidakhadirans: Ketidakhadiran[];
};

const KetidakhadiranList: FC<KetidakhadiranListProps> = ({ kelas, ketidakhadirans }) => {
  return (
    <KelasLayout kelas={kelas}>
      <div className="flex items-center justify-center gap-4">
        <Input placeholder="Cari ketidakhadiran" />
        <KetidakhadiranCreateSheet siswas={kelas.siswas}>
          <Button>
            <Plus />
            Tambah ketidakhadiran
          </Button>
        </KetidakhadiranCreateSheet>
      </div>
      <KetidakhadiranTable ketidakhadirans={ketidakhadirans} />
    </KelasLayout>
  );
};

export default KetidakhadiranList;
