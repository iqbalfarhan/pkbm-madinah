import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Nilai, Pelajaran, Siswa } from '@/types';
import { FC } from 'react';
import PelajaranInputNilaiPopover from '../components/pelajaran-input-nilai-popover';
import PelajaranLayout from '../layout/pelajaran-layout';

type Props = {
  siswas: Siswa[];
  pelajaran: Pelajaran;
  nilais: Nilai[];
};

const NilaiPelajaran: FC<Props> = ({ siswas, nilais, pelajaran }) => {
  return (
    <PelajaranLayout>
      {/* <pre>{JSON.stringify(nilais, null, 2)}</pre> */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>NISN</TableHead>
            <TableHead>Nama</TableHead>
            <TableHead>Nilai tugas</TableHead>
            <TableHead>Nilai evaluasi</TableHead>
            <TableHead>Rata-rata</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {siswas.map((siswa, index) => {
            const nilai = nilais?.find((n) => n.siswa_id === siswa.id);
            return (
              <TableRow key={siswa.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{siswa.nisn}</TableCell>
                <TableCell>{siswa.name}</TableCell>
                <TableCell>
                  <PelajaranInputNilaiPopover nilai={nilai} jenis="tugas" pelajaran_id={pelajaran.id} siswa_id={siswa.id} />
                </TableCell>
                <TableCell>
                  <PelajaranInputNilaiPopover nilai={nilai} jenis="evaluasi" pelajaran_id={pelajaran.id} siswa_id={siswa.id} />
                </TableCell>
                <TableCell>{((nilai?.nilai_tugas ?? 0) + (nilai?.nilai_evaluasi ?? 0)) / 2}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </PelajaranLayout>
  );
};

export default NilaiPelajaran;
