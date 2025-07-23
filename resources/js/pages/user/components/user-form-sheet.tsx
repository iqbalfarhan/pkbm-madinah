import FormControl from '@/components/form-control';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { usePageProps } from '@/hooks/use-page-props';
import { errorMessage } from '@/lib/utils';
import { User } from '@/types';
import { useForm } from '@inertiajs/react';
import { Check, X } from 'lucide-react';
import { FC, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

type UserFormSheetProps = PropsWithChildren & {
  user?: User;
  purpose: 'edit' | 'create';
};

const UserFormSheet: FC<UserFormSheetProps> = ({ children, user, purpose }) => {
  const [open, setOpen] = useState(false);

  const { roles } = usePageProps<{ roles: string[] }>();
  const { data, setData, put, post, reset } = useForm({
    name: user?.name ?? '',
    email: user?.email ?? '',
    roles: user?.roles ?? [],
    password: user ? undefined : 'password',
    photo: undefined as File | undefined,
  });

  const handleSubmit = () => {
    if (purpose === 'edit') {
      put(route('user.update', user?.id), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Berhasil mengubah data user');
        },
        onError: (e) => {
          toast.error(errorMessage(e));
        },
      });
    } else {
      post(route('user.store'), {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Berhasil menambahkan user baru');
          reset();
        },
        onError: (e) => {
          toast.error(errorMessage(e));
        },
      });
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Sheet title</SheetTitle>
          <SheetDescription>Sheet description</SheetDescription>
        </SheetHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="space-y-6 px-4">
            <FormControl label="Nama user" required>
              <Input placeholder="Nama lengkap user" value={data.name} onChange={(e) => setData('name', e.target.value)} />
            </FormControl>
            <FormControl label="Alamat email" required>
              <Input type="email" placeholder="Nama lengkap user" value={data.email} onChange={(e) => setData('email', e.target.value)} />
            </FormControl>
            <FormControl label="Peran" required>
              {roles.map((role) => (
                <Label key={role} className="flex items-center gap-2">
                  <Checkbox
                    id={role}
                    checked={data.roles?.includes(role) ?? false}
                    onCheckedChange={(checked) => setData('roles', checked ? [...(data.roles ?? []), role] : data.roles?.filter((r) => r !== role))}
                  />
                  <label htmlFor={role}>{role}</label>
                </Label>
              ))}
            </FormControl>
            <FormControl label="Photo" required>
              <Input type="file" accept="image/*" onChange={(e) => setData('photo', e.target.files?.[0])} />
            </FormControl>
            {data.photo && (
              <Avatar className="size-10 rounded">
                <AvatarImage src={URL.createObjectURL(data.photo)} />
              </Avatar>
            )}
          </div>
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

export default UserFormSheet;
