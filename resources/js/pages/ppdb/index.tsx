import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Siswa } from '@/types';
import { Link } from '@inertiajs/react';
import { Edit, Folder, Settings, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import SiswaStatusBadge from '../siswa/components/siswa-status-badge';
import PpdbPengaturanDialog from './components/ppdb-pengaturan-dialog';

type PpdbListProps = {
  siswas: Siswa[];
};

const PpdbList: FC<PpdbListProps> = ({ siswas }) => {
  const [cari, setCari] = useState<string | undefined>();

  return (
    <AppLayout
      title="Calon peserta didik baru"
      description="Daftar calon peserta didik baru"
      actions={
        <>
          <Button variant={'ghost'} className="animate-pulse text-chart-3">
            Saat ini ppdb sedang dibuka
          </Button>
          <PpdbPengaturanDialog>
            <Button>
              <Settings />
              Pengaturan PPDB
            </Button>
          </PpdbPengaturanDialog>
        </>
      }
    >
      <Input placeholder="Cari siswa..." type="search" value={cari} onChange={(e) => setCari(e.target.value)} />
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
            <TableHead>Nama calon peserta didik</TableHead>
            <TableHead>Tempat, Tanggal lahir</TableHead>
            <TableHead>Jenis kelamin</TableHead>
            <TableHead>Tanggal input</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Pembayaran</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {siswas
            .filter((siswa) =>
              JSON.stringify(siswa)
                .toLowerCase()
                .includes(cari?.toLowerCase() || ''),
            )
            .map((siswa) => (
              <TableRow key={siswa.id}>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'} asChild>
                    <Label>
                      <Checkbox />
                    </Label>
                  </Button>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="size-6">
                      <AvatarImage src={siswa.avatar} />
                    </Avatar>
                    {siswa.name}
                  </div>
                </TableCell>
                <TableCell>{siswa.ttl}</TableCell>
                <TableCell>{siswa.gender}</TableCell>
                <TableCell>{siswa.created_at}</TableCell>
                <TableCell>
                  <SiswaStatusBadge status={siswa.status} />
                </TableCell>
                <TableCell>
                  <Badge variant={'success'}>Lunas</Badge>
                </TableCell>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'}>
                    <Link href={route('ppdb.show', siswa.id)}>
                      <Folder />
                    </Link>
                  </Button>
                  <Button variant={'ghost'} size={'icon'}>
                    <Link href={route('ppdb.edit', siswa.id)}>
                      <Edit />
                    </Link>
                  </Button>
                  <Button variant={'ghost'} size={'icon'}>
                    <Link href={route('siswa.destroy', siswa.id)} method="delete">
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

export default PpdbList;
