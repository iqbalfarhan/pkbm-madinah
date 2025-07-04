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
import { Guru } from '@/types';
import { router } from '@inertiajs/react';
import { Trash2, X } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';

type DeleteGuruProps = PropsWithChildren & {
  guru: Guru;
};

const DeleteGuru: FC<DeleteGuruProps> = ({ children, guru }) => {
  const handleDelete = () => {
    router.delete(route('guru.destroy', guru.id), {
      onSuccess: () => {
        router.visit(route('guru.index'));
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

export default DeleteGuru;
