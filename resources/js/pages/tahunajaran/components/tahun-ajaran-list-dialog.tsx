import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { usePageProps } from '@/hooks/use-page-props';
import { TahunAjaran } from '@/types';
import { Link, router } from '@inertiajs/react';
import { Edit, Plus, Trash2, X } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';
import TahunAjaranFormSheet from './tahun-ajaran-form-sheet';

type TahunAjaranListDialogProps = PropsWithChildren;

const TahunAjaranListDialog: FC<TahunAjaranListDialogProps> = ({ children }) => {
  const [cari, setCari] = useState<string | undefined>();

  const { tas } = usePageProps<{ tas: TahunAjaran[] }>();

  const toggleActive = (ta: TahunAjaran) => {
    router.put(
      route('tahunajaran.update', ta.id),
      { active: !ta.active },
      { preserveScroll: true, onSuccess: () => toast.success('Berhasil mengubah status') },
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-full max-w-5xl">
        <DialogHeader>
          <DialogTitle>Dialog title</DialogTitle>
          <DialogDescription>Dialog description</DialogDescription>
        </DialogHeader>
        <Input placeholder="Cari tahun ajaran..." type="search" value={cari} onChange={(e) => setCari(e.target.value)} />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="w-full">Semester</TableHead>
              <TableHead>Active</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tas
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
                  <TableCell>
                    <Checkbox checked={ta.active} onCheckedChange={() => toggleActive(ta)} />
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
        <DialogFooter>
          <TahunAjaranFormSheet purpose="create">
            <Button>
              <Plus />
              Buat baru
            </Button>
          </TahunAjaranFormSheet>
          <DialogClose asChild>
            <Button variant={'outline'}>
              <X />
              Batal
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TahunAjaranListDialog;
