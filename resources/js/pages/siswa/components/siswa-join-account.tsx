import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { usePageProps } from '@/hooks/use-page-props';
import { errorMessage } from '@/lib/utils';
import { Siswa, User } from '@/types';
import { useForm } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type SiswaJoinAccountProps = PropsWithChildren & {
  siswa: Siswa;
};

const SiswaJoinAccount: FC<SiswaJoinAccountProps> = ({ children, siswa }) => {
  const users = usePageProps().users as User[];
  const [open, setOpen] = useState(false);

  const { data, setData, put } = useForm({
    user_id: undefined as number | undefined,
  });

  const handleSubmit = () => {
    put(route('siswa.update', siswa.id), {
      onSuccess: () => {
        toast.success('Berhasil menambahkan akun orangtua');
        setData('user_id', undefined);
        setOpen(false);
      },
      onError: (e) => toast.error(errorMessage(e)),
    });
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Sambungkan dengan akun orangtua</SheetTitle>
          <SheetDescription>Melalui proses ini, list siswa akan ditambahkan ke akun orang tuanya</SheetDescription>
        </SheetHeader>
        <div className="space-y-6 px-4">
          <FormControl label="Pilih akun">
            <Select value={data.user_id?.toString()} onValueChange={(value) => setData('user_id', parseInt(value))}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih akun orang tua" />
              </SelectTrigger>
              <SelectContent>
                {users.map((user) => (
                  <SelectItem value={user.id.toString()}>{user.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
        </div>
        <SheetFooter>
          <Button onClick={handleSubmit}>
            <Check />
            Sambungkan akun
          </Button>
          <SheetClose asChild>
            <Button variant={'outline'}>
              <X />
              Batal
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default SiswaJoinAccount;
