import HeadingSmall from '@/components/heading-small';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import RaporCreateDialog from '@/pages/rapor/components/rapor-create-dialog';
import RaporPublishToggle from '@/pages/rapor/components/rapor-publih-toggle';
import { Kelas, Rapor } from '@/types';
import { Link } from '@inertiajs/react';
import { Download, Edit, Folder, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import KelasLayout from '../layout/kelas-layout';

type RaporSiswaProps = {
  kelas: Kelas;
  rapors: Rapor[];
};

const RaporSiswa: FC<RaporSiswaProps> = ({ kelas, rapors }) => {
  const [filterJenis, setFilterJenis] = useState('');
  const [siswaId, setSiswaId] = useState('all');

  const jenisList = [
    { value: '', label: 'Semua' },
    { value: 'perkembangan', label: 'Perkembangan' },
    { value: 'tahfidz', label: 'Tahfidz' },
    // { value: 'doa', label: 'Doa' },
    { value: 'nilai', label: 'Nilai' },
  ];

  return (
    <KelasLayout kelas={kelas}>
      <HeadingSmall title="Rapor" description="Data rapor siswa" />
      <div className="flex items-center justify-between gap-4">
        <div className="flex space-x-1">
          {jenisList.map(({ value, label }) => (
            <Button key={value} variant={filterJenis === value ? 'default' : 'secondary'} onClick={() => setFilterJenis(value)}>
              {label}
            </Button>
          ))}
        </div>
        <div>
          <Select value={siswaId} onValueChange={setSiswaId}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih anggota kelas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={'all'}>Semua anggota kelas</SelectItem>
              {kelas.siswas.map((s) => (
                <SelectItem key={s.id} value={s.id.toString()}>
                  {s.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <RaporCreateDialog>
          <Button>Tambah rapor baru</Button>
        </RaporCreateDialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
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
            .filter((r) => filterJenis === '' || r.jenis === filterJenis)
            .filter((r) => siswaId === 'all' || r.siswa.id === parseInt(siswaId))
            .map((rapor) => (
              <TableRow key={rapor.id}>
                <TableCell>{rapor.tahunajaran?.label}</TableCell>
                <TableCell>{rapor.jenis}</TableCell>
                <TableCell>{rapor.siswa?.nisn}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="size-6">
                      <AvatarImage src={rapor.siswa?.avatar} />
                    </Avatar>
                    {rapor.siswa?.name}
                  </div>
                </TableCell>
                <TableCell>{rapor.siswa?.kelas?.name}</TableCell>
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
                  <Button variant={'ghost'} size={'icon'} disabled={!rapor.publish} asChild>
                    <a href={route('rapor.stream', rapor.id)}>
                      <Folder />
                    </a>
                  </Button>
                  <Button variant={'ghost'} size={'icon'} asChild>
                    <Link href={route('rapor.edit', rapor.id)}>
                      <Edit />
                    </Link>
                  </Button>
                  <Button variant={'ghost'} size={'icon'} asChild>
                    <Link href={route('rapor.destroy', rapor.id)} method="delete">
                      <Trash2 />
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </KelasLayout>
  );
};

export default RaporSiswa;
