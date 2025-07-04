import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Kelas } from '@/types';
import { Link } from '@inertiajs/react';
import { Folder } from 'lucide-react';
import { FC } from 'react';
import KelasLayout from './layout/kelas-layout';

type DetailKelasProps = {
  kelas: Kelas;
};

const DetailKelas: FC<DetailKelasProps> = ({ kelas }) => {
  return (
    <KelasLayout kelas={kelas}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>NISN</TableHead>
            <TableHead>Nama siswa</TableHead>
            <TableHead>Tempat, tanggal lahir</TableHead>
            <TableHead>Jenis kelamin</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {kelas.siswas.map((siswa) => (
            <TableRow>
              <TableCell>{siswa.nisn}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="size-6">
                    <AvatarImage src={siswa.avatar} alt={siswa.name} />
                  </Avatar>
                  {siswa.name}
                </div>
              </TableCell>
              <TableCell>{siswa.ttl}</TableCell>
              <TableCell>{siswa.gender}</TableCell>
              <TableCell>
                <Button variant={'ghost'} size={'icon'}>
                  <Link href={route('siswa.show', siswa.id)}>
                    <Folder />
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </KelasLayout>
  );
};

export default DetailKelas;
