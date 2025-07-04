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
import { Input } from '@/components/ui/input';
import { generatePassword } from '@/lib/utils';
import { User } from '@/types';
import { useForm } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type ResetPasswordProps = PropsWithChildren & {
  user: User;
};

const ResetPassword: FC<ResetPasswordProps> = ({ children, user }) => {
  const [open, setOpen] = useState(false);
  const { data, setData, put, reset } = useForm({
    password: '',
  });

  const handleSubmit = () => {
    put(route('user.update', user.id), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Password berhasil direset');
        reset();
        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reset password</DialogTitle>
          <DialogDescription>Reset password user</DialogDescription>
        </DialogHeader>
        <form
          className="py-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <FormControl
            label="Password baru"
            action={
              <span className="underline" onClick={() => setData('password', generatePassword())}>
                Generate
              </span>
            }
          >
            <Input type="text" placeholder="Password baru" value={data.password} onChange={(e) => setData('password', e.target.value)} />
          </FormControl>
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={'outline'}>
              <X />
              Batal
            </Button>
          </DialogClose>
          <Button onClick={handleSubmit}>
            <Check />
            Update password
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ResetPassword;
