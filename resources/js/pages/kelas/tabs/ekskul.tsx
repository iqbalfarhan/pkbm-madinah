import { Kelas } from '@/types';
import { FC } from 'react';
import KelasLayout from '../layout/kelas-layout';

type EkskulSiswaProps = {
  kelas: Kelas;
};

const EkskulSiswa: FC<EkskulSiswaProps> = ({ kelas }) => {
  return (
    <KelasLayout kelas={kelas}>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae rerum in ducimus sunt, cumque debitis tempore nam commodi, saepe pariatur
        laborum voluptas recusandae expedita quibusdam repellendus consectetur quae quisquam aliquam.
      </p>
    </KelasLayout>
  );
};

export default EkskulSiswa;
