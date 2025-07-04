import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Rapor } from '@/types';
import { Link } from '@inertiajs/react';
import { Download, Edit, Filter, Folder, Plus, Share2, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import RaporCreateDialog from './components/rapor-create-dialog';
import RaporFilterSheet from './components/rapor-filter-sheet';
import RaporPublishToggle from './components/rapor-publih-toggle';

type RaporListProps = {
  rapors: Rapor[];
};

const RaporList: FC<RaporListProps> = ({ rapors }) => {
  const [cari, setCari] = useState<string | undefined>();

  return (
    <AppLayout
      title="Rapor Perkembangan"
      description="List rapor perkembangan siswa"
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
        <Input placeholder="Cari rapor..." type="search" value={cari} onChange={(e) => setCari(e.target.value)} />
        <RaporFilterSheet>
          <Button>
            <Filter />
            Filter data
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
                    <div className="flex items-center gap-2">
                      <Checkbox checked={rapor.publish} />
                      {rapor.publish ? 'Published' : 'Draft'}
                    </div>
                  </RaporPublishToggle>
                </TableCell>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'}>
                    <Download />
                  </Button>
                  <Button variant={'ghost'} size={'icon'}>
                    <Share2 />
                  </Button>
                  <Button variant={'ghost'} size={'icon'}>
                    <Folder />
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
