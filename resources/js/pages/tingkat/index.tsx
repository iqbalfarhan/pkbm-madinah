import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Tingkat } from '@/types';
import { Edit, Plus, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import TingkatFormSheet from './components/tingkat-form-dialog';

type CopyPageProps = {
  tingkats: Tingkat[];
};

const CopyPage: FC<CopyPageProps> = ({ tingkats }) => {
  const [cari, setCari] = useState<string | undefined>();

  return (
    <AppLayout
      title="Tingkat kelas"
      description="tingkat kelas"
      actions={
        <TingkatFormSheet purpose="create">
          <Button>
            <Plus />
            Tambah
          </Button>
        </TingkatFormSheet>
      }
    >
      <Input placeholder="Cari tingkat..." type="search" value={cari} onChange={(e) => setCari(e.target.value)} />
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
            <TableHead>No</TableHead>
            <TableHead>Group</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Label</TableHead>
            <TableHead>Kelas</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tingkats
            .filter((tingkat) =>
              JSON.stringify(tingkat)
                .toLowerCase()
                .includes(cari?.toLowerCase() || ''),
            )
            .map((tingkat, index) => (
              <TableRow key={tingkat.id}>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'} asChild>
                    <Label>
                      <Checkbox />
                    </Label>
                  </Button>
                </TableCell>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{tingkat.group}</TableCell>
                <TableCell>{tingkat.name}</TableCell>
                <TableCell>{tingkat.label}</TableCell>
                <TableCell>{tingkat.kelases.flatMap((kelas) => kelas.name).join(', ')}</TableCell>
                <TableCell>
                  <TingkatFormSheet purpose="edit" tingkat={tingkat}>
                    <Button variant={'ghost'} size={'icon'}>
                      <Edit />
                    </Button>
                  </TingkatFormSheet>
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

export default CopyPage;
