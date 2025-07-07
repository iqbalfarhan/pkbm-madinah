import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Kelas } from '@/types';
import { Link } from '@inertiajs/react';
import { Folder, ListX, Phone } from 'lucide-react';
import { FC } from 'react';
import SiswaKontakDialog from '../siswa/components/siswa-kontak-dialog';
import KelasLayout from './layout/kelas-layout';

type DetailKelasProps = {
  kelas: Kelas;
};

const DetailKelas: FC<DetailKelasProps> = ({ kelas }) => {
  return (
    <KelasLayout kelas={kelas}>
      <Input type="search" placeholder="Cari siswa" />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>NISN</TableHead>
            <TableHead>Nama siswa</TableHead>
            <TableHead>Tempat, tanggal lahir</TableHead>
            <TableHead>Jenis kelamin</TableHead>
            <TableHead>Ketidakhadiran</TableHead>
            <TableHead>Ekskul</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {kelas.siswas.map((siswa, index) => (
            <TableRow key={siswa.id}>
              <TableCell>{index + 1}</TableCell>
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
              <TableCell>3 hari</TableCell>
              <TableCell>{siswa.ekskuls?.map((eks) => eks.name).join(', ')}</TableCell>
              <TableCell>
                <SiswaKontakDialog siswa={siswa}>
                  <Button variant={'ghost'} size={'icon'}>
                    <Phone />
                  </Button>
                </SiswaKontakDialog>
                <Button variant={'ghost'} size={'icon'}>
                  <ListX />
                </Button>
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
