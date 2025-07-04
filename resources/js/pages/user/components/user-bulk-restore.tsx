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
import { User } from '@/types';
import { useForm } from '@inertiajs/react';
import { Undo2, X } from 'lucide-react';
import { FC, PropsWithChildren, useEffect } from 'react';
import { toast } from 'sonner';

type UserBulkRestoreProps = PropsWithChildren & {
  userIds: User['id'][];
  onSuccess?: () => void;
};

const UserBulkRestore: FC<UserBulkRestoreProps> = ({ children, userIds, onSuccess }) => {
  const { setData, put } = useForm({
    user_ids: userIds,
  });

  useEffect(() => {
    setData('user_ids', userIds ?? []);
  }, [userIds, setData]);

  const handleSubmit = () => {
    put(route('user.bulk-restore'), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Berhasil mengubah peran user');
        onSuccess?.();
      },
      onError: (errors) => {
        const m = Object.entries(errors)
          .map(([, value]) => value)
          .join('\n');
        toast.error(m);
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
          <AlertDialogAction onClick={handleSubmit}>
            <Undo2 />
            Restore
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UserBulkRestore;
