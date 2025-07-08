import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Rapor } from '@/types';
import { Link } from '@inertiajs/react';
import { Download, Edit, Filter, Folder, Plus, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import RaporCreateDialog from './components/rapor-create-dialog';
import RaporFilterSheet from './components/rapor-filter-sheet';
import RaporPublishToggle from './components/rapor-publih-toggle';

type RaporListProps = {
  rapors: Rapor[];
  query: {
    tahunajaran_id?: number;
    jenis?: string;
  };
};

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Rapor',
    href: '/rapor',
  },
];

const RaporList: FC<RaporListProps> = ({ rapors, query }) => {
  const [cari, setCari] = useState<string | undefined>();

  const activeFilters = Object.entries(query).filter(([, v]) => v !== undefined && v !== null && v !== '');

  return (
    <AppLayout
      breadcrumbs={breadcrumbs}
      title="List rapor siswa"
      description="List rapor siswa"
      actions={
        <RaporCreateDialog>
          <Button>
            <Plus />
            Tambah
          </Button>
        </RaporCreateDialog>
      }
    >
      <div className="flex items-center gap-4">
        <Input placeholder="Cari dengan nama atau nisn..." type="search" value={cari} onChange={(e) => setCari(e.target.value)} />
        <RaporFilterSheet>
          <Button>
            <Filter />
            Filter data
            {activeFilters.length > 0 && <Badge variant={'secondary'}>{activeFilters.length}</Badge>}
          </Button>
        </RaporFilterSheet>
      </div>
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
            <TableHead>Tahuh ajaran</TableHead>
            <TableHead>Jenis rapor</TableHead>
            <TableHead>NISN</TableHead>
            <TableHead>Nama siswa</TableHead>
            <TableHead>Kelas</TableHead>
            <TableHead>Publish</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rapors
            .filter((rapor) =>
              JSON.stringify(rapor)
                .toLowerCase()
                .includes(cari?.toLowerCase() || ''),
            )
            .map((rapor) => (
              <TableRow key={rapor.id}>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'} asChild>
                    <Label>
                      <Checkbox />
                    </Label>
                  </Button>
                </TableCell>
                <TableCell>{rapor.tahunajaran.label}</TableCell>
                <TableCell>{rapor.jenis}</TableCell>
                <TableCell>{rapor.siswa.nisn}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="size-6">
                      <AvatarImage src={rapor.siswa.avatar} />
                    </Avatar>
                    {rapor.siswa.name}
                  </div>
                </TableCell>
                <TableCell>{rapor.siswa.kelas?.name}</TableCell>
                <TableCell>
                  <RaporPublishToggle rapor={rapor}>
                    <Badge variant={rapor.publish ? 'default' : 'outline'}>{rapor.publish ? 'Published' : 'Draft'}</Badge>
                  </RaporPublishToggle>
                </TableCell>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'} disabled={!rapor.publish}>
                    <a href={route('rapor.download', rapor.id)}>
                      <Download />
                    </a>
                  </Button>
                  <Button variant={'ghost'} size={'icon'} disabled={!rapor.publish}>
                    <a href={route('rapor.stream', rapor.id)}>
                      <Folder />
                    </a>
                  </Button>
                  <Button variant={'ghost'} size={'icon'}>
                    <Link href={route('rapor.edit', rapor.id)}>
                      <Edit />
                    </Link>
                  </Button>
                  <Button variant={'ghost'} size={'icon'}>
                    <Link href={route('rapor.destroy', rapor.id)} method="delete">
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

export default RaporList;
