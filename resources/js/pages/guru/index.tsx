import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Guru } from '@/types';
import { Link } from '@inertiajs/react';
import { Edit, Folder, Plus, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import DeleteGuru from './components/delete-guru';
import GuruFormSheet from './components/guru-form-sheet';

type GuruListProps = {
  gurus: Guru[];
};

const GuruList: FC<GuruListProps> = ({ gurus }) => {
  const [cari, setCari] = useState<string | undefined>();
  const breadcrumbs: BreadcrumbItem[] = [{ title: 'Tenaga pendidik', href: route('guru.index') }];

  return (
    <AppLayout
      title="List tenaga pendidik"
      description="List tenaga pendidik"
      breadcrumbs={breadcrumbs}
      actions={
        <GuruFormSheet purpose="create">
          <Button>
            <Plus />
            Tambah
          </Button>
        </GuruFormSheet>
      }
    >
      <Input placeholder="Cari guru..." type="search" value={cari} onChange={(e) => setCari(e.target.value)} />
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
            {/* <TableHead>NIP</TableHead> */}
            <TableHead>Nama tenaga pendidik</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Jenis kelamin</TableHead>
            <TableHead>Nomor telepon</TableHead>
            <TableHead>Login terakhir</TableHead>
            <TableHead>Walikelas</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {gurus
            .filter((guru) =>
              JSON.stringify(guru)
                .toLowerCase()
                .includes(cari?.toLowerCase() || ''),
            )
            .map((guru) => (
              <TableRow key={guru.id}>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'} asChild>
                    <Label>
                      <Checkbox />
                    </Label>
                  </Button>
                </TableCell>
                {/* <TableCell className="font-mono">{guru.nip}</TableCell> */}
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="size-6">
                      <AvatarImage src={guru.avatar} alt={guru.name} />
                    </Avatar>
                    {guru.name}
                  </div>
                </TableCell>
                <TableCell>{guru.user?.email}</TableCell>
                <TableCell>{guru.gender}</TableCell>
                <TableCell className="font-mono">{guru.phone}</TableCell>
                <TableCell>{guru.user?.last_login}</TableCell>
                <TableCell>{guru.walikelas?.name}</TableCell>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'} asChild>
                    <Link href={route('guru.show', guru.id)}>
                      <Folder />
                    </Link>
                  </Button>
                  <Button variant={'ghost'} size={'icon'}>
                    <Edit />
                  </Button>
                  <DeleteGuru guru={guru}>
                    <Button variant={'ghost'} size={'icon'}>
                      <Trash2 />
                    </Button>
                  </DeleteGuru>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </AppLayout>
  );
};

export default GuruList;
