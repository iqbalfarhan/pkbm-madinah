import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Siswa } from '@/types';
import { Edit } from 'lucide-react';
import { FC } from 'react';
import SiswaLayout from '../layout/siswa-layout';

type EkskulSiswaProps = {
  siswa: Siswa;
  ekskuls: Siswa['ekskuls'];
};

const EkskulSiswa: FC<EkskulSiswaProps> = ({ siswa, ekskuls }) => {
  return (
    <SiswaLayout siswa={siswa}>
      <HeadingSmall title="Kestrakulikuler" description="Ekstrakurikuler dan kegiatan siswa" />
      <div className="flex gap-4">
        <Input placeholder="Cari Ekskul" />
        <Button>Tambah</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Nama Ekstarkulikuler</TableHead>
            <TableHead>Kegiatan</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ekskuls?.map((ekskul, index) => (
            <TableRow key={ekskul.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{ekskul.name}</TableCell>
              <TableCell>
                <p className="text-wrap">{ekskul.pivot.kegiatan}</p>
              </TableCell>
              <TableCell>
                <Button variant={'ghost'} size={'icon'}>
                  <Edit />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </SiswaLayout>
  );
};

export default EkskulSiswa;
