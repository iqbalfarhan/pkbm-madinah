import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Pelajaran } from '@/types';
import { Edit, Plus, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';

type PelajaranListProps = {
  pelajarans: Pelajaran[];
};

const PelajaranList: FC<PelajaranListProps> = ({ pelajarans }) => {
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
      <Input placeholder="Cari pelajaran..." type="search" value={cari} onChange={(e) => setCari(e.target.value)} />
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
            <TableHead>Nama mapel</TableHead>
            <TableHead>Kelas</TableHead>
            <TableHead>Pengajar</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pelajarans
            .filter((pelajaran) =>
              JSON.stringify(pelajaran)
                .toLowerCase()
                .includes(cari?.toLowerCase() || ''),
            )
            .map((pelajaran) => (
              <TableRow key={pelajaran.id}>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'} asChild>
                    <Label>
                      <Checkbox />
                    </Label>
                  </Button>
                </TableCell>
                <TableCell>{pelajaran.mapel.name}</TableCell>
                <TableCell>{pelajaran.kelas.name}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="size-6">
                      <AvatarImage src={pelajaran.guru.avatar} />
                    </Avatar>
                    {pelajaran.guru.name}
                  </div>
                </TableCell>
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

export default PelajaranList;
