import KetidakhadiranTable from '@/pages/ketidakhadiran/components/ketidakhadiran-table';
import { Ketidakhadiran, Siswa } from '@/types';
import { FC } from 'react';
import SiswaLayout from '../layout/siswa-layout';

type KetidakhadiranSiswaProps = {
  siswa: Siswa;
  ketidakhadirans: Ketidakhadiran[];
};

const KetidakhadiranSiswa: FC<KetidakhadiranSiswaProps> = ({ siswa, ketidakhadirans }) => {
  return (
    <SiswaLayout siswa={siswa}>
      <KetidakhadiranTable ketidakhadirans={ketidakhadirans} />
    </SiswaLayout>
  );
};

export default KetidakhadiranSiswa;
