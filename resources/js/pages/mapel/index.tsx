import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Mapel } from '@/types';
import { Link } from '@inertiajs/react';
import { Copy, Edit, Filter, Folder, Plus, Trash2 } from 'lucide-react';
import { FC, useState } from 'react';
import DeleteMapelDialog from './components/delete-mapel-dialog';
import MapelFilterSheet from './components/mapel-filter-sheet';
import MapelFormSheet from './components/mapel-form-sheet';

type MapelListProps = {
  mapels: Mapel[];
};

const MapelList: FC<MapelListProps> = ({ mapels }) => {
  const [cari, setCari] = useState<string | undefined>();
  const [mapelIds, setMapelIds] = useState<number[]>([]);

  const allMapelIds = mapels.map((mapel) => mapel.id);
  const isAllChecked = mapelIds?.length === mapels.length;

  const breadcrumbs: BreadcrumbItem[] = [{ title: 'Mata pelajaran', href: route('mapel.index') }];

  return (
    <AppLayout
      breadcrumbs={breadcrumbs}
      title="Mata pelajaran"
      description="List mata pelajaran"
      actions={
        <>
          <MapelFormSheet purpose="create">
            <Button>
              <Plus />
              Tambah mata pelajaran
            </Button>
          </MapelFormSheet>
        </>
      }
    >
      <div className="flex items-center space-x-2">
        <Input placeholder="Cari mapel..." type="search" value={cari} onChange={(e) => setCari(e.target.value)} />
        <MapelFilterSheet data={'data'}>
          <Button>
            <Filter />
            Filter data
            <Badge variant={'secondary'}>2</Badge>
          </Button>
        </MapelFilterSheet>
        {mapelIds && mapelIds.length > 0 && (
          <>
            <Button variant={'ghost'} disabled>
              {mapelIds.length} item selected
            </Button>
            <Button>
              <Edit />
              Edit data
            </Button>
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
                      setMapelIds(checked ? allMapelIds : []);
                    }}
                  />
                </Label>
              </Button>
            </TableHead>
            <TableHead>Group</TableHead>
            <TableHead>Nama mata pelajaran</TableHead>
            <TableHead>Tingkat kelas</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mapels
            .filter((mapel) =>
              JSON.stringify(mapel)
                .toLowerCase()
                .includes(cari?.toLowerCase() || ''),
            )
            .map((mapel) => (
              <TableRow key={mapel.id}>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'} asChild>
                    <Label>
                      <Checkbox
                        checked={mapelIds?.includes(mapel.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setMapelIds((prev) => [...prev, mapel.id]);
                          } else {
                            setMapelIds((prev) => prev.filter((id) => id !== mapel.id));
                          }
                        }}
                      />
                    </Label>
                  </Button>
                </TableCell>
                <TableCell>{mapel.mapel_group?.name}</TableCell>
                <TableCell>{mapel.name}</TableCell>
                <TableCell>{mapel.tingkat.label}</TableCell>
                <TableCell>
                  <Button variant={'ghost'} size={'icon'} asChild>
                    <Link href={route('mapel.show', mapel.id)}>
                      <Folder />
                    </Link>
                  </Button>
                  <MapelFormSheet mapel={mapel} purpose="duplicate">
                    <Button variant={'ghost'} size={'icon'}>
                      <Copy />
                    </Button>
                  </MapelFormSheet>
                  <MapelFormSheet mapel={mapel} purpose="edit">
                    <Button variant={'ghost'} size={'icon'}>
                      <Edit />
                    </Button>
                  </MapelFormSheet>
                  <DeleteMapelDialog mapel={mapel}>
                    <Button variant={'ghost'} size={'icon'}>
                      <Trash2 />
                    </Button>
                  </DeleteMapelDialog>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </AppLayout>
  );
};

export default MapelList;
