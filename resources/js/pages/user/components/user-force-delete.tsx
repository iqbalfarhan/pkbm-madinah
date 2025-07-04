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
import { Link } from '@inertiajs/react';
import { Trash2, X } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';
import { toast } from 'sonner';

type UserForceDeleteProps = PropsWithChildren & {
  user: User;
};

const UserForceDelete: FC<UserForceDeleteProps> = ({ children, user }) => {
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
            <Link
              href={route('user.force-delete', user.id)}
              method="delete"
              onSuccess={() => toast.success('User berhasil dihapus permanen')}
              preserveScroll={true}
            >
              <Trash2 />
              Hapus permanen
            </Link>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UserForceDelete;
