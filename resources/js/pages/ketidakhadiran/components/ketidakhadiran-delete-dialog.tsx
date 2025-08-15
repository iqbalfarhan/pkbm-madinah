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
import { errorMessage } from '@/lib/utils';
import { Ketidakhadiran } from '@/types';
import { router } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type Props = PropsWithChildren & {
  ketidakhadiran: Ketidakhadiran;
};

const KetidakhadiranDeleteDialog: FC<Props> = ({ children, ketidakhadiran }) => {
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    router.delete(route('ketidakhadiran.destroy', ketidakhadiran.id), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Ketidakhadiran deleted successfully');
        setOpen(false);
      },
      onError: (e) => toast.error(errorMessage(e)),
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete ketidakhadiran and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>
            <Trash2 />
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default KetidakhadiranDeleteDialog;
