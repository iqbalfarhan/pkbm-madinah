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
import { errorMessage } from '@/lib/utils';
import { Siswa } from '@/types';
import { router, useForm } from '@inertiajs/react';
import { Trash2, X } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type SiswaDeleteDialogProps = PropsWithChildren & {
  siswa: Siswa;
};

const SiswaDeleteDialog: FC<SiswaDeleteDialogProps> = ({ children, siswa }) => {
  const [open, setOpen] = useState(false);
  const { data, setData, post } = useForm({
    status: 'lulus',
  });

  const handleDelete = () => {
    post(route('siswa.move-to-trash', siswa.id), {
      onSuccess: () =>
        toast.success('Berhasil memindahkan data siswa', {
          action: {
            label: 'Lihat arsip',
            onClick: () => router.visit(route('siswa.archive')),
          },
        }),
      onError: (e) => toast.error(errorMessage(e)),
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Hapus siswa</DialogTitle>
          <DialogDescription>Isi alasan penghapusan data siswa</DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleDelete();
          }}
          className="py-4"
        >
          <FormControl>
            <Select value={data.status} onValueChange={(e) => setData('status', e)}>
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
        </form>
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
