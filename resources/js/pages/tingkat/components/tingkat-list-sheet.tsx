import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tingkat } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Edit, Plus, Trash2, X } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import TingkatFormDialog from './tingkat-form-dialog';

type TingkatListSheetProps = PropsWithChildren;

const TingkatListSheet: FC<TingkatListSheetProps> = ({ children }) => {
  const [cari, setCari] = useState<string | undefined>();
  const { tingkats } = usePage<{ tingkats: Tingkat[] }>().props;
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>List tingkat kelas</SheetTitle>
          <SheetDescription>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci, cumque.</SheetDescription>
        </SheetHeader>
        <div className="space-y-6 px-4">
          <Input placeholder="Cari tingkat..." type="search" value={cari} onChange={(e) => setCari(e.target.value)} />
          <ScrollArea className="max-h-96 overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Group</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Label</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tingkats
                  .filter((tingkat) =>
                    JSON.stringify(tingkat)
                      .toLowerCase()
                      .includes(cari?.toLowerCase() || ''),
                  )
                  .map((tingkat) => (
                    <TableRow key={tingkat.id}>
                      <TableCell>{tingkat.group}</TableCell>
                      <TableCell>{tingkat.name}</TableCell>
                      <TableCell>{tingkat.label}</TableCell>
                      <TableCell>
                        <TingkatFormDialog purpose="edit" tingkat={tingkat}>
                          <Button variant={'ghost'} size={'icon'}>
                            <Edit />
                          </Button>
                        </TingkatFormDialog>
                        <Button variant={'ghost'} size={'icon'}>
                          <Link href={route('tingkat.destroy', tingkat.id)} method="delete">
                            <Trash2 />
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
        <SheetFooter>
          <TingkatFormDialog purpose="create">
            <Button>
              <Plus />
              Tambah tingkat
            </Button>
          </TingkatFormDialog>
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

export default TingkatListSheet;
