import HeadingSmall from '@/components/heading-small';
import { usePageProps } from '@/hooks/use-page-props';
import KetidakhadiranTable from '@/pages/ketidakhadiran/components/ketidakhadiran-table';
import { Ketidakhadiran, Siswa } from '@/types';
import { FC } from 'react';
import SiswaLayout from '../layout/siswa-layout';

type KetidakhadiranSiswaProps = {
  siswa: Siswa;
  ketidakhadirans: Ketidakhadiran[];
};

const KetidakhadiranSiswa: FC<KetidakhadiranSiswaProps> = ({ siswa, ketidakhadirans }) => {
  const { active_ta } = usePageProps();
  return (
    <SiswaLayout siswa={siswa}>
      <HeadingSmall title="Ketidakhadiran siswa" description={`Tahun ajaran ${active_ta.label}`} />
      <KetidakhadiranTable ketidakhadirans={ketidakhadirans} />
    </SiswaLayout>
  );
};

export default KetidakhadiranSiswa;
