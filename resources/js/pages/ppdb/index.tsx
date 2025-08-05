import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { usePageProps } from '@/hooks/use-page-props';
import AppLayout from '@/layouts/app-layout';
import { errorMessage } from '@/lib/utils';
import { Siswa } from '@/types';
import { Link, router } from '@inertiajs/react';
import { CheckCheck, Folder, MoreHorizontal, Printer, Settings, ThumbsUp, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import { toast } from 'sonner';
import SiswaStatusBadge from '../siswa/components/siswa-status-badge';
import PpdbPengaturanDialog from './components/ppdb-pengaturan-dialog';

type PpdbListProps = {
  siswas: Siswa[];
};

const PpdbList: FC<PpdbListProps> = ({ siswas }) => {
  const [cari, setCari] = useState<string | undefined>();
  const { settings, active_ta } = usePageProps();

  const handleAcceptPpdb = (id: Siswa['id']) => {
    router.delete(route('ppdb.accept', id), {
      preserveScroll: true,
      onSuccess: () => toast.success('Berhasil menerima calon peserta didik'),
      onError: (e) => toast.error(errorMessage(e)),
    });
  };

  const handleDeletePpdb = (id: Siswa['id']) => {
    router.delete(route('siswa.destroy', id), {
      preserveScroll: true,
      onSuccess: () => toast.success('Berhasil menerima calon peserta didik'),
      onError: (e) => toast.error(errorMessage(e)),
    });
  };

  return (
    <AppLayout
      title="Calon peserta didik baru"
      description="Daftar calon peserta didik baru"
      actions={
        <>
          <PpdbPengaturanDialog>
            <Button>
              <Settings />
              Pengaturan PPDB
            </Button>
          </PpdbPengaturanDialog>
        </>
      }
    >
      {settings['PPDB_OPEN'] === 'true' && (
        <Alert variant={'success'}>
          <ThumbsUp />
          <AlertTitle>Sesi PPDB sedang dibuka</AlertTitle>
          <AlertDescription>Pendaftaran peserta didik baru untuk TA {active_ta?.label} sedang dibuka</AlertDescription>
        </Alert>
      )}
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
            .map((siswa) => {
              const lunas = siswa.media?.some((media) => media.collection_name === 'bukti bayar');
              return (
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
                  <TableCell>
                    <SiswaStatusBadge status={siswa.status} />
                  </TableCell>
                  <TableCell>
                    {lunas && (
                      <Link href={route('ppdb.show', siswa.id)}>
                        <Badge>Lihat bukti bayar</Badge>
                      </Link>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button variant={'ghost'} onClick={() => handleAcceptPpdb(siswa.id)}>
                      <CheckCheck />
                      Terima pendaftaran
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant={'ghost'} size={'icon'}>
                          <MoreHorizontal />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="right">
                        <DropdownMenuItem asChild>
                          <Link href={route('ppdb.show', siswa.id)}>
                            <Folder /> Detail calon pesdik
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Printer /> Cetak formulir pendaftaran
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive" onSelect={() => handleDeletePpdb(siswa.id)}>
                          <Trash2 /> Hapus calon pesdik
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </AppLayout>
  );
};

export default PpdbList;
