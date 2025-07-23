import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Kelas } from '@/types';
import { Edit, Plus, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';

type AllKelasProps = {
  kelases: Kelas[];
};

const AllKelas: FC<AllKelasProps> = ({ kelases }) => {
  const [cari, setCari] = useState<string | undefined>();

  return (
    <AppLayout
      title="Copy Me"
      description="Copy Me"
      actions={
        <Button>
          <Plus />
          Tambah
        </Button>
      }
    >
      <Input placeholder="Cari kelas..." type="search" value={cari} onChange={(e) => setCari(e.target.value)} />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Button variant={'ghost'} size={'icon'} asChild>
                <Label>
                  <Checkbox />
                </Label>
              </Button>
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Tahun ajaran</TableHead>
            <TableHead>Walikelas</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {kelases
            .filter((kelas) =>
              JSON.stringify(kelas)
                .toLowerCase()
                .includes(cari?.toLowerCase() || ''),
            )
            .map((kelas) => (
              <TableRow key={kelas.id}>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'} asChild>
                    <Label>
                      <Checkbox />
                    </Label>
                  </Button>
                </TableCell>
                <TableCell>{kelas.name}</TableCell>
                <TableCell>{kelas.tahunajaran?.label}</TableCell>
                <TableCell>{kelas.walikelas?.name}</TableCell>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'}>
                    <Edit />
                  </Button>
                  <Button variant={'ghost'} size={'icon'}>
                    <Trash2 />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </AppLayout>
  );
};

export default AllKelas;
