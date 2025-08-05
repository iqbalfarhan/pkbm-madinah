import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Siswa } from '@/types';
import { Link } from '@inertiajs/react';
import { ArrowLeft, Edit, Filter, Trash2, Undo2 } from 'lucide-react';
import { FC, useState } from 'react';
import SiswaBulkEdit from './components/siswa-bulk-edit';
import SiswaFilterSheet from './components/siswa-filter-sheet';
import SiswaStatusBadge from './components/siswa-status-badge';

type SiswaTrashedProps = {
  siswas: Siswa[];
  query: {
    status?: string;
    kelas_id?: number;
    gender?: string;
  };
};

const SiswaTrashed: FC<SiswaTrashedProps> = ({ siswas, query }) => {
  const [cari, setCari] = useState<string | undefined>();
  const [siswaIds, setSiswaIds] = useState<number[]>([]);

  const allSiswaIds = siswas.map((siswa) => siswa.id);
  const isAllChecked = siswaIds?.length === siswas.length;

  const breadcrumbs: BreadcrumbItem[] = [{ title: 'Data siswa', href: route('siswa.index') }];

  const activeFilters = Object.entries(query).filter(([, v]) => v !== undefined && v !== null && v !== '');

  return (
    <AppLayout
      title="Data siswa"
      description="Data siswa yang ada di sekolah"
      breadcrumbs={breadcrumbs}
      actions={
        <>
          <Button asChild variant={'secondary'}>
            <Link href={route('siswa.index')}>
              <ArrowLeft />
              Kembali ke list siswa aktif
            </Link>
          </Button>
        </>
      }
    >
      <div className="flex items-center space-x-2">
        <Input placeholder="Cari siswa..." type="search" value={cari} onChange={(e) => setCari(e.target.value)} />
        <SiswaFilterSheet query={query}>
          <Button>
            <Filter />
            Filter data
            {activeFilters.length > 0 && <Badge variant={'secondary'}>{activeFilters.length}</Badge>}
          </Button>
        </SiswaFilterSheet>
        {siswaIds && siswaIds.length > 0 && (
          <>
            <Button variant={'ghost'} disabled>
              {siswaIds.length} item selected
            </Button>
            <SiswaBulkEdit siswaIds={siswaIds} onSuccess={() => setSiswaIds([])}>
              <Button>
                <Edit />
                Edit data
              </Button>
            </SiswaBulkEdit>
            <Button variant={'destructive'}>
              <Trash2 />
              Hapus data
            </Button>
          </>
        )}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Button variant={'ghost'} size={'icon'} asChild>
                <Label>
                  <Checkbox
                    checked={isAllChecked}
                    onCheckedChange={(checked) => {
                      setSiswaIds(checked ? allSiswaIds : []);
                    }}
                  />
                </Label>
              </Button>
            </TableHead>
            <TableHead>NISN</TableHead>
            <TableHead>Nama siswa</TableHead>
            <TableHead>Tempat, tanggal lahir</TableHead>
            <TableHead>Jenis kelamin</TableHead>
            <TableHead>Kelas</TableHead>
            <TableHead>Status</TableHead>
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
                      <Checkbox
                        checked={siswaIds?.includes(siswa.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSiswaIds((prev) => [...prev, siswa.id]);
                          } else {
                            setSiswaIds((prev) => prev.filter((id) => id !== siswa.id));
                          }
                        }}
                      />
                    </Label>
                  </Button>
                </TableCell>
                <TableCell className="font-mono">{siswa.nisn}</TableCell>
                <TableCell>{siswa.name}</TableCell>
                <TableCell>{siswa.ttl}</TableCell>
                <TableCell>{siswa.gender}</TableCell>
                <TableCell>{siswa.kelas?.name}</TableCell>
                <TableCell>
                  <SiswaStatusBadge status={siswa.status} />
                </TableCell>
                <TableCell className="flex gap-2">
                  <Button variant={'secondary'} size={'icon'}>
                    <Link href={route('siswa.restore', siswa.id)} method="post">
                      <Undo2 />
                    </Link>
                  </Button>
                  <Button variant={'destructive'} size={'icon'}>
                    <Link href={route('siswa.force-delete', siswa.id)} method="delete">
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

export default SiswaTrashed;
