import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { dateDFY } from '@/lib/utils';
import { Berita } from '@/types';
import { Link } from '@inertiajs/react';
import { Edit, Filter, Folder, Plus, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import BeritaDeleteDialog from './components/berita-delete-dialog';
import BeritaFilterSheet from './components/berita-filter-sheet';
import BeritaFormSheet from './components/berita-form-sheet';

type Props = {
  beritas: Berita[];
};

const BeritaList: FC<Props> = ({ beritas }) => {
  const [ids, setIds] = useState<number[]>([]);
  const [cari, setCari] = useState('');

  return (
    <AppLayout
      title="Beritas"
      description="Manage your beritas"
      actions={
        <BeritaFormSheet purpose="create">
          <Button>
            <Plus />
            Create new berita
          </Button>
        </BeritaFormSheet>
      }
    >
      <div className="flex gap-2">
        <Input placeholder="Search beritas..." value={cari} onChange={(e) => setCari(e.target.value)} />
        <BeritaFilterSheet>
          <Button>
            <Filter />
            Filter data
          </Button>
        </BeritaFilterSheet>
        {ids.length > 0 && (
          <>
            <Button variant={'ghost'} disabled>
              {ids.length} item selected
            </Button>
            <Button>
              <Edit /> Edit selected
            </Button>
            <Button variant={'destructive'}>
              <Trash2 /> Delete selected
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
                    checked={ids.length === beritas.length}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setIds(beritas.map((berita) => berita.id));
                      } else {
                        setIds([]);
                      }
                    }}
                  />
                </Label>
              </Button>
            </TableHead>
            <TableHead>Judul</TableHead>
            <TableHead>Penulis</TableHead>
            <TableHead>Tanggal terbit</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {beritas
            .filter((berita) => JSON.stringify(berita).toLowerCase().includes(cari.toLowerCase()))
            .map((berita) => (
              <TableRow key={berita.id}>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'} asChild>
                    <Label>
                      <Checkbox
                        checked={ids.includes(berita.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setIds([...ids, berita.id]);
                          } else {
                            setIds(ids.filter((id) => id !== berita.id));
                          }
                        }}
                      />
                    </Label>
                  </Button>
                </TableCell>
                <TableCell>{berita.judul}</TableCell>
                <TableCell>{berita.user.name}</TableCell>
                <TableCell>{dateDFY(berita.created_at)}</TableCell>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'}>
                    <Link href={route('berita.show', berita.id)}>
                      <Folder />
                    </Link>
                  </Button>
                  <BeritaFormSheet purpose="edit" berita={berita}>
                    <Button variant={'ghost'} size={'icon'}>
                      <Edit />
                    </Button>
                  </BeritaFormSheet>
                  <BeritaDeleteDialog berita={berita}>
                    <Button variant={'ghost'} size={'icon'}>
                      <Trash2 />
                    </Button>
                  </BeritaDeleteDialog>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </AppLayout>
  );
};

export default BeritaList;
