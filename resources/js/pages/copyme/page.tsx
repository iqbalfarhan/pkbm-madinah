import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Edit, Plus, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';

type CopyPageProps = {
  datas: string[];
};

const CopyPage: FC<CopyPageProps> = ({ datas }) => {
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
      <Input placeholder="Cari data..." type="search" value={cari} onChange={(e) => setCari(e.target.value)} />
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
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {datas
            .filter((data) =>
              JSON.stringify(data)
                .toLowerCase()
                .includes(cari?.toLowerCase() || ''),
            )
            .map((data) => (
              <TableRow key={data}>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'} asChild>
                    <Label>
                      <Checkbox />
                    </Label>
                  </Button>
                </TableCell>
                <TableCell>{data}</TableCell>
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

export default CopyPage;
