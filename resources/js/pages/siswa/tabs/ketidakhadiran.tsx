import { Siswa } from '@/types';
import { FC } from 'react';
import SiswaLayout from '../layout/siswa-layout';

type KetidakhadiranProps = {
  siswa: Siswa;
};

const Ketidakhadiran: FC<KetidakhadiranProps> = ({ siswa }) => {
  return (
    <SiswaLayout siswa={siswa}>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore hic explicabo ipsam maxime. Accusamus, similique recusandae dolorum fugit a
      saepe ea exercitationem illo sed, sapiente, molestiae debitis deleniti magni commodi.
    </SiswaLayout>
  );
};

export default Ketidakhadiran;
