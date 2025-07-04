import FormControl from '@/components/form-control';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useForm } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren, useEffect } from 'react';
import { toast } from 'sonner';

type UserBulkEditProps = PropsWithChildren & {
  userIds?: number[];
  onSuccess?: () => void;
};

const UserBulkEdit: FC<UserBulkEditProps> = ({ children, userIds, onSuccess }) => {
  const { data, setData, put } = useForm({
    role: '',
    user_ids: userIds,
  });

  useEffect(() => {
    setData('user_ids', userIds ?? []);
  }, [userIds, setData]);

  const handleSubmit = () => {
    put(route('user.bulk-update'), {
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
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Sheet title</SheetTitle>
          <SheetDescription>Sheet description</SheetDescription>
        </SheetHeader>
        <form
          className="px-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <FormControl label="Ganti peran user ke">
            <Select value={data.role} onValueChange={(value) => setData('role', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin sekolah</SelectItem>
                <SelectItem value="guru">Pengajar</SelectItem>
                <SelectItem value="orangtua">Orang tua</SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
        </form>
        <SheetFooter>
          <Button onClick={handleSubmit}>
            <Check />
            Simpan
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

export default UserBulkEdit;
