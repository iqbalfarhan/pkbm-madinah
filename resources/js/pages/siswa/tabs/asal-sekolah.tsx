import HeadingSmall from '@/components/heading-small';
import { Siswa } from '@/types';
import { FC } from 'react';
import SiswaLayout from '../layout/siswa-layout';

type AsalSekolahSiswaProps = {
  siswa: Siswa;
};

const AsalSekolahSiswa: FC<AsalSekolahSiswaProps> = ({ siswa }) => {
  return (
    <SiswaLayout siswa={siswa}>
      <HeadingSmall title="Informasi data diri siswa" description="informasi data diri siswa" />
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe odio eius eum at nesciunt provident est dolores consequuntur nihil ipsum,
        vitae ipsa consectetur harum. Iusto a numquam voluptatum iste illo!
      </p>
    </SiswaLayout>
  );
};

export default AsalSekolahSiswa;
