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
import { Mapel } from '@/types';
import { router } from '@inertiajs/react';
import { Trash2, X } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';
import { toast } from 'sonner';

type DeleteMapelDialogProps = PropsWithChildren & {
  mapel: Mapel;
};

const DeleteMapelDialog: FC<DeleteMapelDialogProps> = ({ children, mapel }) => {
  const handleDelete = () => {
    router.delete(route('mapel.destroy', mapel.id), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Berhasil menghapus data');
        router.reload();
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
          <AlertDialogAction asChild>
            <Button variant={'destructive'} onClick={handleDelete}>
              <Trash2 />
              Hapus
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteMapelDialog;
