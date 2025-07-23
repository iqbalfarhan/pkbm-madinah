import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Siswa } from '@/types';
import { router } from '@inertiajs/react';
import { Trash2, X } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';

type SiswaDeleteDialogProps = PropsWithChildren & {
  siswa: Siswa;
};

const SiswaDeleteDialog: FC<SiswaDeleteDialogProps> = ({ children, siswa }) => {
  const handleDelete = () => {
    router.delete(route('siswa.destroy', siswa.id), {
      onSuccess: () => {
        router.visit(route('siswa.index'));
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Hapus siswa</DialogTitle>
          <DialogDescription>Isi alasan penghapusan data siswa</DialogDescription>
        </DialogHeader>
        <FormControl className="py-4">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Pilih status siswa" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lulus">Lulus</SelectItem>
              <SelectItem value="pindah">Pindah</SelectItem>
              <SelectItem value="dikeluarkan">Dikeluarkan</SelectItem>
            </SelectContent>
          </Select>
        </FormControl>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={'outline'}>
              <X />
              Batal
            </Button>
          </DialogClose>
          <Button variant={'destructive'} onClick={handleDelete}>
            <Trash2 />
            Pindah ke arsip
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SiswaDeleteDialog;
