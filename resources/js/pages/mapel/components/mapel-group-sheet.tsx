import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MapelGroup, SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Edit, Plus, Trash2, X } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';
import MapelGroupFormDialog from './mapel-group-form-dialog';

type MapelGroupSheetProps = PropsWithChildren & {
  data: string;
};

const MapelGroupSheet: FC<MapelGroupSheetProps> = ({ children }) => {
  const props = usePage<SharedData>().props;
  const mapelGroups = props.mapelGroups as MapelGroup[];

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Group mata pelajaran</SheetTitle>
          <SheetDescription>Nantinya akan berhubungan dengan pengelompokan rapor</SheetDescription>
        </SheetHeader>
        <div className="space-y-6 px-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-full">Nama group</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mapelGroups.map((mapelGroup) => (
                <TableRow key={mapelGroup.id}>
                  <TableCell>{mapelGroup.name}</TableCell>
                  <TableCell>
                    <MapelGroupFormDialog mapelGroup={mapelGroup} purpose="edit">
                      <Button variant={'ghost'} size={'icon'}>
                        <Edit />
                      </Button>
                    </MapelGroupFormDialog>
                    <Button variant={'ghost'} size={'icon'}>
                      <Link href={route('mapelgroup.destroy', mapelGroup.id)} method="delete" preserveScroll={true}>
                        <Trash2 />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <SheetFooter>
          <MapelGroupFormDialog purpose="create">
            <Button>
              <Plus />
              Tambah data
            </Button>
          </MapelGroupFormDialog>
          <SheetClose asChild>
            <Button variant={'outline'}>
              <X />
              Batal
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MapelGroupSheet;
