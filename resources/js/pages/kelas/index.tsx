import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { Kelas } from '@/types';
import { Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { FC, useState } from 'react';
import KelasFormSheet from './components/kelas-form-sheet';
import KelasItemCard from './components/kelas-item-card';

type KelasListProps = {
  kelass: Kelas[];
};

const KelasList: FC<KelasListProps> = ({ kelass }) => {
  const [cari, setCari] = useState<string | undefined>();

  return (
    <AppLayout
      title="Daftar kelas"
      description="Daftar kelas"
      actions={
        <>
          <KelasFormSheet purpose="create">
            <Button>
              <Plus />
              Tambah
            </Button>
          </KelasFormSheet>
        </>
      }
    >
      <Input placeholder="Cari kelas..." type="search" value={cari} onChange={(e) => setCari(e.target.value)} />
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {kelass
          .filter((kelas) =>
            JSON.stringify(kelas)
              .toLowerCase()
              .includes(cari?.toLowerCase() || ''),
          )
          .map((kelas) => (
            <Link key={kelas.id} href={route('kelas.show', kelas.id)}>
              <KelasItemCard kelas={kelas} />
            </Link>
          ))}
      </div>
      {/* <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Button variant={'ghost'} size={'icon'} asChild>
                <Label>
                  <Checkbox />
                </Label>
              </Button>
            </TableHead>
            <TableHead>Tingkat</TableHead>
            <TableHead>Nama kelas</TableHead>
            <TableHead>Walikelas</TableHead>
            <TableHead>Siswa</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {kelass
            .filter((kelas) =>
              JSON.stringify(kelas)
                .toLowerCase()
                .includes(cari?.toLowerCase() || ''),
            )
            .map((kelas) => (
              <TableRow key={kelas.id}>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'} asChild>
                    <Label>
                      <Checkbox />
                    </Label>
                  </Button>
                </TableCell>
                <TableCell>{kelas.tingkat.label}</TableCell>
                <TableCell>{kelas.name}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="size-6">
                      <AvatarImage src={kelas.walikelas?.avatar} alt={kelas.walikelas?.name} />
                    </Avatar>
                    {kelas.walikelas?.name}
                  </div>
                </TableCell>
                <TableCell>{kelas.siswas?.length} siswa</TableCell>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'}>
                    <Link href={route('kelas.show', kelas.id)}>
                      <Folder />
                    </Link>
                  </Button>
                  <KelasFormSheet purpose="edit" kelas={kelas}>
                    <Button variant={'ghost'} size={'icon'}>
                      <Edit />
                    </Button>
                  </KelasFormSheet>
                  <DeleteKelasDialog kelas={kelas}>
                    <Button variant={'ghost'} size={'icon'}>
                      <Trash2 />
                    </Button>
                  </DeleteKelasDialog>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table> */}
    </AppLayout>
  );
};

export default KelasList;
