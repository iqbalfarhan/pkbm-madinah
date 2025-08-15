import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import PelajaranFormSheet from '@/pages/pelajaran/components/pelajaran-form-sheet';
import { Kelas } from '@/types';
import { Link } from '@inertiajs/react';
import { Edit, Folder } from 'lucide-react';
import { FC } from 'react';
import KelasLayout from '../layout/kelas-layout';

type PelajaranProps = {
  kelas: Kelas;
};

const Pelajaran: FC<PelajaranProps> = ({ kelas }) => {
  const pelajarans = kelas.pelajarans ?? [];
  return (
    <KelasLayout kelas={kelas}>
      <PelajaranFormSheet purpose="create" kelas={kelas}>
        <Button>Tambah pelajaran</Button>
      </PelajaranFormSheet>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nama matapelajaran</TableHead>
            <TableHead>Guru pengajar</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pelajarans.map((pelajaran) => (
            <TableRow key={pelajaran.id}>
              <TableCell>{pelajaran.mapel.name}</TableCell>
              <TableCell>{pelajaran.guru.name}</TableCell>
              <TableCell>
                <Button variant={'ghost'} size={'icon'} asChild>
                  <Link href={route('pelajaran.show', pelajaran.id)}>
                    <Folder />
                  </Link>
                </Button>
                <PelajaranFormSheet purpose="edit" kelas={kelas} pelajaran={pelajaran}>
                  <Button variant={'ghost'} size={'icon'}>
                    <Edit />
                  </Button>
                </PelajaranFormSheet>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </KelasLayout>
  );
};

export default Pelajaran;
