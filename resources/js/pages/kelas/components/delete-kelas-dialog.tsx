import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Kelas } from '@/types';
import { router } from '@inertiajs/react';
import { Trash2, X } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';

type DeleteKelasDialogProps = PropsWithChildren & {
  kelas: Kelas;
};

const DeleteKelasDialog: FC<DeleteKelasDialogProps> = ({ children, kelas }) => {
  const handleDelete = () => {
    router.delete(route('kelas.destroy', kelas.id), {
      onSuccess: () => {
        router.visit(route('kelas.index'));
      },
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>AlertDialog title</AlertDialogTitle>
          <AlertDialogDescription>AlertDialog description</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant={'outline'}>
              <X />
              Batal
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>
            <Trash2 />
            Hapus tenaga pendidik
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteKelasDialog;
