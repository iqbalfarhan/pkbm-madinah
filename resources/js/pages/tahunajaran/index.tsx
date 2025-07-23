import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, TahunAjaran } from '@/types';
import { Link, router } from '@inertiajs/react';
import { AlertCircleIcon, Edit, Plus, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import { toast } from 'sonner';
import TahunAjaranFormSheet from './components/tahun-ajaran-form-sheet';

type TahunAjaranListProps = {
  tahunajarans: TahunAjaran[];
  active?: TahunAjaran;
};

const TahunAjaranList: FC<TahunAjaranListProps> = ({ tahunajarans, active }) => {
  const [cari, setCari] = useState<string | undefined>();
  const breadcrumbs: BreadcrumbItem[] = [{ title: 'Tahun ajaran', href: route('tahunajaran.index') }];

  const toggleActive = (ta: TahunAjaran) => {
    router.put(
      route('tahunajaran.update', ta.id),
      { active: !ta.active },
      { preserveScroll: true, onSuccess: () => toast.success('Berhasil mengubah status') },
    );
  };

  return (
    <AppLayout
      title="Tahun ajaran dan semester"
      description={active ? `Tahun ajaran dan semester yang aktif adalah ${active?.name} ${active?.semester}` : 'Belum ada tahun ajaran yang aktif'}
      breadcrumbs={breadcrumbs}
      actions={
        <TahunAjaranFormSheet purpose="create">
          <Button>
            <Plus />
            Tambah
          </Button>
        </TahunAjaranFormSheet>
      }
    >
      {!active && (
        <Alert variant={'destructive'}>
          <AlertCircleIcon />
          <AlertTitle>Belum ada tahun ajaran aktif</AlertTitle>
          <AlertDescription>Saat ini belum ada tahun ajaran yang aktif. Silakan pilih tahun ajaran yang ingin diaktifkan.</AlertDescription>
        </Alert>
      )}
      <Input placeholder="Cari tahun ajaran..." type="search" value={cari} onChange={(e) => setCari(e.target.value)} />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="w-full">Semester</TableHead>
            <TableHead>Active</TableHead>
            <TableHead>Set active</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tahunajarans
            .filter((ta) =>
              JSON.stringify(ta)
                .toLowerCase()
                .includes(cari?.toLowerCase() || ''),
            )
            .map((ta, index) => (
              <TableRow key={ta.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{ta.name}</TableCell>
                <TableCell>{ta.semester}</TableCell>
                <TableCell>{ta.active ? <Badge>Tahun ajaran aktif</Badge> : null}</TableCell>
                <TableCell>
                  <Switch checked={ta.active} onCheckedChange={() => toggleActive(ta)} />
                </TableCell>
                <TableCell>
                  <TahunAjaranFormSheet ta={ta} purpose="edit">
                    <Button variant={'ghost'} size={'icon'}>
                      <Edit />
                    </Button>
                  </TahunAjaranFormSheet>
                  <Button variant={'ghost'} size={'icon'} asChild>
                    <Link href={route('tahunajaran.destroy', ta.id)} method="delete">
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

export default TahunAjaranList;
