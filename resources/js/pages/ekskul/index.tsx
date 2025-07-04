import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Ekskul } from '@/types';
import { Edit, Plus, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';

type ListEkskulProps = {
  ekskuls: Ekskul[];
};

const ListEkskul: FC<ListEkskulProps> = ({ ekskuls }) => {
  const [cari, setCari] = useState<string | undefined>();

  return (
    <AppLayout
      title="List Ekstrakulikuler"
      description="Ekstrakulikuler dan kegiatan luar pelajaran siswa"
      actions={
        <Button>
          <Plus />
          Tambah
        </Button>
      }
    >
      <Input placeholder="Cari ekskul..." type="search" value={cari} onChange={(e) => setCari(e.target.value)} />
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
            <TableHead>Nama ekstrakulikuler</TableHead>
            <TableHead>Jumlah anggota</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ekskuls
            .filter((ekskul) =>
              JSON.stringify(ekskul)
                .toLowerCase()
                .includes(cari?.toLowerCase() || ''),
            )
            .map((ekskul) => (
              <TableRow key={ekskul.id}>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'} asChild>
                    <Label>
                      <Checkbox />
                    </Label>
                  </Button>
                </TableCell>
                <TableCell>{ekskul.name}</TableCell>
                <TableCell>{ekskul.siswas?.length} siswa</TableCell>
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

export default ListEkskul;
