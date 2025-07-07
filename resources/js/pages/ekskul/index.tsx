import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Ekskul } from '@/types';
import { Link } from '@inertiajs/react';
import { Edit, Folder, Plus, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import EkskulDetailSheet from './component/ekskul-detail-sheet';
import EkskulFormSheet from './component/ekskul-form-sheet';

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
        <EkskulFormSheet purpose="create">
          <Button>
            <Plus />
            Tambah
          </Button>
        </EkskulFormSheet>
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
            <TableHead>Koordinator</TableHead>
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
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="size-6">
                      <AvatarImage src={ekskul.guru?.avatar} />
                    </Avatar>
                    {ekskul.guru?.name}
                  </div>
                </TableCell>
                <TableCell>{ekskul.siswas?.length} siswa</TableCell>
                <TableCell>
                  <EkskulDetailSheet ekskul={ekskul}>
                    <Button variant={'ghost'} size={'icon'}>
                      <Folder />
                    </Button>
                  </EkskulDetailSheet>
                  <EkskulFormSheet ekskul={ekskul} purpose="edit">
                    <Button variant={'ghost'} size={'icon'}>
                      <Edit />
                    </Button>
                  </EkskulFormSheet>
                  <Button variant={'ghost'} size={'icon'}>
                    <Link href={route('ekskul.destroy', ekskul.id)} method="delete" preserveScroll={true}>
                      <Trash2 />
                    </Link>
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
