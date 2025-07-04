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
import { useForm } from '@inertiajs/react';
import { Trash2, X } from 'lucide-react';
import { FC, PropsWithChildren, useEffect } from 'react';
import { toast } from 'sonner';

type UserBulkDeleteProps = PropsWithChildren & {
  userIds?: number[];
  onSuccess?: () => void;
};

const UserBulkDelete: FC<UserBulkDeleteProps> = ({ children, userIds, onSuccess }) => {
  const { setData, delete: destroy } = useForm({
    user_ids: userIds,
  });

  useEffect(() => {
    setData('user_ids', userIds ?? []);
  }, [userIds, setData]);

  const handleSubmit = () => {
    destroy(route('user.bulk-delete'), {
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
          <AlertDialogTitle>Hapus user</AlertDialogTitle>
          <AlertDialogDescription>User yang dihapus akan dipindahkan ke tempat sampah, agar lain kali bisa dikembalikan</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant={'outline'}>
              <X />
              Batal
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button onClick={handleSubmit} variant={'destructive'}>
              <Trash2 />
              Hapus user
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UserBulkDelete;
