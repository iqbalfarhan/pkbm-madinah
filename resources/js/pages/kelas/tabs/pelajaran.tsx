import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Kelas } from '@/types';
import { FC } from 'react';
import KelasLayout from '../layout/kelas-layout';

type PelajaranProps = {
  kelas: Kelas;
};

const Pelajaran: FC<PelajaranProps> = ({ kelas }) => {
  const pelajarans = kelas.pelajarans ?? [];
  return (
    <KelasLayout kelas={kelas}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nama matapelajaran</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pelajarans.map((pelajaran) => (
            <TableRow key={pelajaran.id}>
              <TableCell>{pelajaran.mapel.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </KelasLayout>
  );
};

export default Pelajaran;
